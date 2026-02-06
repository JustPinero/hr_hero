import { useQuery } from '@tanstack/react-query';
import { positionApi } from '../lib/api';

interface PositionFilters {
  department?: string;
  status?: string;
}

export function usePositions(filters?: PositionFilters) {
  return useQuery({
    queryKey: ['positions', filters],
    queryFn: () => positionApi.list(filters),
  });
}
