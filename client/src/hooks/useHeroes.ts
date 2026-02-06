import { useInfiniteQuery } from '@tanstack/react-query';
import { heroApi } from '../lib/api';

interface HeroFilters {
  search?: string;
  publisher?: string;
  alignment?: string;
  availability?: string;
}

export function useHeroes(filters?: HeroFilters) {
  return useInfiniteQuery({
    queryKey: ['heroes', filters],
    queryFn: ({ pageParam }) =>
      heroApi.list({ cursor: pageParam, limit: 20, ...filters }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
