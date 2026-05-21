import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/lib/posts';
import { pillars, type PillarSlug } from '@/data/pillars';
import { PillarBadge } from '@/components/posts/PillarBadge';
import { AuthorBio } from '@/components/posts/AuthorBio';
import { ReadingTime } from '@/components/posts/ReadingTime';
import { ShareButtons } from '@/components/posts/ShareButtons';
import { Callout } from '@/components/posts/Callout';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const mdxComponents = { Callout };

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post || post.draft) {
    return (
      <div className="bg-background min-h-screen">
        <section className="container mx-auto px-4 lg:px-8 pt-32 pb-32 max-w-3xl text-center">
          <h1 className="font-display font-bold text-4xl mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find that post. It may have been moved or unpublished.
          </p>
          <Link to="/posts" className="text-primary hover:underline">
            Back to all posts
          </Link>
        </section>
      </div>
    );
  }

  const pillarMeta = pillars[post.pillar as PillarSlug];
  const pillarLabel = pillarMeta?.label ?? 'all posts';
  const backHref = pillarMeta ? `/posts?pillar=${post.pillar}` : '/posts';
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const Body = post.body;
  const absoluteUrl = `https://horizonlaunchpad.com/posts/${post.slug}`;

  return (
    <div className="bg-background min-h-screen">
      <section className="container mx-auto px-4 lg:px-8 pt-32 pb-12 max-w-3xl">
        <motion.div initial="hidden" animate="visible">
          <Link
            to={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft
              aria-hidden="true"
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            />
            Back to {pillarLabel}
          </Link>
          <PillarBadge pillar={post.pillar as PillarSlug} size="md" className="mb-6" />
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="font-display font-bold text-4xl lg:text-5xl leading-[1.1] tracking-tight"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center mt-8">
            <AuthorBio
              variant="compact"
              authorName={post.authorName}
              authorBio={post.authorBio}
            />
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <ReadingTime minutes={post.readingTime} />
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
              {formattedDate}
            </time>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <article className="prose prose-invert prose-lg max-w-none">
          <MDXProvider components={mdxComponents}>
            <Body />
          </MDXProvider>
        </article>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pt-12 pb-32 max-w-3xl">
        <ShareButtons title={post.title} url={absoluteUrl} className="mt-8" />
        <AuthorBio
          variant="full"
          authorName={post.authorName}
          authorBio={post.authorBio}
        />
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to="/posts"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" /> Back to all posts
          </Link>
        </div>
      </section>
    </div>
  );
}
