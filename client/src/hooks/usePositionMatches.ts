import { useQuery } from '@tanstack/react-query';
import { positionApi } from '../lib/api';

export function usePositionMatches(id: number | undefined) {
  return useQuery({
    queryKey: ['positionMatches', id],
    queryFn: () => positionApi.getMatches(id!),
    enabled: !!id,
    staleTime: Infinity,
  });
}
