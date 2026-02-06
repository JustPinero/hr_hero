import { describe, it, expect } from 'vitest';
import { parseHero } from '../lib/superheroApi';

describe('parseHero', () => {
  const makeRawHero = (overrides: Record<string, unknown> = {}) => ({
    response: 'success',
    id: '70',
    name: 'Batman',
    powerstats: {
      intelligence: '100',
      strength: '26',
      speed: '27',
      durability: '50',
      power: '47',
      combat: '100',
    },
    biography: {
      'full-name': 'Bruce Wayne',
      'alter-egos': 'No alter egos found.',
      aliases: ['Insider', 'Matches Malone'],
      'place-of-birth': 'Crest Hill, Bristol Township; Gotham County',
      'first-appearance': 'Detective Comics #27',
      publisher: 'DC Comics',
      alignment: 'good',
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ["6'2", '188 cm'],
      weight: ['210 lb', '95 kg'],
      'eye-color': 'blue',
      'hair-color': 'black',
    },
    work: {
      occupation: 'Businessman',
      base: 'Batcave, Stately Wayne Manor, Gotham City',
    },
    connections: {
      'group-affiliation': 'Batman Family, Batman Incorporated',
      relatives: 'Damian Wayne (son), Dick Grayson (ward)',
    },
    image: {
      url: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
    },
    ...overrides,
  });

  it('parses a standard hero correctly', () => {
    const result = parseHero(makeRawHero());

    expect(result.id).toBe(70);
    expect(result.name).toBe('Batman');
    expect(result.slug).toBe('batman-70');
    expect(result.intelligence).toBe(100);
    expect(result.strength).toBe(26);
    expect(result.speed).toBe(27);
    expect(result.durability).toBe(50);
    expect(result.power).toBe(47);
    expect(result.combat).toBe(100);
    expect(result.fullName).toBe('Bruce Wayne');
    expect(result.publisher).toBe('DC Comics');
    expect(result.alignment).toBe('good');
    expect(result.gender).toBe('Male');
    expect(result.heightCm).toBe(188);
    expect(result.weightKg).toBe(95);
    expect(result.imageUrl).toBe('https://www.superherodb.com/pictures2/portraits/10/100/639.jpg');
    expect(result.aliases).toEqual(['Insider', 'Matches Malone']);
  });

  it('handles "null" string powerstats as 0', () => {
    const result = parseHero(
      makeRawHero({
        powerstats: {
          intelligence: 'null',
          strength: 'null',
          speed: 'null',
          durability: 'null',
          power: 'null',
          combat: 'null',
        },
      })
    );

    expect(result.intelligence).toBe(0);
    expect(result.strength).toBe(0);
    expect(result.speed).toBe(0);
    expect(result.durability).toBe(0);
    expect(result.power).toBe(0);
    expect(result.combat).toBe(0);
  });

  it('handles missing height/weight gracefully', () => {
    const result = parseHero(
      makeRawHero({
        appearance: {
          gender: 'Male',
          race: 'Human',
          height: ['-', '-'],
          weight: ['-', '-'],
          'eye-color': 'blue',
          'hair-color': 'black',
        },
      })
    );

    expect(result.heightCm).toBeNull();
    expect(result.weightKg).toBeNull();
  });

  it('handles "null" biography strings as empty', () => {
    const result = parseHero(
      makeRawHero({
        biography: {
          'full-name': 'null',
          'alter-egos': 'null',
          aliases: ['null'],
          'place-of-birth': 'null',
          'first-appearance': 'null',
          publisher: 'null',
          alignment: 'null',
        },
      })
    );

    expect(result.fullName).toBe('');
    expect(result.alterEgos).toBe('');
    expect(result.placeOfBirth).toBe('');
    expect(result.firstAppearance).toBe('');
    expect(result.publisher).toBe('');
    expect(result.aliases).toEqual([]);
  });

  it('generates slug with special characters cleaned', () => {
    const result = parseHero(
      makeRawHero({ id: '250', name: 'A-Bomb (HAS)' })
    );

    expect(result.slug).toBe('a-bomb-has-250');
  });

  it('handles missing image URL', () => {
    const result = parseHero(
      makeRawHero({ image: { url: '' } })
    );

    expect(result.imageUrl).toBe('');
  });

  it('defaults name to Unknown when empty', () => {
    const result = parseHero(makeRawHero({ name: '' }));
    expect(result.name).toBe('Unknown');
  });

  it('handles dash biography fields as empty', () => {
    const result = parseHero(
      makeRawHero({
        work: { occupation: '-', base: '-' },
      })
    );

    expect(result.occupation).toBe('');
    expect(result.base).toBe('');
  });

  it('parses height with non-standard format', () => {
    const result = parseHero(
      makeRawHero({
        appearance: {
          gender: '-',
          race: '-',
          height: ["5'11", '180 cm'],
          weight: ['165 lb', '75 kg'],
          'eye-color': '-',
          'hair-color': '-',
        },
      })
    );

    expect(result.heightCm).toBe(180);
    expect(result.weightKg).toBe(75);
  });
});
