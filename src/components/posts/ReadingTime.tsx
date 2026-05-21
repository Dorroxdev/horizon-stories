import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReadingTimeProps {
  minutes: number;
  className?: string;
}

export function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-muted-foreground',
        className,
      )}
    >
      <Clock aria-hidden="true" className="w-4 h-4" />
      {minutes} min read
    </span>
  );
}

export default ReadingTime;
