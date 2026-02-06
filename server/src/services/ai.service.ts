import anthropic from '../lib/anthropic';
import { ServiceUnavailableError } from '../middleware/errorHandler';
import { Hero, Position } from '@prisma/client';

const MATCH_SYSTEM_PROMPT = `You are the AI Talent Matching Engine for MEGACORP INDUSTRIES, the most soullessly efficient conglomerate in Patriot City. You speak in the voice of a painfully corporate HR system -- the kind that calls layoffs "right-sizing opportunities" and refers to employees as "human capital assets."

Your job is to evaluate potential talent matches between superhero candidates and corporate positions. Your analysis should be:
- Hilariously corporate in tone (buzzwords, synergy, leverage, etc.)
- Based on how the hero's actual powers, personality, and background map to the job
- Aware that this is absurd (superheroes doing office jobs) but playing it completely straight
- Each match reasoning should be 2-3 sentences max

You must respond in valid JSON only. No markdown, no commentary outside the JSON.`;

const PERSONALITY_SYSTEM_PROMPT = `You are the AI Personality Assessment Module for MEGACORP INDUSTRIES' HR department. Write assessments in soulless corporate HR language, treating superheroes as job candidates.`;

interface MatchResult {
  heroId: number;
  score: number;
  reasoning: string;
}

interface PositionMatchResult {
  positionId: number;
  score: number;
  reasoning: string;
}

export async function matchHeroesToPosition(
  position: Position,
  candidates: Hero[]
): Promise<MatchResult[]> {
  const candidateList = candidates
    .map(
      (h) =>
        `- ID:${h.id} | ${h.name} | ${h.publisher} | Alignment:${h.alignment}\n  Stats: INT:${h.intelligence} STR:${h.strength} SPD:${h.speed} DUR:${h.durability} PWR:${h.power} CMB:${h.combat}\n  Occupation: ${h.occupation} | Affiliations: ${h.groupAffiliation}\n  Aliases: ${h.aliases.join(', ')}`
    )
    .join('\n');

  const userPrompt = `POSITION TO FILL:
Title: ${position.title}
Department: ${position.department}
Description: ${position.description}
Requirements: ${position.requirements.join(', ')}

CANDIDATE POOL (${candidates.length} candidates):
${candidateList}

Select the top 8-10 best matches. For each, provide heroId, score (0-100), and a 2-3 sentence reasoning in corporate HR tone.

Respond ONLY with this JSON:
{"matches": [{"heroId": <number>, "score": <number>, "reasoning": "<string>"}]}
Sort by score descending.`;

  const raw = await callMatchApi(userPrompt, 'heroId');
  return raw.map((m) => ({
    heroId: m.heroId as number,
    score: m.score,
    reasoning: m.reasoning,
  }));
}

export async function matchPositionsToHero(
  hero: Hero,
  positions: Position[]
): Promise<PositionMatchResult[]> {
  const positionList = positions
    .map(
      (p) =>
        `- ID:${p.id} | ${p.title} | Dept:${p.department}\n  Description: ${p.description}\n  Requirements: ${p.requirements.join(', ')}`
    )
    .join('\n');

  const userPrompt = `CANDIDATE PROFILE:
Name: ${hero.name} (${hero.fullName})
Publisher: ${hero.publisher} | Alignment: ${hero.alignment}
Stats: INT:${hero.intelligence} STR:${hero.strength} SPD:${hero.speed} DUR:${hero.durability} PWR:${hero.power} CMB:${hero.combat}
Occupation: ${hero.occupation}
Affiliations: ${hero.groupAffiliation}
Aliases: ${hero.aliases.join(', ')}

AVAILABLE POSITIONS (${positions.length} positions):
${positionList}

Select the top 5-8 best fitting positions for this candidate. For each, provide positionId, score (0-100), and a 2-3 sentence reasoning in corporate HR tone.

Respond ONLY with this JSON:
{"matches": [{"positionId": <number>, "score": <number>, "reasoning": "<string>"}]}
Sort by score descending.`;

  const raw = await callMatchApi(userPrompt, 'positionId');
  return raw.map((m) => ({
    positionId: m.positionId as number,
    score: m.score,
    reasoning: m.reasoning,
  }));
}

export async function generatePersonalitySummary(hero: Hero): Promise<string> {
  const userPrompt = `Generate a brief personality assessment (3-4 sentences) for this candidate:
Name: ${hero.name} (${hero.fullName})
Publisher: ${hero.publisher} | Alignment: ${hero.alignment}
Stats: INT:${hero.intelligence} STR:${hero.strength} SPD:${hero.speed} DUR:${hero.durability} PWR:${hero.power} CMB:${hero.combat}
Occupation: ${hero.occupation}
Affiliations: ${hero.groupAffiliation}

Be funny but play it completely straight. Mention specific powers as resume bullet points.
Return ONLY the assessment text.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      temperature: 0.7,
      system: PERSONALITY_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const block = response.content[0];
    if (block.type === 'text') {
      return block.text.trim();
    }
    throw new Error('Unexpected response format');
  } catch (err) {
    console.error('AI personality summary error:', err);
    throw new ServiceUnavailableError(
      'The AI Talent Assessment Module is currently recalibrating. Please try again.'
    );
  }
}

async function callMatchApi(
  userPrompt: string,
  idKey: string
): Promise<Array<{ score: number; reasoning: string } & Record<string, number>>> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 2048,
        temperature: 0.7,
        system: MATCH_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      });

      const block = response.content[0];
      if (block.type !== 'text') {
        throw new Error('Unexpected response format');
      }

      const parsed = JSON.parse(block.text) as {
        matches: Array<{ score: number; reasoning: string } & Record<string, number>>;
      };

      if (!Array.isArray(parsed.matches)) {
        throw new Error('Invalid response: matches is not an array');
      }

      for (const match of parsed.matches) {
        if (typeof match[idKey] !== 'number' || typeof match.score !== 'number' || typeof match.reasoning !== 'string') {
          throw new Error(`Invalid match entry: missing ${idKey}, score, or reasoning`);
        }
      }

      return parsed.matches;
    } catch (err) {
      if (attempt === 0) {
        console.warn('AI match parse failed, retrying:', err);
        continue;
      }
      console.error('AI matching error:', err);
      throw new ServiceUnavailableError(
        'The AI Talent Matching Engine is currently experiencing a synergy deficit. Please try again.'
      );
    }
  }

  throw new ServiceUnavailableError('AI matching failed after retries.');
}
