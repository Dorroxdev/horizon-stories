import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download,
  CheckCircle2,
  ArrowLeft,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getResourceBySlug } from '@/data/resources';

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

export default function ResourceThankYouPage() {
  const { slug } = useParams<{ slug: string }>();
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
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[80vh] flex items-center hero-mesh overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <CheckCircle2
                className="w-16 h-16 text-nessie mx-auto"
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-display font-bold leading-[1.1] tracking-tight mb-4"
            >
              You're in!
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-muted-foreground mb-10"
            >
              Thanks for subscribing to Horizon Launchpad. Your resource is
              ready to download.
            </motion.p>

            {resource.downloadUrl && (
              <motion.div variants={fadeUp} custom={3} className="mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href={resource.downloadUrl}>
                    <Download className="w-5 h-5 mr-2" />
                    Download {resource.title}
                  </a>
                </Button>
              </motion.div>
            )}

            <motion.div
              variants={fadeUp}
              custom={4}
              className="rounded-xl border border-border bg-card/50 p-6 max-w-md mx-auto mb-8"
            >
              <Rocket
                className="w-8 h-8 text-primary mx-auto mb-3"
                strokeWidth={1.5}
              />
              <p className="text-sm text-muted-foreground">
                Check your inbox for a welcome email. Every week, you'll get
                founder stories, expert frameworks, and new resources —
                delivered straight to your inbox.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <Link
                to="/resources"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Explore more resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
