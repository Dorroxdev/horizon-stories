import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  BookOpen,
  Target,
  ListChecks,
  LayoutGrid,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  resources,
  categoryLabels,
  type ResourceCategory,
} from '@/data/resources';
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

const categoryIcons: Record<ResourceCategory, typeof FileText> = {
  toolkit: Target,
  guide: BookOpen,
  playbook: LayoutGrid,
  template: FileText,
  checklist: ListChecks,
};

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative hero-mesh overflow-hidden py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
              Free Resources
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight mb-6"
            >
              Frameworks, toolkits, and guides for{' '}
              <span className="text-gradient">people who build</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Actionable resources from founders, operators, and domain experts.
              Subscribe to get instant access. No fluff, no paywalls.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => {
              const Icon = categoryIcons[resource.category];
              return (
                <motion.div
                  key={resource.slug}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-xl border border-border bg-card/50 p-6 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon
                      className="w-5 h-5 text-primary"
                      strokeWidth={1.5}
                    />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {categoryLabels[resource.category]}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 flex-1">
                    {resource.description}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mb-4">
                    {resource.tagline}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                  >
                    <Link to={`/resources/${resource.slug}`}>
                      Get Free Access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Coming Soon indicator when library is small */}
          {resources.length < 3 && (
            <motion.div
              variants={fadeUp}
              custom={resources.length + 1}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground text-sm">
                More resources coming soon. Subscribe to get notified when new
                guides drop.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-20 hero-mesh">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
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
              Get new resources delivered to your inbox
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground mb-8"
            >
              Subscribe to Horizon Launchpad for weekly insights, expert
              frameworks, and early access to new resources.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <SubscribeForm className="max-w-md mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
