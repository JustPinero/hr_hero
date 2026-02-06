import axios from 'axios';
import type {
  PaginatedHeroes,
  HeroDetail,
  HeroRolesResult,
  PositionListItem,
  PositionDetail,
  PositionMatchResult,
} from '../types';

const api = axios.create({
  baseURL: '/api',
});

interface HeroListParams {
  cursor?: number;
  limit?: number;
  search?: string;
  publisher?: string;
  alignment?: string;
  availability?: string;
}

interface PositionListParams {
  department?: string;
  status?: string;
}

export const heroApi = {
  list: (params?: HeroListParams) =>
    api.get<PaginatedHeroes>('/heroes', { params }).then((r) => r.data),
  get: (id: number) =>
    api.get<HeroDetail>(`/heroes/${id}`).then((r) => r.data),
  getRoles: (id: number) =>
    api.get<HeroRolesResult>(`/heroes/${id}/roles`).then((r) => r.data),
  generateSummary: (id: number) =>
    api.post<{ summary: string }>(`/heroes/${id}/generate-summary`).then((r) => r.data),
};

export const positionApi = {
  list: (params?: PositionListParams) =>
    api.get<PositionListItem[]>('/positions', { params }).then((r) => r.data),
  get: (id: number) =>
    api.get<PositionDetail>(`/positions/${id}`).then((r) => r.data),
  getMatches: (id: number) =>
    api.get<PositionMatchResult>(`/positions/${id}/matches`).then((r) => r.data),
};
