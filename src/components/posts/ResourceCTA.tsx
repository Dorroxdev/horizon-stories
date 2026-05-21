import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { getResourceBySlug } from '@/data/resources';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ResourceCTAProps {
  resourceSlug: string;
  className?: string;
}

export function ResourceCTA({ resourceSlug, className }: ResourceCTAProps) {
  const resource = getResourceBySlug(resourceSlug);
  if (!resource) return null;

  return (
    <div
      className={cn(
        'not-prose my-12 rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row gap-4 sm:items-center',
        className,
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">Want the toolkit I reference?</p>
        <h3 className="font-display font-semibold text-xl leading-tight">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{resource.tagline}</p>
      </div>
      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link to={`/resources/${resource.slug}`}>
          Get free access
          <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}

export default ResourceCTA;
