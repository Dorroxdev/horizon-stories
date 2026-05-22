import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { pillars, pillarSlugs, type PillarSlug } from '@/data/pillars';

export interface PillarFilterChipsProps {
  className?: string;
}

const baseChipClass =
  'rounded-full px-4 py-1.5 text-sm font-medium border transition-colors';
const activeChipClass = 'bg-primary text-primary-foreground border-primary';
const inactiveChipClass =
  'bg-transparent text-foreground/70 border-border hover:border-primary/50 hover:text-foreground';

export function PillarFilterChips({ className }: PillarFilterChipsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePillar = searchParams.get('pillar');

  const handleAllClick = () => {
    setSearchParams({});
  };

  const handlePillarClick = (slug: PillarSlug) => {
    setSearchParams({ pillar: slug });
  };

  const allActive = activePillar === null;

  return (
    <div
      role="group"
      aria-label="Filter posts by pillar"
      className={cn('flex flex-wrap gap-2', className)}
    >
      <button
        type="button"
        onClick={handleAllClick}
        aria-pressed={allActive}
        className={cn(baseChipClass, allActive ? activeChipClass : inactiveChipClass)}
      >
        All
      </button>
      {pillarSlugs.map((slug) => {
        const isActive = activePillar === slug;
        return (
          <button
            key={slug}
            type="button"
            onClick={() => handlePillarClick(slug)}
            aria-pressed={isActive}
            className={cn(baseChipClass, isActive ? activeChipClass : inactiveChipClass)}
          >
            {pillars[slug].label}
          </button>
        );
      })}
    </div>
  );
}

export default PillarFilterChips;
