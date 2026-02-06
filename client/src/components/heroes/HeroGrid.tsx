import type { HeroListItem } from '../../types';
import { HeroTile } from './HeroTile';

interface HeroGridProps {
  heroes: HeroListItem[];
}

export function HeroGrid({ heroes }: HeroGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {heroes.map((hero) => (
        <HeroTile key={hero.id} hero={hero} />
      ))}
    </div>
  );
}
