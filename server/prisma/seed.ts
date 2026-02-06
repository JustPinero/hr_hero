import { PrismaClient, Department, ClearanceLevel, Availability } from '@prisma/client';
import { fetchAllHeroes } from '../src/lib/superheroApi';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const COMEDIC_TITLES = [
  'Senior Brooding Analyst',
  'Lead Destruction Consultant',
  'Junior Smashing Coordinator',
  'VP of Aggressive Negotiations',
  'Director of Unnecessary Force',
  'Chief Monologue Officer',
  'Compliance Specialist (Reluctant)',
  'Staff Enigma',
  'Associate Vigilante (Part-Time)',
  'Regional Manager of Chaos',
];

function randomAvailability(): Availability {
  const roll = Math.random();
  if (roll < 0.5) return 'AVAILABLE';
  if (roll < 0.7) return 'EMPLOYED';
  if (roll < 0.85) return 'FREELANCE';
  return 'RETIRED';
}

function randomTitle(): string {
  return COMEDIC_TITLES[Math.floor(Math.random() * COMEDIC_TITLES.length)];
}

const positions: Array<{
  title: string;
  department: Department;
  description: string;
  requirements: string[];
  salaryMin: number;
  salaryMax: number;
  clearanceLevel: ClearanceLevel;
  location?: string;
}> = [
  {
    title: 'Chief Brooding Officer (CBO)',
    department: 'C_SUITE',
    description: 'Oversee all corporate brooding initiatives. Must be able to stare meaningfully out of floor-to-ceiling windows during thunderstorms. Responsible for setting the tone of existential dread across all departments.',
    requirements: ['10+ years brooding experience', 'Tragic backstory required', 'Own cape preferred', 'Must pass background darkness check'],
    salaryMin: 450,
    salaryMax: 850,
    clearanceLevel: 'COSMIC',
  },
  {
    title: 'VP of Intimidation & Stakeholder Relations',
    department: 'C_SUITE',
    description: 'Lead intimidation strategy across all client-facing operations. Ensure that quarterly earnings calls inspire appropriate levels of fear in shareholders.',
    requirements: ['Superhuman presence', 'Ability to make boardrooms go silent', 'MBA or equivalent world domination experience'],
    salaryMin: 350,
    salaryMax: 600,
    clearanceLevel: 'TOP_SECRET',
  },
  {
    title: 'Executive Assistant to the CEO',
    department: 'C_SUITE',
    description: 'Manage the schedule, correspondence, and general chaos surrounding the CEO. Must anticipate needs before they arise (precognition literally counts).',
    requirements: ['Precognition or extreme organizational skills', 'Discretion level: cosmic', 'Can handle classified documents', 'Makes excellent coffee'],
    salaryMin: 80,
    salaryMax: 130,
    clearanceLevel: 'TOP_SECRET',
  },
  {
    title: 'Senior Night Watch Specialist',
    department: 'SECURITY',
    description: 'Patrol the Megacorp campus between 10PM and 6AM. Must be comfortable working in complete darkness. Preference given to candidates who are literally nocturnal.',
    requirements: ['Night vision or equivalent', 'Comfortable in darkness', 'No fear of bats, rats, or middle managers after hours'],
    salaryMin: 65,
    salaryMax: 95,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Physical Security & Asset Protection Lead',
    department: 'SECURITY',
    description: 'Protect corporate assets through displays of raw physical superiority. Standing menacingly in lobbies is 40% of the role.',
    requirements: ['Strength rating above 70', 'Durability rating above 60', 'Ability to stand menacingly for 8+ hours', 'Comfortable in corporate-branded body armor'],
    salaryMin: 85,
    salaryMax: 130,
    clearanceLevel: 'SECRET',
  },
  {
    title: 'Threat Assessment Analyst',
    department: 'SECURITY',
    description: 'Analyze incoming threats to Megacorp\'s bottom line and physical infrastructure. Distinguish between actual supervillain attacks and disgruntled employees in the break room.',
    requirements: ['Intelligence rating above 75', 'Precognition preferred but not required', 'Proficiency in Microsoft Excel'],
    salaryMin: 90,
    salaryMax: 140,
    clearanceLevel: 'TOP_SECRET',
  },
  {
    title: 'Senior Systems Architect (Gadget Division)',
    department: 'IT',
    description: 'Design and maintain Megacorp\'s ludicrously over-engineered IT infrastructure. Must have experience building systems that no one else understands.',
    requirements: ['Experience with gadget-based problem solving', 'Can build a supercomputer from office supplies', 'Willing to explain printer issues to C-suite'],
    salaryMin: 130,
    salaryMax: 200,
    clearanceLevel: 'SECRET',
  },
  {
    title: 'Help Desk Technician (Tier Omega)',
    department: 'IT',
    description: 'Handle escalated IT tickets that have defeated all mortal technicians. Must be able to interface with alien, magical, and interdimensional hardware.',
    requirements: ['Technopathy preferred', 'Patience of a saint', 'Must not vaporize equipment when frustrated'],
    salaryMin: 55,
    salaryMax: 80,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'Data Entry Clerk (Classified Archives)',
    department: 'IT',
    description: 'Enter classified data into Megacorp\'s database systems. The data is boring. The security clearance required to see it is not. This is a surprisingly lonely job.',
    requirements: ['Typing speed 80+ WPM', 'Secret clearance minimum', 'Short-term memory issues a plus', 'Must sign 47-page NDA'],
    salaryMin: 40,
    salaryMax: 55,
    clearanceLevel: 'SECRET',
  },
  {
    title: 'Director of Brand Charisma',
    department: 'MARKETING',
    description: 'Lead all brand messaging with supernatural levels of charm. Must convince the public that Megacorp cares about them.',
    requirements: ['Charisma stat off the charts', 'Experience manipulating public perception', 'Photogenic', 'Morally flexible'],
    salaryMin: 140,
    salaryMax: 220,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Social Media Engagement Operative',
    department: 'MARKETING',
    description: 'Manage Megacorp\'s social media presence with superhuman speed. Must respond to 10,000 tweets per hour while maintaining the illusion of authentic human connection.',
    requirements: ['Super speed typing', 'Familiarity with all social platforms including interdimensional ones', 'Thick skin (literally or figuratively)'],
    salaryMin: 50,
    salaryMax: 75,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'Enterprise Sales Overlord',
    department: 'SALES',
    description: 'Close deals with enterprise clients using any means necessary (within legal limits, loosely defined).',
    requirements: ['Persuasion abilities (natural or supernatural)', 'No soul required', 'Quota: $50M/quarter', 'Own suit (cape optional)'],
    salaryMin: 100,
    salaryMax: 300,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Cold Call Specialist (Literally)',
    department: 'SALES',
    description: 'Make outbound sales calls. "Cold" refers to both the calling technique and the ideal candidate\'s demeanor.',
    requirements: ['Ice powers helpful', '300+ calls per day minimum', 'Emotional numbness', 'CRM experience'],
    salaryMin: 45,
    salaryMax: 70,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'Director of Superhuman Resources',
    department: 'HR',
    description: 'Manage all HR operations for a workforce that can bench-press buildings and shoot lasers. Mediate conflicts where "hostile work environment" might mean someone set the office on fire. Again.',
    requirements: ['Empathy (real or convincingly faked)', 'Fireproof', 'Experience with workers\' comp for cosmic injuries', 'De-escalation training'],
    salaryMin: 120,
    salaryMax: 180,
    clearanceLevel: 'SECRET',
  },
  {
    title: 'Talent Acquisition Specialist (Enhanced Division)',
    department: 'HR',
    description: 'Recruit superpowered individuals into the Megacorp family. Must be comfortable approaching beings who could destroy you with a thought and asking them to fill out a W-4.',
    requirements: ['Bravery', 'Excellent communication skills', 'Experience recruiting reluctant demigods', 'No restraining orders from the Justice League'],
    salaryMin: 70,
    salaryMax: 110,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Corporate Wellness Coordinator (Invulnerability Division)',
    department: 'HR',
    description: 'Design wellness programs for employees whose idea of "cardio" is outrunning a missile. Organize trust falls where someone might actually fall from orbit.',
    requirements: ['Fitness background', 'Ability to scale programs for super-strength', 'First aid certified (cosmic tier)', 'Yoga instructor cert preferred'],
    salaryMin: 55,
    salaryMax: 80,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'Principal Research Scientist (Weird Division)',
    department: 'RESEARCH',
    description: 'Lead research into phenomena that make other scientists cry. Investigate why the coffee machine on Floor 7 gives everyone telekinesis.',
    requirements: ['Intelligence rating 90+', 'PhD or equivalent cosmic enlightenment', 'Comfortable with reality-bending experiments', 'Lab coat required (cape counts)'],
    salaryMin: 150,
    salaryMax: 250,
    clearanceLevel: 'TOP_SECRET',
  },
  {
    title: 'Lab Technician (Containment Protocols)',
    department: 'RESEARCH',
    description: 'Maintain containment on experiments that should probably never have been started. Do NOT make eye contact with Test Subject 47.',
    requirements: ['Durability rating above 50', 'Hazmat certification (cosmic tier)', 'Signed liability waiver', 'Next of kin on file'],
    salaryMin: 55,
    salaryMax: 85,
    clearanceLevel: 'SECRET',
  },
  {
    title: 'Regional Manager of Meaningless Metrics',
    department: 'MIDDLE_MANAGEMENT',
    description: 'Generate, track, and present metrics that sound important but measure nothing. Your direct reports will resent you. Your superiors will ignore you. This is the way.',
    requirements: ['PowerPoint mastery', 'Ability to say "synergy" without flinching', 'Comfortable being neither liked nor respected', 'Khaki tolerance'],
    salaryMin: 80,
    salaryMax: 120,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'Assistant to the Regional Manager of Meaningless Metrics',
    department: 'MIDDLE_MANAGEMENT',
    description: 'Support the Regional Manager in all metric-adjacent activities. Fetch coffee. Collate reports. Absorb blame.',
    requirements: ['Obedience', 'Speed (for coffee runs)', 'Ability to suppress personal ambitions', 'Must not outshine manager'],
    salaryMin: 40,
    salaryMax: 55,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'Interdepartmental Liaison (Damage Control)',
    department: 'MIDDLE_MANAGEMENT',
    description: 'Serve as the human shield between departments that hate each other. You will be blamed for everything. Benefits are decent though.',
    requirements: ['Diplomacy', 'Indestructibility preferred', 'Experience managing egos larger than planets', 'Therapist on retainer'],
    salaryMin: 70,
    salaryMax: 100,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Chief Financial Overlord',
    department: 'FINANCE',
    description: 'Control the purse strings of an organization whose annual "collateral damage" budget exceeds most nations\' GDP.',
    requirements: ['CPA or equivalent', 'Wealth management experience ($1B+)', 'Courage (financial and physical)', 'Experience with insurance claims for acts of god(s)'],
    salaryMin: 300,
    salaryMax: 550,
    clearanceLevel: 'TOP_SECRET',
  },
  {
    title: 'Payroll Administrator (Hazard Pay Division)',
    department: 'FINANCE',
    description: 'Process payroll for employees whose compensation packages include gold bullion, vibranium, and "exposure."',
    requirements: ['Attention to detail', 'Numeracy (Earth math and at least one alien system)', 'Discretion regarding executive compensation'],
    salaryMin: 60,
    salaryMax: 90,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Facilities Manager (Structural Integrity)',
    department: 'FACILITIES',
    description: 'Maintain building integrity in an office where coworkers regularly punch through walls, fly through ceilings, and create black holes in the break room.',
    requirements: ['Construction management experience', 'Durability helps', 'On-call 24/7 for "incidents"', 'High tolerance for drywall dust'],
    salaryMin: 75,
    salaryMax: 115,
    clearanceLevel: 'ENHANCED',
  },
  {
    title: 'Janitorial Lead (Biohazard & Cosmic Waste)',
    department: 'FACILITIES',
    description: 'Lead the janitorial team in cleaning up after superpowered employees. Standard messes include: scorch marks, ectoplasm, temporal residue.',
    requirements: ['Hazmat experience', 'Strong stomach', 'Immunity to common toxins preferred', 'Must not be curious'],
    salaryMin: 45,
    salaryMax: 65,
    clearanceLevel: 'STANDARD',
  },
  {
    title: 'General Counsel (Interdimensional Law)',
    department: 'LEGAL',
    description: 'Navigate the legal complexities of employing beings from multiple dimensions, timelines, and realities.',
    requirements: ['JD from accredited institution (any dimension)', 'Bar admission in 3+ jurisdictions (planetary or otherwise)', 'Fluent in Legalese and at least one alien language'],
    salaryMin: 200,
    salaryMax: 400,
    clearanceLevel: 'TOP_SECRET',
  },
  {
    title: 'Compliance Officer (Collateral Damage)',
    department: 'LEGAL',
    description: 'Ensure all employee-related property destruction falls within acceptable insurance parameters. Maintain the fiction that Megacorp has a functioning ethics policy.',
    requirements: ['Legal background', 'Extreme patience', 'Fast typing (for incident reports)', 'No conscience preferred'],
    salaryMin: 90,
    salaryMax: 150,
    clearanceLevel: 'SECRET',
  },
  {
    title: 'Mailroom Supervisor (Interdimensional Parcels)',
    department: 'FACILITIES',
    description: 'Manage the sorting and delivery of packages ranging from standard office supplies to unstable antimatter canisters labeled "FRAGILE." Previous experience with portals a plus.',
    requirements: ['Spatial awareness', 'Can lift 50+ lbs (or 50+ tons, we\'re flexible)', 'Comfortable with packages that hum, glow, or whisper', 'First aid training'],
    salaryMin: 42,
    salaryMax: 58,
    clearanceLevel: 'ENHANCED',
  },
];

