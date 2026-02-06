import { StatBar } from '../ui/StatBar';

interface HeroStatsProps {
  stats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div>
      <h3 className="font-heading text-mega-blue-800 text-lg mb-3">Performance Metrics</h3>
      <StatBar label="Intelligence" value={stats.intelligence} color="bg-mega-blue-500" />
      <StatBar label="Strength" value={stats.strength} color="bg-villain-red-500" />
      <StatBar label="Speed" value={stats.speed} color="bg-hero-gold-500" />
      <StatBar label="Durability" value={stats.durability} color="bg-hero-green-500" />
      <StatBar label="Power" value={stats.power} color="bg-dept-hr" />
      <StatBar label="Combat" value={stats.combat} color="bg-dept-marketing" />
    </div>
  );
}
