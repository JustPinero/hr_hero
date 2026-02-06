import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-hero-gold-500 text-6xl mb-4">404</h1>
        <h2 className="font-heading text-mega-blue-800 text-2xl mb-4">
          SECTOR RESTRICTED
        </h2>
        <p className="text-corp-gray-600 max-w-md mb-8">
          This area of Megacorp Tower requires clearance you do not possess.
          Please report to your designated cubicle immediately.
        </p>
        <Link
          to="/positions"
          className="px-6 py-3 bg-hero-gold-500 text-mega-blue-900 font-heading rounded hover:bg-hero-gold-400 transition-colors"
        >
          Return to Safety
        </Link>
      </div>
    </PageShell>
  );
}
