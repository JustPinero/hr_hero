import prisma from '../lib/prisma';
import { NotFoundError } from '../middleware/errorHandler';
import * as aiService from './ai.service';
import { Department } from '@prisma/client';
import {
  MatchedHero,
  MatchedPosition,
  PositionMatchResult,
  HeroRolesResult,
  HeroListItem,
} from '../types/index';

const departmentOrderBy: Record<Department, Array<Record<string, 'desc'>>> = {
  SECURITY: [{ strength: 'desc' }, { combat: 'desc' }, { durability: 'desc' }],
  IT: [{ intelligence: 'desc' }, { power: 'desc' }],
  C_SUITE: [{ intelligence: 'desc' }, { combat: 'desc' }],
  RESEARCH: [{ intelligence: 'desc' }, { power: 'desc' }],
  MARKETING: [{ speed: 'desc' }, { intelligence: 'desc' }],
  SALES: [{ combat: 'desc' }, { intelligence: 'desc' }],
  HR: [{ intelligence: 'desc' }, { durability: 'desc' }],
  FINANCE: [{ intelligence: 'desc' }, { durability: 'desc' }],
  MIDDLE_MANAGEMENT: [{ durability: 'desc' }, { intelligence: 'desc' }],
  FACILITIES: [{ strength: 'desc' }, { durability: 'desc' }],
  LEGAL: [{ intelligence: 'desc' }, { combat: 'desc' }],
};

export async function getPositionMatches(positionId: number): Promise<PositionMatchResult> {
  const position = await prisma.position.findUnique({ where: { id: positionId } });
  if (!position) {
    throw new NotFoundError(`Position ${positionId} not found.`);
  }

  const cached = await prisma.heroPositionMatch.findMany({
    where: { positionId },
    include: { hero: true },
    orderBy: { score: 'desc' },
  });

  if (cached.length > 0) {
    const matches: MatchedHero[] = cached.map((m) => ({
      id: m.id,
      heroId: m.heroId,
      name: m.hero.name,
      slug: m.hero.slug,
      imageUrl: m.hero.imageUrl,
      publisher: m.hero.publisher,
      alignment: m.hero.alignment,
      availability: m.hero.availability,
      currentTitle: m.hero.currentTitle,
      score: m.score,
      reasoning: m.reasoning,
    }));

    return { position, matches };
  }

  const orderBy = departmentOrderBy[position.department] || [{ intelligence: 'desc' }];
  const candidates = await prisma.hero.findMany({
    orderBy,
    take: 30,
  });

  const aiMatches = await aiService.matchHeroesToPosition(position, candidates);

  if (aiMatches.length > 0) {
    await prisma.heroPositionMatch.createMany({
      data: aiMatches.map((m) => ({
        heroId: m.heroId,
        positionId,
        score: m.score,
        reasoning: m.reasoning,
      })),
      skipDuplicates: true,
    });
  }

  const results = await prisma.heroPositionMatch.findMany({
    where: { positionId },
    include: { hero: true },
    orderBy: { score: 'desc' },
  });

  const matches: MatchedHero[] = results.map((m) => ({
    id: m.id,
    heroId: m.heroId,
    name: m.hero.name,
    slug: m.hero.slug,
    imageUrl: m.hero.imageUrl,
    publisher: m.hero.publisher,
    alignment: m.hero.alignment,
    availability: m.hero.availability,
    currentTitle: m.hero.currentTitle,
    score: m.score,
    reasoning: m.reasoning,
  }));

  return { position, matches };
}

export async function getHeroRoles(heroId: number): Promise<HeroRolesResult> {
  const hero = await prisma.hero.findUnique({ where: { id: heroId } });
  if (!hero) {
    throw new NotFoundError(`Hero ${heroId} not found in talent database.`);
  }

  const cached = await prisma.heroPositionMatch.findMany({
    where: { heroId },
    include: { position: true },
    orderBy: { score: 'desc' },
  });

  const heroListItem: HeroListItem = {
    id: hero.id,
    name: hero.name,
    slug: hero.slug,
    imageUrl: hero.imageUrl,
    publisher: hero.publisher,
    alignment: hero.alignment,
    availability: hero.availability,
    currentTitle: hero.currentTitle,
  };

  if (cached.length > 0) {
    const roles: MatchedPosition[] = cached.map((m) => ({
      id: m.id,
      positionId: m.positionId,
      title: m.position.title,
      department: m.position.department,
      salaryMin: m.position.salaryMin,
      salaryMax: m.position.salaryMax,
      clearanceLevel: m.position.clearanceLevel,
      score: m.score,
      reasoning: m.reasoning,
    }));

    return { hero: heroListItem, roles };
  }

  const positions = await prisma.position.findMany({ where: { status: 'OPEN' } });
  const aiMatches = await aiService.matchPositionsToHero(hero, positions);

  if (aiMatches.length > 0) {
    await prisma.heroPositionMatch.createMany({
      data: aiMatches.map((m) => ({
        heroId,
        positionId: m.positionId,
        score: m.score,
        reasoning: m.reasoning,
      })),
      skipDuplicates: true,
    });
  }

  const results = await prisma.heroPositionMatch.findMany({
    where: { heroId },
    include: { position: true },
    orderBy: { score: 'desc' },
  });

  const roles: MatchedPosition[] = results.map((m) => ({
    id: m.id,
    positionId: m.positionId,
    title: m.position.title,
    department: m.position.department,
    salaryMin: m.position.salaryMin,
    salaryMax: m.position.salaryMax,
    clearanceLevel: m.position.clearanceLevel,
    score: m.score,
    reasoning: m.reasoning,
  }));

  return { hero: heroListItem, roles };
}

export async function generateHeroSummary(heroId: number): Promise<string> {
  const hero = await prisma.hero.findUnique({ where: { id: heroId } });
  if (!hero) {
    throw new NotFoundError(`Hero ${heroId} not found.`);
  }

  if (hero.aiPersonalitySummary) {
    return hero.aiPersonalitySummary;
  }

  const summary = await aiService.generatePersonalitySummary(hero);

  await prisma.hero.update({
    where: { id: heroId },
    data: { aiPersonalitySummary: summary },
  });

  return summary;
}
