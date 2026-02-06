import { useQuery } from '@tanstack/react-query';
import { positionApi } from '../lib/api';

export function usePosition(id: number | undefined) {
  return useQuery({
    queryKey: ['position', id],
    queryFn: () => positionApi.get(id!),
    enabled: !!id,
  });
}
