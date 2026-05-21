import SubscribeForm from '@/components/shared/SubscribeForm';
import { cn } from '@/lib/utils';

export interface PostSubscribeCTAProps {
  postSlug: string;
  className?: string;
  headline?: string;
  description?: string;
  source?: string;
}

const DEFAULT_HEADLINE = 'Get founder stories like this every week.';
const DEFAULT_DESCRIPTION =
  "Free. No spam. Unsubscribe anytime. Subscribe and we'll send the latest playbooks and frameworks straight to your inbox.";

export function PostSubscribeCTA({
  postSlug,
  className,
  headline = DEFAULT_HEADLINE,
  description = DEFAULT_DESCRIPTION,
  source,
}: PostSubscribeCTAProps) {
  const resolvedSource = source ?? `post-${postSlug}`;

  return (
    <section
      className={cn(
        'not-prose my-12 rounded-xl border border-border bg-card/50 p-8',
        className,
      )}
    >
      <h2 className="font-display font-bold text-2xl mb-2">{headline}</h2>
      <p className="text-muted-foreground mb-6 max-w-xl">{description}</p>
      <SubscribeForm
        source={resolvedSource}
        buttonText="Subscribe"
        successMessage="You're in! Check your inbox."
        className="max-w-md"
      />
    </section>
  );
}

export default PostSubscribeCTA;
