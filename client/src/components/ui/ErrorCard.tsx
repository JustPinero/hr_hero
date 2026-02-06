interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorCard({
  message = 'A critical synergy failure has occurred.',
  onRetry,
}: ErrorCardProps) {
  return (
    <div className="border-2 border-villain-red-300 bg-villain-red-50 rounded-lg p-6 text-center max-w-md mx-auto">
      <p className="text-villain-red-700 font-heading text-lg mb-2">System Error</p>
      <p className="text-villain-red-600 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-villain-red-600 text-white rounded font-heading text-sm hover:bg-villain-red-700 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
