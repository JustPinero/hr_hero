import { useState, useRef, useMemo, useCallback } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { HeroGrid } from '../components/heroes/HeroGrid';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorCard } from '../components/ui/ErrorCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useHeroes } from '../hooks/useHeroes';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function TalentPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(
    () => (debouncedSearch ? { search: debouncedSearch } : undefined),
    [debouncedSearch]
  );

  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHeroes(filters);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300);
  };

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useIntersectionObserver(sentinelRef, handleIntersect, !!hasNextPage);

  const heroes = data?.pages.flatMap((p) => p.heroes) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  return (
    <PageShell
      title="Talent Pool"
      subtitle="Available Human Capital Assets"
    >
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search assets by name..."
          className="w-full sm:w-80 px-4 py-2 border-2 border-mega-blue-300 rounded font-body text-sm bg-white focus:outline-none focus:border-hero-gold-500"
        />
        {total > 0 && (
          <span className="text-sm text-corp-gray-500 font-heading">
            Showing {heroes.length} of {total} assets
          </span>
        )}
      </div>

      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorCard
          message="Failed to load talent pool. The human capital database may be undergoing defragmentation."
          onRetry={() => refetch()}
        />
      )}
      {!isLoading && !error && heroes.length === 0 && (
        <EmptyState message="No heroes match your search criteria. Perhaps they're on a mission." />
      )}
      {heroes.length > 0 && <HeroGrid heroes={heroes} />}

      <div ref={sentinelRef} className="h-4" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-mega-blue-200 border-t-hero-gold-500 rounded-full animate-spin" />
        </div>
      )}
    </PageShell>
  );
}
