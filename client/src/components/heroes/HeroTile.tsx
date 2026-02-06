import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroListItem } from '../../types';
import { AVAILABILITY_DOT_COLORS } from '../../lib/constants';

interface HeroTileProps {
  hero: HeroListItem;
}

export function HeroTile({ hero }: HeroTileProps) {
  const [imgError, setImgError] = useState(false);

  const initials = hero.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <Link
      to={`/talent/${hero.id}`}
      className="block relative aspect-[3/4] border-4 border-mega-blue-500 rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200 hover:shadow-hero-lg shadow-card"
    >
      {imgError ? (
        <div className="w-full h-full bg-mega-blue-200 flex items-center justify-center">
          <span className="font-display text-mega-blue-600 text-3xl">{initials}</span>
        </div>
      ) : (
        <img
          src={hero.imageUrl}
          alt={hero.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}

      <div
        className={`absolute top-2 right-2 w-3 h-3 rounded-full border border-white ${AVAILABILITY_DOT_COLORS[hero.availability]}`}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
        <p className="text-white font-heading text-sm leading-tight truncate">
          {hero.name}
        </p>
        {hero.currentTitle && (
          <p className="text-corp-gray-300 text-[10px] truncate">{hero.currentTitle}</p>
        )}
      </div>
    </Link>
  );
}
