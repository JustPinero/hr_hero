import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { PositionTable } from '../components/positions/PositionTable';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorCard } from '../components/ui/ErrorCard';
import { EmptyState } from '../components/ui/EmptyState';
import { usePositions } from '../hooks/usePositions';
import { ALL_DEPARTMENTS, DEPARTMENT_LABELS } from '../lib/constants';

export function PositionsPage() {
  const [department, setDepartment] = useState<string>('');
  const { data: positions, isLoading, error, refetch } = usePositions(
    department ? { department } : undefined
  );

  return (
    <PageShell
      title="Open Positions"
      subtitle="Megacorp Industries Talent Requisitions"
    >
      <div className="mb-6">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2 border-2 border-mega-blue-300 rounded font-heading text-sm bg-white text-mega-blue-800 focus:outline-none focus:border-hero-gold-500"
        >
          <option value="">All Departments</option>
          {ALL_DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {DEPARTMENT_LABELS[dept]}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorCard
          message="Failed to load positions. The requisition system may be undergoing scheduled synergy maintenance."
          onRetry={() => refetch()}
        />
      )}
      {positions && positions.length === 0 && (
        <EmptyState message="No positions found for this department. Budget cuts are real." />
      )}
      {positions && positions.length > 0 && (
        <PositionTable positions={positions} />
      )}
    </PageShell>
  );
}
