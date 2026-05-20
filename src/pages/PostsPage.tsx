import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts, getPostsByPillar } from '@/lib/posts';
import { PostCard } from '@/components/posts/PostCard';
import { PillarFilterChips } from '@/components/posts/PillarFilterChips';

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

export default function PostsPage() {
  const [searchParams] = useSearchParams();
  const activePillar = searchParams.get('pillar');
  const posts = activePillar ? getPostsByPillar(activePillar) : getAllPosts();

  return (
    <div className="bg-background min-h-screen">
      <section className="container mx-auto px-4 lg:px-8 pt-32 pb-12">
        <motion.div initial="hidden" animate="visible">
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="font-display font-bold text-4xl lg:text-5xl leading-tight"
          >
            Posts
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-lg text-muted-foreground mt-4 max-w-2xl"
          >
            Founder stories, playbooks, and frameworks. Written for builders.
          </motion.p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-8">
        <PillarFilterChips />
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-32">
        <div className="max-w-3xl">
          {posts.length === 0 ? (
            <div className="text-muted-foreground py-12">
              <p>No posts in this pillar yet.</p>
              <Link
                to="/posts"
                className="text-primary hover:underline text-sm mt-2 inline-block"
              >
                Show all posts
              </Link>
            </div>
          ) : (
            posts.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)
          )}
        </div>
      </section>
    </div>
  );
}
