import { useState } from 'react';
import { User2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AuthorBioProps {
  authorName: string;
  authorBio?: string;
  avatarSrc?: string;
  variant: 'compact' | 'full';
  className?: string;
}

export function AuthorBio({
  authorName,
  authorBio,
  avatarSrc = '/authors/altan.jpg',
  variant,
  className,
}: AuthorBioProps) {
  const [imgError, setImgError] = useState(false);

  const isCompact = variant === 'compact';
  const avatarSize = isCompact ? 'w-10 h-10' : 'w-16 h-16';
  const iconSize = isCompact ? 'w-5 h-5' : 'w-8 h-8';
  const nameClass = isCompact ? 'font-medium text-sm' : 'text-base font-medium';
  const roleClass = isCompact ? 'text-xs text-muted-foreground' : 'text-sm text-muted-foreground';

  const avatar = imgError ? (
    <div
      role="img"
      aria-label={authorName}
      className={cn(
        'rounded-full bg-primary/20 flex items-center justify-center shrink-0',
        avatarSize,
      )}
    >
      <User2 className={cn(iconSize, 'text-primary')} aria-hidden="true" />
    </div>
  ) : (
    <img
      src={avatarSrc}
      alt={authorName}
      onError={() => setImgError(true)}
      className={cn('rounded-full border object-cover shrink-0', avatarSize)}
    />
  );

  if (isCompact) {
    return (
      <div className={cn('flex flex-row items-center gap-3', className)}>
        {avatar}
        <div>
          <div className={nameClass}>{authorName}</div>
          <div className={roleClass}>Operator</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('border-t border-border pt-8 mt-12 flex gap-4', className)}>
      {avatar}
      <div>
        <div className={nameClass}>{authorName}</div>
        <div className={roleClass}>Operator</div>
        {authorBio ? (
          <p className="text-base text-muted-foreground mt-3 max-w-xl">{authorBio}</p>
        ) : null}
      </div>
    </div>
  );
}

export default AuthorBio;
