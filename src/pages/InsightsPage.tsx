import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { insightPages, caseStudies } from '@/data/caseStudyData';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

function StructuredData({ page }: { page: typeof insightPages[0] }) {
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.subtitle, publisher: { '@type': 'Organization', name: 'Horizon Launchpad' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
  ];
  return <>{jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}</>;
}

export default function InsightsPage() {
  const { type, slug } = useParams();
  const [email, setEmail] = useState('');
  const page = insightPages.find(p => p.type === type && p.slug === slug);

  if (!page) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <Button asChild variant="outline"><Link to="/case-studies">← Browse Case Studies</Link></Button>
      </div>
    </div>
  );

  const relatedStudies = caseStudies.filter(cs => page.relatedCaseStudySlugs.includes(cs.slug));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <StructuredData page={page} />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
          <Link to="/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Insights</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{page.type === 'startup-costs' ? 'Startup Costs' : 'Success Stories'}</span>
        </nav>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4">{page.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{page.subtitle}</p>
          <p className="text-sm text-primary font-medium mb-10">Based on data from {page.basedOn} real founder case studies</p>
        </motion.div>

        {/* Content Sections */}
        <article>
          {page.sections.map((section, i) => {
            switch (section.type) {
              case 'heading':
                return <h2 key={i} className="text-2xl font-display font-bold mt-12 mb-4">{section.content}</h2>;
              case 'text':
                return <p key={i} className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
              case 'stats-summary':
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
              case 'cost-table':
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
              case 'story-list':
                return (
                  <div key={i} className="space-y-4 my-8">
                    {relatedStudies.map((cs, j) => (
                      <Link to={`/case-studies/${cs.slug}`} key={cs.id} className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{cs.company}</span>
                              <span className="text-xs font-bold text-accent">{cs.revenue}</span>
                            </div>
                            <h3 className="font-display font-semibold text-sm group-hover:text-primary transition-colors mb-1">{cs.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{cs.excerpt}</p>
                            <p className="text-xs text-primary mt-2 flex items-center gap-1">Read full case study <ArrowRight className="w-3 h-3" /></p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Related Case Studies */}
        {page.type !== 'success-stories' && relatedStudies.length > 0 && (
          <section className="my-12">
            <h2 className="font-display font-bold text-xl mb-6">Related Case Studies</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedStudies.map(cs => (
                <Link to={`/case-studies/${cs.slug}`} key={cs.id} className="group rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all">
                  <span className="text-xs font-bold text-accent">{cs.revenue}</span>
                  <h3 className="font-semibold text-sm mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">{cs.title}</h3>
                  <p className="text-xs text-muted-foreground">{cs.founderName} · {cs.readingTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {page.faqs.length > 0 && (
          <section className="my-12">
            <h2 className="font-display font-bold text-xl mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {page.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="my-12 rounded-xl border border-border bg-card p-6 text-center">
          <h3 className="font-display font-bold text-lg mb-2">Get founder insights in your inbox</h3>
          <p className="text-sm text-muted-foreground mb-4">Weekly case studies with real revenue numbers.</p>
          <form onSubmit={e => { e.preventDefault(); toast({ title: "You're subscribed!" }); setEmail(''); }} className="flex gap-2 max-w-sm mx-auto">
            <Input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-background/50 border-border" required />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">Subscribe</Button>
          </form>
        </section>
      </div>
    </div>
  );
}
