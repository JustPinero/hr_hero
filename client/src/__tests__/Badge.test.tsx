import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, DepartmentBadge, AvailabilityBadge, AlignmentBadge, ClearanceBadge } from '../components/ui/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Test Label</Badge>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="bg-red-500">Test</Badge>);
    const el = screen.getByText('Test');
    expect(el.className).toContain('bg-red-500');
  });
});

describe('DepartmentBadge', () => {
  it('renders department label for C_SUITE', () => {
    render(<DepartmentBadge department="C_SUITE" />);
    expect(screen.getByText('C-Suite')).toBeInTheDocument();
  });

  it('renders department label for SECURITY', () => {
    render(<DepartmentBadge department="SECURITY" />);
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('renders department label for MIDDLE_MANAGEMENT', () => {
    render(<DepartmentBadge department="MIDDLE_MANAGEMENT" />);
    expect(screen.getByText('Middle Management')).toBeInTheDocument();
  });
});

describe('AvailabilityBadge', () => {
  it('renders AVAILABLE label', () => {
    render(<AvailabilityBadge availability="AVAILABLE" />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders EMPLOYED label', () => {
    render(<AvailabilityBadge availability="EMPLOYED" />);
    expect(screen.getByText('Employed')).toBeInTheDocument();
  });

  it('renders RETIRED label', () => {
    render(<AvailabilityBadge availability="RETIRED" />);
    expect(screen.getByText('Retired')).toBeInTheDocument();
  });
});

describe('AlignmentBadge', () => {
  it('renders good alignment', () => {
    render(<AlignmentBadge alignment="good" />);
    expect(screen.getByText('good')).toBeInTheDocument();
  });

  it('renders bad alignment with red color', () => {
    render(<AlignmentBadge alignment="bad" />);
    const badge = screen.getByText('bad');
    expect(badge.className).toContain('bg-villain-red-500');
  });

  it('renders Unknown for empty alignment', () => {
    render(<AlignmentBadge alignment="" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});

describe('ClearanceBadge', () => {
  it('renders COSMIC clearance level', () => {
    render(<ClearanceBadge level="COSMIC" />);
    expect(screen.getByText('Cosmic')).toBeInTheDocument();
  });

  it('renders TOP_SECRET clearance level', () => {
    render(<ClearanceBadge level="TOP_SECRET" />);
    expect(screen.getByText('Top Secret')).toBeInTheDocument();
  });
});
