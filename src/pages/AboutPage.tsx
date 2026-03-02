import { Youtube, Music, Linkedin, Twitter, Instagram, Mail, Mic, Users, Globe, DollarSign } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { Button } from '@/components/ui/button';

function Metric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-6 text-center">
      <p className="text-3xl font-display font-bold">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-purple-600/20 flex items-center justify-center text-3xl font-bold text-foreground/70 mx-auto mb-6">AD</div>
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-3">Altan Doyran</h1>
          <p className="text-lg text-muted-foreground">Founder, AI Practitioner, Interviewer</p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl py-20">
        <h2 className="font-display font-bold text-2xl mb-6">Why Horizon Launchpad Exists</h2>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>I started Horizon Launchpad because I was tired of founder content that was either paywalled, surface-level, or focused on the wrong things. The best founder stories — the ones with real numbers, real failures, and real lessons — were scattered across podcasts, newsletters, and Twitter threads that nobody could find.</p>
          <p>The startup media landscape has a transparency problem. Most founder interviews are glorified press releases. Revenue numbers are "undisclosed." Failures are reframed as "pivots." The real story — the messy, uncomfortable, honest story — gets buried.</p>
          <p>Horizon Launchpad exists to fix that. We publish in-depth founder stories with real revenue numbers, real failure post-mortems with real money lost, and expert playbooks with real frameworks — not theoretical advice from people who've never built anything.</p>
          <p>I'm not a journalist — I'm a practitioner. I build with AI every day. I've started companies, failed at companies, and invested in companies. When I interview founders, I ask the questions that operators actually care about. Not "what's your vision?" but "what was your CAC in month 6?"</p>
          <p>The vision is simple: make real founder knowledge free and accessible to anyone building something. Whether you're a first-time founder in Lagos or a serial entrepreneur in San Francisco, you deserve access to the same lessons and frameworks that the best operators use.</p>
        </div>
      </section>

      {/* Metrics */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <h2 className="font-display font-bold text-2xl mb-8">By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric value={150} suffix="+" label="Episodes Recorded" />
          <Metric value={120} suffix="+" label="Guests Interviewed" />
          <Metric value={45} suffix="+" label="Countries Reached" />
          <Metric value={2} suffix="B+" label="Combined Guest Revenue" />
        </div>
      </section>

      {/* Social */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <h2 className="font-display font-bold text-2xl mb-8">Connect</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Youtube, label: 'YouTube' },
            { icon: Music, label: 'Spotify' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Twitter, label: 'Twitter/X' },
            { icon: Instagram, label: 'Instagram' },
          ].map(s => (
            <a key={s.label} href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors text-sm">
              <s.icon className="w-4 h-4" /> {s.label}
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 lg:px-8 pb-20 text-center">
        <h2 className="font-display font-bold text-2xl mb-3">Want to be a guest?</h2>
        <p className="text-muted-foreground mb-6">Have a story to tell? We'd love to hear from you.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <a href="/submit"><Mail className="w-4 h-4 mr-2" /> Get in Touch</a>
        </Button>
      </section>
    </div>
  );
}
