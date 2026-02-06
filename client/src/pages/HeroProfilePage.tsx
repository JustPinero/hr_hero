import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PageShell } from '../components/layout/PageShell';
import { HeroStats } from '../components/heroes/HeroStats';
import { HeroBio } from '../components/heroes/HeroBio';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorCard } from '../components/ui/ErrorCard';
import { AvailabilityBadge, AlignmentBadge, Badge } from '../components/ui/Badge';
import { useHero } from '../hooks/useHero';
import { heroApi } from '../lib/api';

export function HeroProfilePage() {
  const { id } = useParams();
  const heroId = id ? parseInt(id, 10) : undefined;
  const { data: hero, isLoading, error, refetch } = useHero(heroId);
  const queryClient = useQueryClient();
  const [imgError, setImgError] = useState(false);

  const summaryMutation = useMutation({
    mutationFn: () => heroApi.generateSummary(heroId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero', heroId] });
    },
  });

  if (isLoading) return <PageShell><LoadingSpinner /></PageShell>;
  if (error || !hero) {
    return (
      <PageShell>
        <ErrorCard
          message="Failed to load hero profile. This asset may have been decommissioned."
          onRetry={() => refetch()}
        />
      </PageShell>
    );
  }

  const initials = hero.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <PageShell>
      <div className="md:grid md:grid-cols-[400px_1fr] gap-8">
        {/* Left column */}
        <div>
          <div className="border-4 border-mega-blue-500 rounded-lg overflow-hidden mb-4">
            {imgError ? (
              <div className="w-full aspect-square bg-mega-blue-200 flex items-center justify-center">
                <span className="font-display text-mega-blue-600 text-5xl">{initials}</span>
              </div>
            ) : (
              <img
                src={hero.imageUrl}
                alt={hero.name}
                className="w-full aspect-square object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div className="flex gap-2 mb-2">
            <AvailabilityBadge availability={hero.availability} />
            <AlignmentBadge alignment={hero.alignment} />
            {hero.publisher && <Badge className="bg-corp-gray-500">{hero.publisher}</Badge>}
          </div>
          {hero.currentTitle && (
            <p className="font-heading text-corp-gray-600 text-sm">{hero.currentTitle}</p>
          )}
        </div>

        {/* Right column */}
        <div>
          <h1 className="font-display text-4xl text-mega-blue-800 mb-1">{hero.name}</h1>
          {hero.fullName && hero.fullName !== hero.name && (
            <p className="text-corp-gray-600 mb-4">{hero.fullName}</p>
          )}

          <div className="mb-6">
            <HeroStats stats={hero} />
          </div>

          {/* AI Personality Summary */}
          <div className="mb-6 border-2 border-mega-blue-200 rounded-lg p-4">
            <h3 className="font-heading text-mega-blue-800 text-lg mb-3">Personality Assessment</h3>
            {hero.aiPersonalitySummary ? (
              <blockquote className="border-l-4 border-hero-gold-500 pl-4 text-sm text-corp-gray-700 italic">
                {hero.aiPersonalitySummary}
              </blockquote>
            ) : (
              <div>
                <button
                  onClick={() => summaryMutation.mutate()}
                  disabled={summaryMutation.isPending}
                  className="px-4 py-2 bg-mega-blue-600 text-white font-heading text-sm rounded hover:bg-mega-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {summaryMutation.isPending
                    ? 'Running Personality Matrix Analysis...'
                    : 'Generate Assessment'}
                </button>
                {summaryMutation.isError && (
                  <p className="text-villain-red-500 text-xs mt-2">
                    Assessment module unavailable. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>

          <Link
            to={`/talent/${hero.id}/roles`}
            className="inline-block px-6 py-3 bg-hero-gold-500 text-mega-blue-900 font-heading rounded hover:bg-hero-gold-400 transition-colors mb-6"
          >
            View Potential Roles
          </Link>

          <HeroBio hero={hero} />
        </div>
      </div>
    </PageShell>
  );
}
