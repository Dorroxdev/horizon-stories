import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Share2, Copy, Linkedin, Twitter, Mail, Lightbulb, AlertTriangle, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { caseStudies } from '@/data/caseStudyData';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

function StructuredData({ cs }: { cs: typeof caseStudies[0] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    author: { '@type': 'Person', name: cs.founderName, jobTitle: cs.founderTitle, url: cs.founderLinkedin },
    datePublished: cs.date,
    description: cs.excerpt,
    publisher: { '@type': 'Organization', name: 'Horizon Launchpad' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `/case-studies/${cs.slug}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const cs = caseStudies.find(c => c.slug === slug);
  const [activeSection, setActiveSection] = useState('');
  const [tocOpen, setTocOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!cs) return;
    document.title = `${cs.founderName} — ${cs.title} | Horizon Launchpad`;
  }, [cs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-80px 0px -60% 0px' }
    );
    const headings = document.querySelectorAll('article h2[id]');
    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [cs]);

  if (!cs) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Case study not found</h1>
        <Button asChild variant="outline"><Link to="/case-studies">← Back to Case Studies</Link></Button>
      </div>
    </div>
  );

  const related = caseStudies.filter(c => cs.relatedSlugs.includes(c.slug));
  const copyLink = () => { navigator.clipboard.writeText(window.location.href); toast({ title: 'Link copied!' }); };
  const toId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="min-h-screen">
      <StructuredData cs={cs} />

      {/* Header */}
      <header className="pt-24 pb-12 hero-mesh">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1 flex-wrap">
            <Link to="/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{cs.industry}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{cs.company}</span>
          </nav>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6 max-w-4xl">
            {cs.headline}
          </motion.h1>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center text-sm font-bold text-foreground/70">
              {cs.founderName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-medium text-sm">{cs.founderName}</p>
              <p className="text-xs text-muted-foreground">{cs.founderTitle}, {cs.company}</p>
            </div>
            {cs.founderLinkedin && (
              <a href={cs.founderLinkedin} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 flex-wrap">
            <span>{cs.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cs.readingTime}</span>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={copyLink} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors" aria-label="Copy link"><Copy className="w-3.5 h-3.5" /></button>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(cs.title)}`} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors" aria-label="Share on Twitter"><Twitter className="w-3.5 h-3.5" /></a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors" aria-label="Share on LinkedIn"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href={`mailto:?subject=${encodeURIComponent(cs.title)}&body=${encodeURIComponent(window.location.href)}`} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors" aria-label="Share via email"><Mail className="w-3.5 h-3.5" /></a>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="flex flex-wrap gap-3">
            {cs.metricPills.map(m => (
              <div key={m.label} className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                <p className="text-sm font-bold text-accent">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {cs.tags.map(tag => (
              <Link to={`/topics`} key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">{tag}</Link>
            ))}
          </div>
        </div>
      </header>

      {/* TLDR */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto lg:ml-[calc(220px+2rem)] rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">TLDR</p>
          <p className="text-sm text-foreground leading-relaxed">{cs.excerpt}</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="flex gap-8 relative">
          {/* Sticky TOC - Desktop */}
          <aside className="hidden lg:block w-[220px] shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
              {cs.tableOfContents.map(item => {
                const id = toId(item);
                return (
                  <a key={item} href={`#${id}`}
                    className={`block text-xs py-1.5 px-2 rounded transition-colors ${activeSection === id ? 'text-primary bg-primary/10 font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                    {item}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Mobile TOC */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
            <button onClick={() => setTocOpen(!tocOpen)}
              className="w-full glass-strong rounded-xl p-3 flex items-center justify-between text-sm font-medium">
              <span>Contents</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
            </button>
            {tocOpen && (
              <div className="glass-strong rounded-xl mt-1 p-3 max-h-60 overflow-y-auto">
                {cs.tableOfContents.map(item => (
                  <a key={item} href={`#${toId(item)}`} onClick={() => setTocOpen(false)}
                    className="block text-xs py-1.5 text-muted-foreground hover:text-foreground">{item}</a>
                ))}
              </div>
            )}
          </div>

          {/* Article body */}
          <article className="flex-1 max-w-3xl">
            {cs.content.map((section, i) => {
              const id = section.type === 'heading' ? toId(section.content) : undefined;
              switch (section.type) {
                case 'heading':
                  return <h2 key={i} id={id} className="text-2xl font-display font-bold mt-12 mb-4 scroll-mt-24">{section.content}</h2>;
                case 'subheading':
                  return <h3 key={i} className="text-lg font-display font-semibold mt-8 mb-3">{section.content}</h3>;
                case 'text':
                  return <p key={i} className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                case 'pullquote':
                  return (
                    <blockquote key={i} className="border-l-4 border-primary pl-5 py-2 my-8">
                      <p className="text-lg md:text-xl italic text-foreground/80 leading-relaxed">{section.content}</p>
                    </blockquote>
                  );
                case 'metric-callout':
                  return (
                    <div key={i} className="rounded-xl bg-accent/10 border border-accent/20 p-5 my-8">
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {section.content.split(' | ').map((m, j) => {
                          const [label, value] = m.split(': ');
                          return (
                            <div key={j}>
                              <span className="text-xs text-muted-foreground">{label}: </span>
                              <span className="text-sm font-bold text-accent">{value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                case 'tip':
                  return (
                    <div key={i} className="rounded-xl border border-success/20 bg-success/5 p-5 my-6 flex gap-3">
                      <Lightbulb className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/90 leading-relaxed">{section.content}</p>
                    </div>
                  );
                case 'warning':
                  return (
                    <div key={i} className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 my-6 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/90 leading-relaxed">{section.content}</p>
                    </div>
                  );
                case 'table':
                  return (
                    <div key={i} className="my-8 rounded-xl border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            {section.columns?.map(col => (
                              <th key={col} className="text-left px-4 py-3 font-semibold text-foreground text-xs">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.data?.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 1 ? 'bg-muted/20' : ''}>
                              {section.columns?.map(col => (
                                <td key={col} className="px-4 py-2.5 text-foreground/80 text-xs">{row[col]}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                default:
                  return null;
              }
            })}

            {/* Timeline */}
            {cs.timeline.length > 0 && (
              <section className="my-12">
                <h2 className="text-2xl font-display font-bold mb-6">Company Timeline</h2>
                <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
                  {cs.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[calc(1.5rem+5px)] w-3 h-3 rounded-full bg-primary border-2 border-background" />
                      <p className="text-xs font-semibold text-primary">{t.date}</p>
                      <p className="text-sm text-foreground/80">{t.event}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            {cs.techStack.length > 0 && (
              <section className="my-12">
                <h2 className="text-2xl font-display font-bold mb-6">Tech Stack & Tools</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cs.techStack.map(t => (
                    <div key={t.name} className="rounded-lg border border-border bg-card p-3 text-center">
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.category}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Takeaways */}
            <section className="my-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
              <h2 className="font-display font-bold text-xl mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                {cs.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/90">
                    <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Founder Bio */}
            <section className="my-12 rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-muted flex items-center justify-center text-lg font-bold text-foreground/70 shrink-0">
                  {cs.founderName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{cs.founderName}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{cs.founderTitle}, {cs.company}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{cs.founderBio}</p>
                  <div className="flex gap-3">
                    {cs.founderLinkedin && <a href={cs.founderLinkedin} className="text-xs text-primary hover:underline flex items-center gap-1"><Linkedin className="w-3 h-3" />LinkedIn</a>}
                    {cs.founderTwitter && <a href={cs.founderTwitter} className="text-xs text-primary hover:underline flex items-center gap-1"><Twitter className="w-3 h-3" />Twitter/X</a>}
                    {cs.founderWebsite && <a href={cs.founderWebsite} className="text-xs text-primary hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" />Website</a>}
                  </div>
                </div>
              </div>
            </section>

            {/* Related Case Studies */}
            {related.length > 0 && (
              <section className="my-12">
                <h2 className="font-display font-bold text-xl mb-6">Similar Founder Stories</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map(r => (
                    <Link to={`/case-studies/${r.slug}`} key={r.id} className="group rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all">
                      <span className="text-xs font-bold text-accent">{r.revenue}</span>
                      <h3 className="font-semibold text-sm mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.founderName} · {r.readingTime}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter CTA */}
            <section className="my-12 rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-display font-bold text-lg mb-2">Get case studies like this in your inbox every week.</h3>
              <p className="text-sm text-muted-foreground mb-4">Join 2,500+ founders and operators.</p>
              <form onSubmit={e => { e.preventDefault(); toast({ title: "You're subscribed!" }); setEmail(''); }} className="flex gap-2 max-w-sm mx-auto">
                <Input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-background/50 border-border" required />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">Subscribe</Button>
              </form>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
