import type { Department } from '../../types';
import { DepartmentBadge } from '../ui/Badge';

export function PositionBadge({ department }: { department: Department }) {
  return <DepartmentBadge department={department} />;
}
