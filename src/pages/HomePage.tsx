import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, AlertTriangle, BookOpen, Brain, Map, Play, ArrowRight, Mail, Music, Youtube, Clock, Linkedin, Twitter, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { stories, podcastEpisodes, guests } from '@/data/sampleData';
import StoryCard from '@/components/shared/StoryCard';
import { useCountUp } from '@/hooks/useCountUp';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};

function MetricItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const [email, setEmail] = useState('');
  const featured = stories[0];
  const latestStories = stories.slice(0, 6);
  const recentGuests = guests.slice(0, 5);

  const pillars = [
    { icon: Rocket, title: 'Founder Stories', count: '47 stories', desc: 'How they built it, the real numbers', path: '/stories', gradient: 'from-primary/20 to-nessie/10' },
    { icon: FileText, title: 'Case Studies', count: '127 deep-dives', desc: '2,000+ word written breakdowns with revenue data', path: '/case-studies', gradient: 'from-nessie/15 to-primary/10' },
    { icon: AlertTriangle, title: 'Failure Post-Mortems', count: '12 post-mortems', desc: 'What went wrong and why', path: '/failures', gradient: 'from-destructive/15 to-warning/10' },
    { icon: BookOpen, title: 'Expert Playbooks', count: '23 playbooks', desc: 'Frameworks from operators who\'ve done it', path: '/playbooks', gradient: 'from-success/15 to-primary/10' },
    { icon: Brain, title: 'AI Strategy', count: '18 deep-dives', desc: 'Applied AI from a practitioner', path: '/stories', gradient: 'from-info/15 to-primary/10' },
    { icon: Map, title: 'Guides & Frameworks', count: '15 guides', desc: 'Step-by-step resources', path: '/guides', gradient: 'from-oat-milk/15 to-primary/10' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }
    toast({ title: 'You\'re subscribed!' });
    setEmail('');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center hero-mesh overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.h1 variants={fadeUp} custom={0} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-6">
              Real stories from founders building the{' '}
              <span className="text-gradient">future</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
              In-depth interviews, failure post-mortems, and expert playbooks — with real revenue numbers.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to={`/stories/${featured.slug}`}><Play className="w-4 h-4 mr-1" /> Watch Latest Episode</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted/50 hover:text-foreground">
                <Link to="/stories">Browse Stories</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex items-center gap-4 mt-12 flex-wrap">
            {recentGuests.map((g, i) => (
              <Link to={`/stories/${g.storySlug}`} key={g.id} className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center text-xs font-bold text-foreground/70">
                  {g.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">{g.name}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 aspect-video rounded-xl bg-gradient-to-br from-card to-muted border border-border overflow-hidden relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
              <span className="text-xs font-semibold text-accent">{featured.revenue}</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Featured Episode</span>
            <h2 className="font-display font-bold text-2xl lg:text-3xl mt-2 mb-3">{featured.title}</h2>
            <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium">{featured.guestName}</span>
              <span className="text-accent font-bold text-sm">{featured.revenue}</span>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to={`/stories/${featured.slug}`}>Watch Now <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <div className="mt-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Up Next</p>
              <div className="space-y-3">
                {stories.slice(1, 4).map(s => (
                  <Link to={`/stories/${s.slug}`} key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group/item">
                    <div className="w-16 h-10 rounded bg-muted shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate group-hover/item:text-primary transition-colors">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.guestName} · {s.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-10">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((p, i) => (
            <Link to={p.path} key={p.title} className={`group rounded-xl border border-border bg-gradient-to-br ${p.gradient} p-5 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300`}>
              <p.icon className="w-8 h-8 text-foreground/70 mb-3 group-hover:text-primary transition-colors" strokeWidth={1.5} />
              <h3 className="font-display font-semibold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{p.desc}</p>
              <p className="text-xs font-semibold text-primary">{p.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Stories */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl">Latest Stories</h2>
          <Link to="/stories" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestStories.map(s => <StoryCard key={s.id} story={s} />)}
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-border bg-card/30 py-16">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricItem value={150} suffix="+" label="Founder Stories" />
          <MetricItem value={500} suffix="K+" label="Monthly Listeners" />
          <MetricItem value={2} suffix="B+" label="Combined Revenue" />
          <MetricItem value={45} suffix="+" label="Countries" />
        </div>
      </section>

      {/* Podcast */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">Listen to the Podcast</h2>
        <p className="text-muted-foreground mb-8">New episodes every Tuesday & Thursday</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center shrink-0">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-lg">{podcastEpisodes[0].title}</p>
              <p className="text-sm text-muted-foreground">{podcastEpisodes[0].guestName} · {podcastEpisodes[0].duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center shrink-0 transition-colors">
              <Play className="w-4 h-4 text-primary ml-0.5" />
            </button>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-primary rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {[{ icon: Music, label: 'Spotify' }, { icon: Music, label: 'Apple Podcasts' }, { icon: Youtube, label: 'YouTube' }, { icon: Music, label: 'Amazon Music' }].map(p => (
            <a key={p.label} href="#" className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:border-primary/30 transition-colors text-sm text-muted-foreground hover:text-foreground">
              <p.icon className="w-4 h-4" /> {p.label}
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-24 hero-mesh">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Get the best founder stories in your inbox</h2>
          <p className="text-muted-foreground mb-8">Weekly deep-dives, failure lessons, and frameworks from real operators. Free.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto mb-4">
            <Input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-card/50 border-border" />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground">Join 2,500+ founders and operators · No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Guest Wall */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-10">Featured Guests</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
          {guests.map(g => (
            <Link to={`/stories/${g.storySlug}`} key={g.id} className="shrink-0 w-64 snap-start rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center text-lg font-bold text-foreground/70 mb-3">
                {g.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="font-semibold text-sm">{g.name}</p>
              <p className="text-xs text-muted-foreground mb-3">{g.title}, {g.company}</p>
              <p className="text-xs italic text-muted-foreground">"{g.quote}"</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
