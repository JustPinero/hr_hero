import { Link } from 'react-router-dom';
import type { PositionListItem } from '../../types';
import { DepartmentBadge, ClearanceBadge } from '../ui/Badge';
import { STATUS_LABELS } from '../../lib/constants';

interface PositionRowProps {
  position: PositionListItem;
}

export function PositionRow({ position }: PositionRowProps) {
  const statusColor =
    position.status === 'OPEN'
      ? 'text-hero-green-600'
      : position.status === 'FILLED'
        ? 'text-corp-gray-400'
        : 'text-hero-gold-600';

  return (
    <tr className="hover:bg-mega-blue-50 transition-colors border-b border-corp-gray-200">
      <td className="px-4 py-3">
        <div className="font-heading text-mega-blue-800">{position.title}</div>
      </td>
      <td className="px-4 py-3">
        <DepartmentBadge department={position.department} />
      </td>
      <td className="px-4 py-3 text-sm text-corp-gray-600">
        ${position.salaryMin}k - ${position.salaryMax}k
      </td>
      <td className="px-4 py-3 text-sm text-corp-gray-600 hidden md:table-cell">
        {position.location}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <ClearanceBadge level={position.clearanceLevel} />
      </td>
      <td className="px-4 py-3">
        <span className={`text-sm font-heading ${statusColor}`}>
          {STATUS_LABELS[position.status]}
        </span>
      </td>
      <td className="px-4 py-3">
        <Link
          to={`/positions/${position.id}/matches`}
          className="inline-block px-3 py-1.5 bg-hero-gold-500 text-mega-blue-900 font-heading text-xs rounded hover:bg-hero-gold-400 transition-colors"
        >
          Scout Talent
        </Link>
      </td>
    </tr>
  );
}
