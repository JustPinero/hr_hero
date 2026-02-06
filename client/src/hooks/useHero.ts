import { useQuery } from '@tanstack/react-query';
import { heroApi } from '../lib/api';

export function useHero(id: number | undefined) {
  return useQuery({
    queryKey: ['hero', id],
    queryFn: () => heroApi.get(id!),
    enabled: !!id,
  });
}
