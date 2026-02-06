import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MatchedHero } from '../../types';

interface MatchBlurbProps {
  match: MatchedHero;
}

export function MatchBlurb({ match }: MatchBlurbProps) {
  const [imgError, setImgError] = useState(false);

  const scoreColor =
    match.score > 80
      ? 'text-hero-gold-500'
      : match.score >= 60
        ? 'text-mega-blue-500'
        : 'text-corp-gray-500';

  const initials = match.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="p-6">
      <div className="flex items-start gap-6 mb-6">
        <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-mega-blue-500 shrink-0">
          {imgError ? (
            <div className="w-full h-full bg-mega-blue-200 flex items-center justify-center">
              <span className="font-display text-mega-blue-600 text-2xl">{initials}</span>
            </div>
          ) : (
            <img
              src={match.imageUrl}
              alt={match.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div>
          <h2 className="font-display text-2xl text-mega-blue-800">{match.name}</h2>
          <p className="text-corp-gray-500 text-sm">{match.publisher}</p>
          <div className={`font-display text-4xl mt-2 ${scoreColor}`}>
            {match.score}%
          </div>
          <p className="text-xs text-corp-gray-400">Match Score</p>
        </div>
      </div>

      <div className="bg-corp-gray-50 border-2 border-mega-blue-200 rounded-lg p-4 mb-6">
        <p className="text-xs font-heading text-corp-gray-400 uppercase mb-2">
          RE: Candidate Assessment &mdash; {match.name}
        </p>
        <p className="text-sm text-corp-gray-700 leading-relaxed">{match.reasoning}</p>
      </div>

      <Link
        to={`/talent/${match.heroId}`}
        className="inline-block px-4 py-2 bg-mega-blue-600 text-white font-heading text-sm rounded hover:bg-mega-blue-700 transition-colors"
      >
        View Full Profile
      </Link>
    </div>
  );
}
