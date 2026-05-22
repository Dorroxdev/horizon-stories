import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PillarBadge } from './PillarBadge';
import type { Post } from '@/lib/posts';
import type { PillarSlug } from '@/data/pillars';

export interface PostCardProps {
  post: Post;
  index?: number;
}

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

export function PostCard({ post, index }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      variants={fadeUp}
      custom={index ?? 0}
      initial="hidden"
      animate="visible"
      className="border-b border-border pb-10 mb-10 last:border-b-0 last:pb-0 last:mb-0"
    >
      <div className="flex gap-3 items-center mb-3">
        <PillarBadge pillar={post.pillar as PillarSlug} size="sm" />
        <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
          {formattedDate}
        </time>
        <span aria-hidden="true" className="text-muted-foreground">
          ·
        </span>
        <span className="text-sm text-muted-foreground">{post.readingTime} min read</span>
      </div>
      <h3 className="font-display font-bold text-2xl lg:text-3xl leading-tight">
        <Link to={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h3>
      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mt-3 max-w-3xl">
        {post.excerpt}
      </p>
      <Link
        to={`/posts/${post.slug}`}
        className="text-primary hover:underline text-sm mt-4 inline-flex items-center gap-1"
      >
        Read more
        <ArrowRight aria-hidden="true" className="w-4 h-4" />
      </Link>
    </motion.article>
  );
}

export default PostCard;