async function seedPositions() {
  console.log('Seeding positions...');

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    await prisma.position.upsert({
      where: { id: i + 1 },
      update: {
        title: pos.title,
        department: pos.department,
        description: pos.description,
        requirements: pos.requirements,
        salaryMin: pos.salaryMin,
        salaryMax: pos.salaryMax,
        clearanceLevel: pos.clearanceLevel,
        location: pos.location || 'Megacorp Tower, Patriot City',
      },
      create: {
        id: i + 1,
        title: pos.title,
        department: pos.department,
        description: pos.description,
        requirements: pos.requirements,
        salaryMin: pos.salaryMin,
        salaryMax: pos.salaryMax,
        clearanceLevel: pos.clearanceLevel,
        location: pos.location || 'Megacorp Tower, Patriot City',
      },
    });
  }

  console.log(`Seeded ${positions.length} positions.`);
}

async function seedHeroes() {
  const existingCount = await prisma.hero.count();
  if (existingCount >= 700) {
    console.log(`${existingCount} heroes already in database, skipping fetch.`);
    return;
  }

  const token = process.env.SUPERHERO_API_TOKEN;
  if (!token) {
    console.error('SUPERHERO_API_TOKEN not set. Skipping hero seeding.');
    return;
  }

  console.log('Fetching heroes from SuperHero API...');
  const heroes = await fetchAllHeroes(token);

  console.log('Upserting heroes to database...');
  for (const hero of heroes) {
    const availability = randomAvailability();
    const currentTitle = availability === 'EMPLOYED' ? randomTitle() : null;

    await prisma.hero.upsert({
      where: { id: hero.id },
      update: { ...hero },
      create: {
        ...hero,
        availability,
        currentTitle,
      },
    });
  }

  console.log(`Seeded ${heroes.length} heroes.`);
}

async function main() {
  try {
    await seedPositions();
    await seedHeroes();
  } catch (err) {
    console.error('Seed error:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

main();
