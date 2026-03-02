import { useState } from 'react';
import { Mail, Zap, Search as SearchIcon, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { newsletterEditions } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

const features = [
  { icon: Zap, title: 'The Signal', desc: 'Data-driven trigger — the number or trend that matters this week' },
  { icon: SearchIcon, title: 'The Deep Dive', desc: 'Core analysis — breaking down a founder story or market shift' },
  { icon: Target, title: 'The Framework', desc: 'Actionable methodology you can apply to your business today' },
  { icon: ArrowRight, title: 'The Edge', desc: 'This-week action item — one thing to do before Friday' },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { toast({ title: 'Enter a valid email', variant: 'destructive' }); return; }
    toast({ title: 'You\'re subscribed!' });
    setEmail('');
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">The Horizon Launchpad Newsletter</h1>
          <p className="text-muted-foreground text-lg mb-8">Weekly deep-dives into founder stories, failure lessons, and expert frameworks. Real numbers, real insights.</p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto mb-4">
            <Input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-card/50 border-border text-base" />
            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">Subscribe</Button>
          </form>
          <p className="text-sm text-muted-foreground">Join 2,500+ founders · No spam</p>
        </div>
      </section>

      {/* What You Get */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">What you'll get every week</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
              <f.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Archive */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <h2 className="font-display font-bold text-2xl mb-8">Past Editions</h2>
        <div className="space-y-3">
          {newsletterEditions.map(ed => (
            <div key={ed.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">{ed.title}</h3>
                  <p className="text-sm text-muted-foreground">{ed.preview}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{ed.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
