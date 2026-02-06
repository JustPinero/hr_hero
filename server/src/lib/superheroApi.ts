interface RawHero {
  response: string;
  id: string;
  name: string;
  powerstats: Record<string, string>;
  biography: {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    'eye-color': string;
    'hair-color': string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    'group-affiliation': string;
    relatives: string;
  };
  image: {
    url: string;
  };
}

function parseStat(value: string | null | undefined): number {
  if (!value || value === 'null') return 0;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function parseHeight(height: string[]): number | null {
  if (!height || height.length < 2) return null;
  const cm = height[1];
  if (!cm) return null;
  const match = cm.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function parseWeight(weight: string[]): number | null {
  if (!weight || weight.length < 2) return null;
  const kg = weight[1];
  if (!kg) return null;
  const match = kg.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function generateSlug(name: string, id: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${base}-${id}`;
}

function cleanString(value: string | null | undefined): string {
  if (!value || value === 'null' || value === '-') return '';
  return value;
}

export function parseHero(raw: RawHero) {
  return {
    id: parseInt(raw.id, 10),
    name: raw.name || 'Unknown',
    slug: generateSlug(raw.name || `hero-${raw.id}`, raw.id),
    intelligence: parseStat(raw.powerstats?.intelligence),
    strength: parseStat(raw.powerstats?.strength),
    speed: parseStat(raw.powerstats?.speed),
    durability: parseStat(raw.powerstats?.durability),
    power: parseStat(raw.powerstats?.power),
    combat: parseStat(raw.powerstats?.combat),
    fullName: cleanString(raw.biography?.['full-name']),
    alterEgos: cleanString(raw.biography?.['alter-egos']),
    aliases: Array.isArray(raw.biography?.aliases)
      ? raw.biography.aliases.filter((a) => a && a !== 'null')
      : [],
    placeOfBirth: cleanString(raw.biography?.['place-of-birth']),
    firstAppearance: cleanString(raw.biography?.['first-appearance']),
    publisher: cleanString(raw.biography?.publisher),
    alignment: cleanString(raw.biography?.alignment),
    gender: cleanString(raw.appearance?.gender),
    race: cleanString(raw.appearance?.race),
    heightCm: parseHeight(raw.appearance?.height || []),
    weightKg: parseWeight(raw.appearance?.weight || []),
    eyeColor: cleanString(raw.appearance?.['eye-color']),
    hairColor: cleanString(raw.appearance?.['hair-color']),
    occupation: cleanString(raw.work?.occupation),
    base: cleanString(raw.work?.base),
    groupAffiliation: cleanString(raw.connections?.['group-affiliation']),
    relatives: cleanString(raw.connections?.relatives),
    imageUrl: raw.image?.url || '',
  };
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (response.status === 404) return response;
    } catch {
      if (i === retries - 1) throw new Error(`Failed to fetch ${url} after ${retries} retries`);
    }
    await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
  }
  throw new Error(`Failed to fetch ${url}`);
}

export async function fetchHero(id: number, token: string): Promise<RawHero | null> {
  const url = `https://superheroapi.com/api/${token}/${id}`;
  const response = await fetchWithRetry(url);
  const data = (await response.json()) as RawHero;

  if (data.response !== 'success') return null;
  return data;
}

export async function fetchAllHeroes(
  token: string
): Promise<ReturnType<typeof parseHero>[]> {
  const heroes: ReturnType<typeof parseHero>[] = [];
  const total = 731;

  for (let id = 1; id <= total; id++) {
    try {
      const raw = await fetchHero(id, token);
      if (raw) {
        heroes.push(parseHero(raw));
      }
    } catch (err) {
      console.warn(`Failed to fetch hero ${id}:`, err);
    }

    if (id % 50 === 0) {
      console.log(`Fetched ${id}/${total} heroes...`);
    }

    // Rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`Fetched ${heroes.length} heroes total.`);
  return heroes;
}
