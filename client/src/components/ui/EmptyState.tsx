interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'No data available. Please consult your department head.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-corp-gray-200 rounded-full flex items-center justify-center mb-4">
        <span className="text-corp-gray-400 text-2xl">?</span>
      </div>
      <p className="text-corp-gray-500 text-sm">{message}</p>
    </div>
  );
}
