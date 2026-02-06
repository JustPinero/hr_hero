import { useState } from 'react';
import type { MatchedHero } from '../../types';
import { MatchTile } from './MatchTile';
import { MatchBlurb } from './MatchBlurb';

interface MatchPanelProps {
  matches: MatchedHero[];
}

export function MatchPanel({ matches }: MatchPanelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = matches[selectedIndex];

  if (!selected) return null;

  return (
    <div className="md:flex md:gap-0 border-2 border-mega-blue-200 rounded-lg overflow-hidden bg-white">
      {/* Left: match list */}
      <div className="md:w-2/5 border-r border-mega-blue-200 max-h-[600px] overflow-y-auto">
        {matches.map((match, i) => (
          <MatchTile
            key={match.id}
            match={match}
            isSelected={i === selectedIndex}
            onSelect={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      {/* Right: selected blurb */}
      <div className="md:w-3/5">
        <MatchBlurb match={selected} />
      </div>
    </div>
  );
}
