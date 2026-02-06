import type { ReactNode } from 'react';
import type { Department, Availability, ClearanceLevel } from '../../types';
import { DEPARTMENT_COLORS, DEPARTMENT_LABELS, AVAILABILITY_COLORS, AVAILABILITY_LABELS, CLEARANCE_LABELS } from '../../lib/constants';

interface BadgeProps {
  children?: ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-heading text-white ${className}`}>
      {children}
    </span>
  );
}

export function DepartmentBadge({ department }: { department: Department }) {
  return (
    <Badge className={DEPARTMENT_COLORS[department]}>
      {DEPARTMENT_LABELS[department]}
    </Badge>
  );
}

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  return (
    <Badge className={AVAILABILITY_COLORS[availability]}>
      {AVAILABILITY_LABELS[availability]}
    </Badge>
  );
}

export function ClearanceBadge({ level }: { level: ClearanceLevel }) {
  const colors: Record<ClearanceLevel, string> = {
    STANDARD: 'bg-corp-gray-400',
    ENHANCED: 'bg-mega-blue-400',
    SECRET: 'bg-hero-gold-600',
    TOP_SECRET: 'bg-villain-red-500',
    COSMIC: 'bg-dept-hr',
  };

  return (
    <Badge className={colors[level]}>
      {CLEARANCE_LABELS[level]}
    </Badge>
  );
}

export function AlignmentBadge({ alignment }: { alignment: string }) {
  const colors: Record<string, string> = {
    good: 'bg-hero-green-500',
    bad: 'bg-villain-red-500',
    neutral: 'bg-corp-gray-400',
  };

  return (
    <Badge className={colors[alignment] || 'bg-corp-gray-400'}>
      {alignment || 'Unknown'}
    </Badge>
  );
}
