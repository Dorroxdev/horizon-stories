import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket,
  BookOpen,
  Brain,
  AlertTriangle,
  ArrowRight,
  Mail,
  FileText,
  Zap,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resources } from '@/data/resources';
import SubscribeForm from '@/components/shared/SubscribeForm';
import { getRecentPosts } from '@/lib/posts';
import { PillarBadge } from '@/components/posts/PillarBadge';
import { PostSubscribeCTA } from '@/components/posts/PostSubscribeCTA';
import type { PillarSlug } from '@/data/pillars';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const contentPillars = [
  {
    icon: Rocket,
    title: 'Founder Stories',
    desc: 'In-depth interviews with real revenue numbers. How they started, scaled, failed, and pivoted.',
    gradient: 'from-primary/20 to-nessie/10',
  },
  {
    icon: BookOpen,
    title: 'Expert Playbooks',
    desc: 'PMs, growth leaders, and operators sharing domain-specific frameworks you can steal.',
    gradient: 'from-nessie/15 to-primary/10',
  },
  {
    icon: Brain,
    title: 'AI Strategy',
    desc: 'Applied AI from a practitioner who actually builds. Not just commentary.',
    gradient: 'from-info/15 to-primary/10',
  },
  {
    icon: AlertTriangle,
    title: 'Failure Post-Mortems',
    desc: 'Honest breakdowns of what went wrong, with real numbers. The stories nobody tells.',
    gradient: 'from-destructive/15 to-warning/10',
  },
  {
    icon: Compass,
    title: 'Guides & Frameworks',
    desc: 'Step-by-step playbooks, checklists, and toolkits you can apply to your business today.',
    gradient: 'from-nessie/20 to-info/10',
  },
];

const featured = resources[0];

function RecentPostsSection() {
  const recent = getRecentPosts(3);
  if (recent.length === 0) return null;

  return (
    <section className="container mx-auto px-4 lg:px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display font-bold text-3xl lg:text-4xl"
            >
              Latest posts
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mt-2 max-w-xl"
            >
              Stories, playbooks, and frameworks for builders.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Button asChild variant="outline">
              <Link to="/posts">
                See all posts
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recent.map((post, i) => (
            <motion.article
              key={post.slug}
              variants={fadeUp}
              custom={i + 3}
              className="flex flex-col p-6 rounded-xl border border-border bg-card/50 hover:border-primary/40 transition-colors"
            >
              <PillarBadge pillar={post.pillar as PillarSlug} size="sm" className="mb-4" />
              <h3 className="font-display font-semibold text-xl leading-tight mb-3">
                <Link
                  to={`/posts/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <Link
                to={`/posts/${post.slug}`}
                className="text-primary text-sm hover:underline mt-auto inline-flex items-center gap-1"
              >
                Read post
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="border-t border-border pt-8 mt-12">
          <PostSubscribeCTA
            postSlug="home-recent-posts"
            source="home-recent-posts"
            headline="Get every new post"
            description="Free, weekly. The newsletter goes out alongside each post."
            className="bg-transparent border-none p-0 my-0"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default function HorizonHome() {
  const scrollToNewsletter = () => {
    const el = document.getElementById('newsletter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background">
      {/* Hero — Future Pacing + Authority */}
      <section className="relative min-h-[85vh] flex items-center hero-mesh overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              Real Stories. Real Numbers. No Fluff.
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6"
            >
              Learn from the people who actually{' '}
              <span className="text-gradient">built it</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
            >
              In-depth interviews, failure post-mortems, expert playbooks,
              and AI strategy with real revenue numbers. Free resources and
              weekly insights from founders, operators, and leaders who lived it.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/resources">
                  <FileText className="w-4 h-4 mr-2" />
                  Explore Free Resources
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToNewsletter}
                className="border-border hover:bg-muted/50 hover:text-foreground"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe Free
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Strip — Text-based, no logos */}
      <section className="border-y border-border bg-card/30 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center"
          >
            {[
              { value: '2,500+', label: 'Founders, Operators & Leaders' },
              { value: 'Weekly', label: 'Deep-Dive Insights' },
              { value: 'Free', label: 'Resources & Toolkits' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <p className="text-xl md:text-2xl font-display font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem / Why This Exists — Belief Matching */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-display font-bold text-2xl md:text-3xl mb-4"
          >
            Most business advice comes from people who haven't done it.{' '}
            <span className="text-gradient">
              We talk to the ones who have.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-lg text-muted-foreground"
          >
            No generic frameworks. No recycled LinkedIn takes. Horizon Launchpad
            brings you unfiltered stories from founders, product leaders, and
            operators with real revenue numbers, real failures, and the real
            playbooks that worked.
          </motion.p>
        </motion.div>
      </section>

      {/* What You'll Get — Content Pillars as Reciprocity */}
      <section className="border-y border-border bg-card/30 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display font-bold text-2xl md:text-3xl mb-4"
            >
              What You'll Get
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-10 max-w-2xl"
            >
              Multi-format content across video interviews, podcasts, written
              case studies, and actionable guides. All free.
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  custom={i + 2}
                  className={`group rounded-xl border border-border bg-gradient-to-br ${pillar.gradient} p-6 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300`}
                >
                  <pillar.icon
                    className="w-8 h-8 text-foreground/70 mb-4 group-hover:text-primary transition-colors"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display font-semibold text-base mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resource — Value Gap Spotlight */}
      {featured && (
        <section className="container mx-auto px-4 lg:px-8 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-block px-3 py-1 rounded-full bg-nessie/20 text-nessie text-xs font-semibold uppercase tracking-wider mb-4"
              >
                Featured Resource / Free
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-display font-bold text-2xl md:text-3xl mb-4"
              >
                {featured.headline}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground mb-6"
              >
                {featured.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} custom={3}>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to={`/resources/${featured.slug}`}>
                    Get Free Access
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={fadeUp}
              custom={4}
              className="bg-gradient-to-br from-card to-muted rounded-xl border border-border p-6"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                What's Inside
              </p>
              <ul className="space-y-3">
                {featured.whatsInside.slice(0, 5).map((item, i) => (
                  <motion.li
                    key={item.title}
                    variants={fadeUp}
                    custom={i + 5}
                    className="flex items-start gap-3"
                  >
                    <Zap className="w-4 h-4 text-nessie shrink-0 mt-1" />
                    <span className="text-sm text-foreground/90">
                      {item.title}
                    </span>
                  </motion.li>
                ))}
                {featured.whatsInside.length > 5 && (
                  <motion.li
                    variants={fadeUp}
                    custom={10}
                    className="text-sm text-primary font-medium"
                  >
                    + {featured.whatsInside.length - 5} more inside
                  </motion.li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        </section>
      )}

      <RecentPostsSection />

      {/* Newsletter — Reciprocity + Commitment */}
      <section id="newsletter" className="relative py-24 hero-mesh">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display font-bold text-3xl md:text-4xl mb-4"
            >
              Insights from real builders, delivered weekly
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8"
            >
              Founder stories, expert playbooks, AI strategy, and actionable
              frameworks from people who actually built it. Free, always.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <SubscribeForm className="max-w-md mx-auto" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-xs text-muted-foreground mt-4"
            >
              Join 2,500+ founders, operators, and leaders. No spam. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
