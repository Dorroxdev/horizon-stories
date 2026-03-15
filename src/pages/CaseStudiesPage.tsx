import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Database, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { caseStudies, caseStudyStats } from '@/data/caseStudyData';
import { motion } from 'framer-motion';

const industries = ['All', 'Healthcare SaaS', 'Fintech', 'Developer Tools', 'E-commerce', 'AI & Automation'];
const revenueRanges = ['All Revenue', '$0-$100K', '$100K-$1M', '$1M-$10M', '$10M+'];
const fundingTypes = ['All Funding', 'Bootstrapped', 'Seed', 'Series A+'];
const stages = ['All Stages', 'Pre-revenue', 'Early', 'Growth', 'Scaled', 'Failed'];
const sortOptions = ['Latest', 'Most Read', 'Revenue (High to Low)', 'Alphabetical'];

export default function CaseStudiesPage() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All');
  const [revenueRange, setRevenueRange] = useState('All Revenue');
  const [fundingType, setFundingType] = useState('All Funding');
  const [stage, setStage] = useState('All Stages');
  const [sort, setSort] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  let filtered = caseStudies.filter((cs) => {
    const matchSearch = !search || cs.title.toLowerCase().includes(search.toLowerCase()) ||
    cs.founderName.toLowerCase().includes(search.toLowerCase()) ||
    cs.company.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === 'All' || cs.industry === industry;
    const matchFunding = fundingType === 'All Funding' || cs.fundingType === fundingType;
    const matchStage = stage === 'All Stages' || cs.stage === stage;
    const matchRevenue = revenueRange === 'All Revenue' || (() => {
      const r = cs.revenueNumeric;
      if (revenueRange === '$0-$100K') return r <= 100000;
      if (revenueRange === '$100K-$1M') return r > 100000 && r <= 1000000;
      if (revenueRange === '$1M-$10M') return r > 1000000 && r <= 10000000;
      if (revenueRange === '$10M+') return r > 10000000;
      return true;
    })();
    return matchSearch && matchIndustry && matchFunding && matchStage && matchRevenue;
  });

  if (sort === 'Revenue (High to Low)') filtered = [...filtered].sort((a, b) => b.revenueNumeric - a.revenueNumeric);
  if (sort === 'Alphabetical') filtered = [...filtered].sort((a, b) => a.company.localeCompare(b.company));

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const featured = caseStudies[0];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Founder Case Studies</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-2">In-depth written breakdowns of real businesses revenue, costs, mistakes, and the playbook.

          </p>
          <p className="text-sm font-semibold text-primary">{caseStudyStats.totalCaseStudies} Case Studies</p>
        </motion.div>

        {/* Filter Bar */}
        <div className="sticky top-16 z-30 glass-strong rounded-xl p-4 mb-8 space-y-3">
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search founder, company, or keyword..." value={search} onChange={(e) => {setSearch(e.target.value);setCurrentPage(1);}} className="pl-10 bg-background/50 border-border" />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg bg-background/50 border border-border text-sm text-foreground">
              {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2 flex-wrap">
            {industries.map((i) =>
            <button key={i} onClick={() => {setIndustry(i);setCurrentPage(1);}}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${industry === i ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}>
                {i}
              </button>
            )}
            <span className="text-border">|</span>
            {revenueRanges.map((r) =>
            <button key={r} onClick={() => {setRevenueRange(r);setCurrentPage(1);}}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${revenueRange === r ? 'bg-accent text-accent-foreground border-accent' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}>
                {r}
              </button>
            )}
            <span className="text-border">|</span>
            {fundingTypes.map((f) =>
            <button key={f} onClick={() => {setFundingType(f);setCurrentPage(1);}}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${fundingType === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}>
                {f}
              </button>
            )}
            <span className="text-border">|</span>
            {stages.map((s) =>
            <button key={s} onClick={() => {setStage(s);setCurrentPage(1);}}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${stage === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}>
                {s}
              </button>
            )}
          </div>
        </div>

        {/* Featured Case Study Banner */}
        {currentPage === 1 && !search &&
        <Link to={`/case-studies/${featured.slug}`} className="block mb-10 group">
            <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-6 md:p-8 hover:border-primary/40 transition-all">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center text-2xl font-bold text-foreground/70 shrink-0">
                  {featured.founderName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary">Featured</span>
                    <span className="text-xs font-bold text-accent">{featured.revenue}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{featured.founderName} · {featured.company}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readingTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
              </div>
            </div>
          </Link>
        }

        <div className="flex gap-8">
          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ?
            <p className="text-center text-muted-foreground py-20">No case studies match your filters.</p> :

            <div className="space-y-6">
                {paginated.map((cs, i) =>
              <motion.div key={cs.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/case-studies/${cs.slug}`} className="group block rounded-xl border border-border bg-card hover:border-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
                      <div className="flex flex-col sm:flex-row gap-4 p-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center text-lg font-bold text-foreground/60 shrink-0">
                          {cs.founderName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{cs.company}</span>
                            <span className="text-muted-foreground text-xs">·</span>
                            <span className="text-xs text-muted-foreground">{cs.founderName}</span>
                          </div>
                          <h3 className="font-display font-semibold text-sm md:text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {cs.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{cs.excerpt}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            {cs.revenue !== 'N/A' &&
                        <span className="text-xs font-bold text-accent">{cs.revenue}</span>
                        }
                            {cs.metricPills.slice(1, 4).map((m) =>
                        <span key={m.label} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{m.label}: {m.value}</span>
                        )}
                            <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                              <Clock className="w-3 h-3" />{cs.readingTime}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {cs.tags.slice(0, 4).map((tag) =>
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                        )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
              )}
              </div>
            }

            {/* Pagination */}
            {totalPages > 1 &&
            <div className="flex items-center justify-center gap-2 mt-10">
                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</Button>
                {Array.from({ length: totalPages }, (_, i) =>
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                    {i + 1}
                  </button>
              )}
                <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</Button>
              </div>
            }
            <p className="text-center text-xs text-muted-foreground mt-3">Page {currentPage} of {totalPages}</p>
          </div>

          {/* Revenue Database Sidebar (desktop only) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 rounded-xl border border-border bg-card p-5 space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-sm">Revenue Database</h3>
              </div>
              <p className="text-xs text-muted-foreground">Aggregated insights from {caseStudyStats.totalCaseStudies} founder case studies.</p>
              <div className="space-y-4">
                {[
                { icon: TrendingUp, label: 'Average Revenue', value: caseStudyStats.averageRevenue },
                { icon: Clock, label: 'Median Time to $1M', value: caseStudyStats.medianTimeTo1M },
                { icon: Users, label: 'Bootstrapped vs Funded', value: caseStudyStats.bootstrappedVsFunded },
                { icon: BarChart3, label: 'Top Industry', value: caseStudyStats.topIndustry }].
                map((s) =>
                <div key={s.label} className="flex items-start gap-3">
                    <s.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-semibold text-foreground">{s.value}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Most Common Path</p>
                <p className="text-sm font-medium text-foreground">{caseStudyStats.mostCommonFirstRevenue}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>);

}