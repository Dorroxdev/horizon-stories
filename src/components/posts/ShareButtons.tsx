import { useEffect, useRef, useState } from 'react';
import { Twitter, Linkedin, Copy, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

const buttonClasses =
  'inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/50 hover:text-primary transition-colors';

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const handleCopy = () => {
    if (!navigator?.clipboard?.writeText) {
      toast.error('Could not copy');
      return;
    }
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Link copied');
        setCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, 2000);
      })
      .catch(() => {
        toast.error('Could not copy');
      });
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className={buttonClasses}
      >
        <Twitter aria-hidden="true" className="w-4 h-4" />
        <span className="hidden sm:inline">Share on Twitter</span>
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={buttonClasses}
      >
        <Linkedin aria-hidden="true" className="w-4 h-4" />
        <span className="hidden sm:inline">Share on LinkedIn</span>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={buttonClasses}
      >
        {copied ? (
          <CheckCheck aria-hidden="true" className="w-4 h-4" />
        ) : (
          <Copy aria-hidden="true" className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  );
}

export default ShareButtons;
