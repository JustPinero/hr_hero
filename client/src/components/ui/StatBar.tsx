interface StatBarProps {
  label: string;
  value: number;
  color?: string;
}

export function StatBar({ label, value, color = 'bg-mega-blue-500' }: StatBarProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs font-heading text-corp-gray-600 w-24 text-right uppercase">
        {label}
      </span>
      <div className="flex-1 bg-corp-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-xs font-heading text-corp-gray-700 w-8">{value}</span>
    </div>
  );
}
