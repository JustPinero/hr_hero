import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../components/ui/EmptyState';

describe('EmptyState', () => {
  it('renders default message', () => {
    render(<EmptyState />);

    expect(
      screen.getByText('No data available. Please consult your department head.')
    ).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<EmptyState message="No heroes found." />);

    expect(screen.getByText('No heroes found.')).toBeInTheDocument();
  });

  it('renders question mark icon', () => {
    render(<EmptyState />);

    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
