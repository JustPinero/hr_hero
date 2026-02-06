import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorCard } from '../components/ui/ErrorCard';

describe('ErrorCard', () => {
  it('renders default error message', () => {
    render(<ErrorCard />);

    expect(screen.getByText('System Error')).toBeInTheDocument();
    expect(
      screen.getByText('A critical synergy failure has occurred.')
    ).toBeInTheDocument();
  });

  it('renders custom error message', () => {
    render(<ErrorCard message="The AI broke again." />);

    expect(screen.getByText('The AI broke again.')).toBeInTheDocument();
  });

  it('does not show retry button when onRetry is not provided', () => {
    render(<ErrorCard />);

    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('shows retry button when onRetry is provided', () => {
    render(<ErrorCard onRetry={() => {}} />);

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const onRetry = vi.fn();
    render(<ErrorCard onRetry={onRetry} />);

    await userEvent.click(screen.getByText('Try Again'));

    expect(onRetry).toHaveBeenCalledOnce();
  });
});
