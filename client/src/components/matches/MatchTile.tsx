import { useState } from 'react';
import type { MatchedHero } from '../../types';
import { AVAILABILITY_DOT_COLORS } from '../../lib/constants';

interface MatchTileProps {
  match: MatchedHero;
  isSelected: boolean;
  onSelect: () => void;
}

export function MatchTile({ match, isSelected, onSelect }: MatchTileProps) {
  const [imgError, setImgError] = useState(false);

  const scoreColor =
    match.score > 80
      ? 'bg-hero-gold-500 text-mega-blue-900'
      : match.score >= 60
        ? 'bg-mega-blue-500 text-white'
        : 'bg-corp-gray-400 text-white';

  const initials = match.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 transition-colors text-left cursor-pointer ${
        isSelected
          ? 'border-l-4 border-hero-gold-500 bg-hero-gold-50'
          : 'border-l-4 border-transparent hover:bg-corp-gray-100'
      }`}
    >
      <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 border-2 border-mega-blue-300">
        {imgError ? (
          <div className="w-full h-full bg-mega-blue-200 flex items-center justify-center">
            <span className="font-display text-mega-blue-600 text-sm">{initials}</span>
          </div>
        ) : (
          <img
            src={match.imageUrl}
            alt={match.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <div
          className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full ${AVAILABILITY_DOT_COLORS[match.availability]}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading text-sm text-mega-blue-800 truncate">{match.name}</p>
        <p className="text-xs text-corp-gray-500 truncate">{match.publisher}</p>
      </div>
      <span className={`px-2 py-1 rounded text-xs font-heading ${scoreColor}`}>
        {match.score}%
      </span>
    </button>
  );
}
