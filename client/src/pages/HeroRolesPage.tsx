import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { ErrorCard } from '../components/ui/ErrorCard';
import { EmptyState } from '../components/ui/EmptyState';
import { DepartmentBadge, ClearanceBadge } from '../components/ui/Badge';
import { useHeroRoles } from '../hooks/useHeroRoles';

export function HeroRolesPage() {
  const { id } = useParams();
  const heroId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading, error, refetch } = useHeroRoles(heroId);
  const [imgError, setImgError] = useState(false);

  return (
    <PageShell>
      <Link
        to={`/talent/${id}`}
        className="text-mega-blue-500 hover:text-mega-blue-700 font-heading text-sm mb-4 inline-block"
      >
        &larr; Back to Profile
      </Link>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-mega-blue-200 border-t-hero-gold-500 rounded-full animate-spin mb-6" />
          <p className="font-heading text-mega-blue-800 text-lg animate-pulse">
            Analyzing candidate-role synergy matrix...
          </p>
        </div>
      )}

      {error && (
        <ErrorCard
          message="The role matching engine is experiencing a synergy shortfall. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {data && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-mega-blue-500 shrink-0">
              {imgError ? (
                <div className="w-full h-full bg-mega-blue-200 flex items-center justify-center">
                  <span className="font-display text-mega-blue-600 text-sm">
                    {data.hero.name.charAt(0)}
                  </span>
                </div>
              ) : (
                <img
                  src={data.hero.imageUrl}
                  alt={data.hero.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
            <div>
              <h1 className="font-heading text-mega-blue-800 text-2xl">
                Potential Roles for {data.hero.name}
              </h1>
              <p className="text-corp-gray-500 text-sm">
                {data.roles.length} position{data.roles.length !== 1 ? 's' : ''} identified
              </p>
            </div>
          </div>

          {data.roles.length === 0 ? (
            <EmptyState message="No suitable roles found. This candidate may be overqualified for everything." />
          ) : (
            <div className="space-y-4">
              {data.roles.map((role) => {
                const scoreColor =
                  role.score > 80
                    ? 'text-hero-gold-500'
                    : role.score >= 60
                      ? 'text-mega-blue-500'
                      : 'text-corp-gray-500';

                return (
                  <div
                    key={role.id}
                    className="border-2 border-mega-blue-200 rounded-lg p-6 hover:border-mega-blue-400 transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="font-heading text-xl text-mega-blue-800">
                          {role.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <DepartmentBadge department={role.department} />
                          <ClearanceBadge level={role.clearanceLevel} />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-display text-3xl ${scoreColor}`}>
                          {role.score}%
                        </span>
                        <p className="text-xs text-corp-gray-400">Match</p>
                      </div>
                    </div>

                    <p className="text-sm text-corp-gray-700 mb-3">{role.reasoning}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-corp-gray-500">
                        ${role.salaryMin}k - ${role.salaryMax}k
                      </span>
                      <Link
                        to={`/positions/${role.positionId}/matches`}
                        className="text-mega-blue-500 hover:text-mega-blue-700 font-heading text-sm"
                      >
                        View Position &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
