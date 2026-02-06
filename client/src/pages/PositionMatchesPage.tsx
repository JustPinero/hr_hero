import { useParams, Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { MatchPanel } from '../components/matches/MatchPanel';
import { ErrorCard } from '../components/ui/ErrorCard';
import { EmptyState } from '../components/ui/EmptyState';
import { DepartmentBadge } from '../components/ui/Badge';
import { usePositionMatches } from '../hooks/usePositionMatches';

export function PositionMatchesPage() {
  const { id } = useParams();
  const positionId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading, error, refetch } = usePositionMatches(positionId);

  return (
    <PageShell>
      <Link
        to="/positions"
        className="text-mega-blue-500 hover:text-mega-blue-700 font-heading text-sm mb-4 inline-block"
      >
        &larr; Back to Positions
      </Link>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-mega-blue-200 border-t-hero-gold-500 rounded-full animate-spin mb-6" />
          <p className="font-heading text-mega-blue-800 text-lg animate-pulse">
            MEGACORP AI TALENT SCOUT is analyzing candidate synergies...
          </p>
          <p className="text-corp-gray-400 text-sm mt-2">
            This may take a moment while we leverage our proprietary matching algorithms.
          </p>
        </div>
      )}

      {error && (
        <ErrorCard
          message="Our AI Talent Scout is currently recalibrating. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {data && (
        <>
          <div className="mb-6">
            <h1 className="font-heading text-mega-blue-800 text-2xl">
              {data.position.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <DepartmentBadge department={data.position.department} />
              <span className="text-sm text-corp-gray-500">
                ${data.position.salaryMin}k - ${data.position.salaryMax}k
              </span>
            </div>
          </div>

          {data.matches.length === 0 ? (
            <EmptyState message="No suitable candidates found. Consider lowering your standards." />
          ) : (
            <MatchPanel matches={data.matches} />
          )}
        </>
      )}
    </PageShell>
  );
}
