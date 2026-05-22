import { cn } from '@/lib/utils';
import { pillars, type PillarSlug } from '@/data/pillars';

export interface PillarBadgeProps {
  pillar: PillarSlug;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeClasses: Record<NonNullable<PillarBadgeProps['size']>, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export function PillarBadge({ pillar, size = 'sm', className }: PillarBadgeProps) {
  const meta = pillars[pillar];
  const label = meta?.label ?? pillar;
  const accent = meta?.accentClass ?? '';

  return (
    <span
      className={cn(
        'rounded-full border inline-block',
        sizeClasses[size],
        accent,
        className,
      )}
    >
      {label}
    </span>
  );
}

export default PillarBadge;
