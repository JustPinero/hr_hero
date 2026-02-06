import type { HeroDetail } from '../../types';

interface HeroBioProps {
  hero: HeroDetail;
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  const display = value || '-';
  return (
    <div className="mb-2">
      <span className="text-xs font-heading text-corp-gray-500 uppercase">{label}</span>
      <p className="text-sm text-corp-gray-800">{display}</p>
    </div>
  );
}

export function HeroBio({ hero }: HeroBioProps) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-mega-blue-200 rounded-lg p-4">
        <h3 className="font-heading text-mega-blue-800 text-lg mb-3">Biography</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <Field label="Full Name" value={hero.fullName} />
          <Field label="Alter Egos" value={hero.alterEgos} />
          <Field label="Place of Birth" value={hero.placeOfBirth} />
          <Field label="First Appearance" value={hero.firstAppearance} />
          <Field label="Publisher" value={hero.publisher} />
          <Field label="Aliases" value={hero.aliases.length > 0 ? hero.aliases.join(', ') : undefined} />
        </div>
      </div>

      <div className="border-2 border-mega-blue-200 rounded-lg p-4">
        <h3 className="font-heading text-mega-blue-800 text-lg mb-3">Appearance</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <Field label="Gender" value={hero.gender} />
          <Field label="Race" value={hero.race} />
          <Field label="Height" value={hero.heightCm ? `${hero.heightCm} cm` : undefined} />
          <Field label="Weight" value={hero.weightKg ? `${hero.weightKg} kg` : undefined} />
          <Field label="Eye Color" value={hero.eyeColor} />
          <Field label="Hair Color" value={hero.hairColor} />
        </div>
      </div>

      <div className="border-2 border-mega-blue-200 rounded-lg p-4">
        <h3 className="font-heading text-mega-blue-800 text-lg mb-3">Work & Operations</h3>
        <Field label="Occupation" value={hero.occupation} />
        <Field label="Base" value={hero.base} />
      </div>

      <div className="border-2 border-mega-blue-200 rounded-lg p-4">
        <h3 className="font-heading text-mega-blue-800 text-lg mb-3">Connections</h3>
        <Field label="Group Affiliation" value={hero.groupAffiliation} />
        <Field label="Relatives" value={hero.relatives} />
      </div>
    </div>
  );
}
