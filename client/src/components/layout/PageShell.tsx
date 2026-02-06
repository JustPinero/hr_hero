import type { ReactNode } from 'react';

interface PageShellProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {title && (
        <div className="mb-6">
          <h1 className="font-heading text-mega-blue-800 text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-corp-gray-500 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
