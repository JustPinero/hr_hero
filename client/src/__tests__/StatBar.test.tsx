import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBar } from '../components/ui/StatBar';

describe('StatBar', () => {
  it('renders label and value', () => {
    render(<StatBar label="Strength" value={75} />);

    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('sets width style based on value', () => {
    const { container } = render(<StatBar label="Intelligence" value={85} />);

    const bar = container.querySelector('[style]');
    expect(bar).toHaveStyle({ width: '85%' });
  });

  it('caps width at 100%', () => {
    const { container } = render(<StatBar label="Power" value={150} />);

    const bar = container.querySelector('[style]');
    expect(bar).toHaveStyle({ width: '100%' });
  });

  it('handles zero value', () => {
    const { container } = render(<StatBar label="Combat" value={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    const bar = container.querySelector('[style]');
    expect(bar).toHaveStyle({ width: '0%' });
  });

  it('uses default color class', () => {
    const { container } = render(<StatBar label="Speed" value={50} />);

    const bar = container.querySelector('[style]');
    expect(bar?.className).toContain('bg-mega-blue-500');
  });

  it('applies custom color class', () => {
    const { container } = render(
      <StatBar label="Speed" value={50} color="bg-hero-gold-500" />
    );

    const bar = container.querySelector('[style]');
    expect(bar?.className).toContain('bg-hero-gold-500');
  });
});
