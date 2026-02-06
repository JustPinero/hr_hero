import type { PositionListItem } from '../../types';
import { PositionRow } from './PositionRow';

interface PositionTableProps {
  positions: PositionListItem[];
}

export function PositionTable({ positions }: PositionTableProps) {
  return (
    <div className="overflow-x-auto border-4 border-mega-blue-500 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-mega-blue-800 text-white font-heading text-sm">
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Salary Range</th>
            <th className="px-4 py-3 text-left hidden md:table-cell">Location</th>
            <th className="px-4 py-3 text-left hidden md:table-cell">Clearance</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {positions.map((position) => (
            <PositionRow key={position.id} position={position} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
