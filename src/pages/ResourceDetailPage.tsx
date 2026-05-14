import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  User2,
  Code,
  Briefcase,
  Repeat2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getResourceBySlug, categoryLabels } from '@/data/resources';
import SubscribeForm from '@/components/shared/SubscribeForm';

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

const audienceIcons = [User2, Code, Briefcase, Repeat2];

export default function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const resource = slug ? getResourceBySlug(slug) : undefined;

  if (!resource) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">
            Resource not found
          </h1>
          <p className="text-muted-foreground mb-6">
            This resource doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/resources">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center hero-mesh overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block px-4 py-1.5 rounded-full bg-nessie/20 text-nessie text-sm font-semibold uppercase tracking-wider mb-6"
            >
              Free {categoryLabels[resource.category]}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight mb-6"
            >
              {resource.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {resource.subheadline}
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Button
                size="lg"
                onClick={() => {
                  const el = document.getElementById('get-access');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Free Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y border-border bg-card/30 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <AlertTriangle
                className="w-12 h-12 text-destructive mx-auto"
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display font-bold text-2xl md:text-3xl mb-4"
            >
              <span className="text-primary">{resource.problem.stat}</span>{' '}
              {resource.problem.text}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-muted-foreground"
            >
              {resource.problem.detail}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-display font-bold text-2xl md:text-3xl mb-4 text-center"
          >
            What's Inside
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-muted-foreground mb-10 max-w-2xl mx-auto text-center"
          >
            {resource.whatsInside.length} templates designed to give structure to
            the messiest part of building: validating the idea before you
            commit.
          </motion.p>
          <div className="max-w-2xl mx-auto space-y-4">
            {resource.whatsInside.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 2}
                className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-nessie shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Who This Is For */}
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
              className="font-display font-bold text-2xl md:text-3xl mb-10 text-center"
            >
              Who This Is For
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {resource.whoIsFor.map((segment, i) => {
                const Icon = audienceIcons[i % audienceIcons.length];
                return (
                  <motion.div
                    key={segment.title}
                    variants={fadeUp}
                    custom={i + 1}
                    className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-nessie/5 p-6 text-center"
                  >
                    <Icon
                      className="w-8 h-8 text-primary mx-auto mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-display font-semibold text-base mb-2">
                      {segment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {segment.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-muted-foreground italic"
          >
            "{resource.socialProof}"
          </motion.p>
        </motion.div>
      </section>

      {/* Get Access — Gated via Beehiiv */}
      <section id="get-access" className="relative py-24 hero-mesh">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display font-bold text-2xl md:text-3xl mb-4"
            >
              Get Free Access
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8"
            >
              Subscribe to Horizon Launchpad to unlock this resource, plus
              weekly founder stories and frameworks delivered to your inbox.
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="mb-6">
              <SubscribeForm
                className="max-w-md mx-auto"
                buttonText="Get Free Access"
                onSuccess={() => navigate(`/resources/${resource.slug}/thank-you`)}
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-xs text-muted-foreground mt-6"
            >
              No spam. Unsubscribe anytime. By subscribing, you also receive the
              Horizon Launchpad newsletter.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Back Link */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Link
            to="/resources"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all resources
          </Link>
        </div>
      </footer>
    </div>
  );
}
