export type Availability = 'AVAILABLE' | 'EMPLOYED' | 'FREELANCE' | 'RETIRED';
export type Department = 'HR' | 'MARKETING' | 'SALES' | 'RESEARCH' | 'C_SUITE' | 'SECURITY' | 'IT' | 'MIDDLE_MANAGEMENT' | 'FINANCE' | 'FACILITIES' | 'LEGAL';
export type ClearanceLevel = 'STANDARD' | 'ENHANCED' | 'SECRET' | 'TOP_SECRET' | 'COSMIC';
export type PositionStatus = 'OPEN' | 'FILLED' | 'ON_HOLD';

export interface HeroListItem {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  publisher: string;
  alignment: string;
  availability: Availability;
  currentTitle: string | null;
}

export interface PaginatedHeroes {
  heroes: HeroListItem[];
  nextCursor: number | null;
  total: number;
}

export interface HeroDetail {
  id: number;
  name: string;
  slug: string;
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
  gender: string;
  race: string;
  heightCm: number | null;
  weightKg: number | null;
  eyeColor: string;
  hairColor: string;
  occupation: string;
  base: string;
  groupAffiliation: string;
  relatives: string;
  imageUrl: string;
  availability: Availability;
  currentTitle: string | null;
  aiPersonalitySummary: string | null;
}

export interface PositionListItem {
  id: number;
  title: string;
  department: Department;
  description: string;
  requirements: string[];
  salaryMin: number;
  salaryMax: number;
  location: string;
  clearanceLevel: ClearanceLevel;
  status: PositionStatus;
}

export type PositionDetail = PositionListItem;

export interface MatchedHero {
  id: number;
  heroId: number;
  name: string;
  slug: string;
  imageUrl: string;
  publisher: string;
  alignment: string;
  availability: Availability;
  currentTitle: string | null;
  score: number;
  reasoning: string;
}

export interface MatchedPosition {
  id: number;
  positionId: number;
  title: string;
  department: Department;
  salaryMin: number;
  salaryMax: number;
  clearanceLevel: ClearanceLevel;
  score: number;
  reasoning: string;
}

export interface PositionMatchResult {
  position: PositionDetail;
  matches: MatchedHero[];
}

export interface HeroRolesResult {
  hero: HeroListItem;
  roles: MatchedPosition[];
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
