import type { Department, Availability, ClearanceLevel, PositionStatus } from '../types';

export const DEPARTMENT_LABELS: Record<Department, string> = {
  HR: 'HR',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  RESEARCH: 'Research',
  C_SUITE: 'C-Suite',
  SECURITY: 'Security',
  IT: 'IT',
  MIDDLE_MANAGEMENT: 'Middle Management',
  FINANCE: 'Finance',
  FACILITIES: 'Facilities',
  LEGAL: 'Legal',
};

export const DEPARTMENT_COLORS: Record<Department, string> = {
  HR: 'bg-dept-hr',
  MARKETING: 'bg-dept-marketing',
  SALES: 'bg-dept-sales',
  RESEARCH: 'bg-dept-research',
  C_SUITE: 'bg-dept-c-suite',
  SECURITY: 'bg-dept-security',
  IT: 'bg-dept-it',
  MIDDLE_MANAGEMENT: 'bg-dept-middle-management',
  FINANCE: 'bg-dept-finance',
  FACILITIES: 'bg-dept-facilities',
  LEGAL: 'bg-dept-legal',
};

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  AVAILABLE: 'Available',
  EMPLOYED: 'Employed',
  FREELANCE: 'Freelance',
  RETIRED: 'Retired',
};

export const AVAILABILITY_COLORS: Record<Availability, string> = {
  AVAILABLE: 'bg-hero-green-500',
  EMPLOYED: 'bg-mega-blue-500',
  FREELANCE: 'bg-hero-gold-500',
  RETIRED: 'bg-corp-gray-400',
};

export const AVAILABILITY_DOT_COLORS: Record<Availability, string> = {
  AVAILABLE: 'bg-hero-green-400',
  EMPLOYED: 'bg-mega-blue-400',
  FREELANCE: 'bg-hero-gold-400',
  RETIRED: 'bg-corp-gray-400',
};

export const CLEARANCE_LABELS: Record<ClearanceLevel, string> = {
  STANDARD: 'Standard',
  ENHANCED: 'Enhanced',
  SECRET: 'Secret',
  TOP_SECRET: 'Top Secret',
  COSMIC: 'Cosmic',
};

export const STATUS_LABELS: Record<PositionStatus, string> = {
  OPEN: 'Open',
  FILLED: 'Filled',
  ON_HOLD: 'On Hold',
};

export const ALL_DEPARTMENTS: Department[] = [
  'C_SUITE', 'SECURITY', 'IT', 'MARKETING', 'SALES', 'HR',
  'RESEARCH', 'MIDDLE_MANAGEMENT', 'FINANCE', 'FACILITIES', 'LEGAL',
];
