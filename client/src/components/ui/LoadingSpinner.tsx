import { useState, useEffect } from 'react';

const MESSAGES = [
  'Synergizing talent data...',
  'Optimizing human capital metrics...',
  'Aligning stakeholder expectations...',
  'Leveraging core competencies...',
  'Recalibrating synergy parameters...',
];

export function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-mega-blue-200 border-t-hero-gold-500 rounded-full animate-spin mb-4" />
      <p className="text-corp-gray-500 font-heading text-sm animate-pulse">
        {MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
