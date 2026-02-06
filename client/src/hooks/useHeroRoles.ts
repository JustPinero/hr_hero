import { useQuery } from '@tanstack/react-query';
import { heroApi } from '../lib/api';

export function useHeroRoles(id: number | undefined) {
  return useQuery({
    queryKey: ['heroRoles', id],
    queryFn: () => heroApi.getRoles(id!),
    enabled: !!id,
    staleTime: Infinity,
  });
}
