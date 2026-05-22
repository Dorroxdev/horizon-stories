import type { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalloutType = 'info' | 'warning' | 'success';

export interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

const config = {
  info: {
    border: 'border-primary/40',
    bg: 'bg-primary/5',
    iconClass: 'text-primary',
    Icon: Info,
  },
  warning: {
    border: 'border-destructive/40',
    bg: 'bg-destructive/5',
    iconClass: 'text-destructive',
    Icon: AlertTriangle,
  },
  success: {
    border: 'border-nessie/40',
    bg: 'bg-nessie/5',
    iconClass: 'text-nessie',
    Icon: CheckCircle2,
  },
} as const;

export function Callout({ type = 'info', children }: CalloutProps) {
  const variant = config[type] ?? config.info;
  const { Icon } = variant;
  return (
    <div
      role="note"
      className={cn(
        'my-6 flex gap-3 rounded-r-lg border-l-2 p-4',
        variant.border,
        variant.bg,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn('w-5 h-5 mt-0.5 shrink-0', variant.iconClass)}
      />
      <div className="flex-1 [&>p]:m-0">{children}</div>
    </div>
  );
}

export default Callout;
