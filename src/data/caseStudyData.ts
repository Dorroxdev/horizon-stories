export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  headline: string;
  founderName: string;
  founderTitle: string;
  founderPhoto?: string;
  founderBio: string;
  founderLinkedin?: string;
  founderTwitter?: string;
  founderWebsite?: string;
  company: string;
  companyDescription: string;
  industry: string;
  revenue: string;
  revenueNumeric: number;
  founded: string;
  teamSize: number;
  funding: string;
  fundingType: 'Bootstrapped' | 'Seed' | 'Series A+';
  location: string;
  stage: 'Pre-revenue' | 'Early' | 'Growth' | 'Scaled' | 'Failed';
  tags: string[];
  readingTime: string;
  date: string;
  excerpt: string;
  metricPills: { label: string; value: string }[];
  tableOfContents: string[];
  content: CaseStudySection[];
  techStack: { name: string; category: string }[];
  timeline: { date: string; event: string }[];
  revenueData?: { month: string; mrr: number }[];
  takeaways: string[];
  relatedSlugs: string[];
}

export interface CaseStudySection {
  type: 'text' | 'heading' | 'subheading' | 'pullquote' | 'metric-callout' | 'tip' | 'warning' | 'table';
  content: string;
  data?: Record<string, string>[];
  columns?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    slug: 'how-sarah-chen-bootstrapped-techco-to-10m-arr',
    title: 'How Sarah Chen Bootstrapped TechCo to $10M ARR Without Raising a Dollar',
    headline: 'How Sarah Chen Bootstrapped TechCo to $10M ARR Without Raising a Dollar',
    founderName: 'Sarah Chen',
    founderTitle: 'Founder & CEO',
    founderBio: 'Sarah Chen is the founder and CEO of TechCo, a healthcare SaaS platform that helps hospitals reduce documentation time by 60%. Before founding TechCo, she spent 8 years as a hospital administrator at three different healthcare systems. She holds an MBA from Wharton and a BS in Biology from Stanford. Sarah has been featured in Forbes, TechCrunch, and Healthcare IT News.',
    founderLinkedin: '#',
    founderTwitter: '#',
    founderWebsite: '#',
    company: 'TechCo',
    companyDescription: 'TechCo is a healthcare SaaS platform that automates clinical documentation, reducing the time nurses and doctors spend on paperwork by up to 60%. The platform is used by over 200 hospitals across the United States.',
    industry: 'Healthcare SaaS',
    revenue: '$10M ARR',
    revenueNumeric: 10000000,
    founded: '2021',
    teamSize: 45,
    funding: '$0 (Bootstrapped)',
    fundingType: 'Bootstrapped',
    location: 'San Francisco, CA',
    stage: 'Scaled',
    tags: ['SaaS', 'Healthcare', 'Bootstrapped'],
    readingTime: '14 min read',
    date: 'Feb 15, 2026',
    excerpt: 'Sarah left a stable hospital administration career to build TechCo — a healthcare SaaS platform that reached $10M ARR without a single dollar of outside funding. This is the full story of how she did it.',
    metricPills: [
      { label: 'Revenue', value: '$10M ARR' },
      { label: 'Founded', value: '2021' },
      { label: 'Team', value: '45 people' },
      { label: 'Funding', value: '$0 (Bootstrapped)' },
      { label: 'Industry', value: 'Healthcare SaaS' },
      { label: 'Location', value: 'San Francisco' },
    ],
    tableOfContents: [
      'The Origin Story',
      'The Problem & Market Opportunity',
      'Building the Product',
      'First Customers & Revenue',
      'The Growth Playbook',
      'Mistakes & Pivots',
      'Revenue Breakdown',
      'Tech Stack & Tools',
      'Team & Culture',
      'Key Takeaways',
      'Advice for Founders',
    ],
    content: [
      { type: 'heading', content: 'The Origin Story' },
      { type: 'text', content: 'In March 2021, Sarah Chen walked out of Mercy General Hospital for the last time as an employee. She had spent the previous eight years as a hospital administrator across three different healthcare systems, and she was done watching talented nurses burn out because of software that was designed in the 1990s.' },
      { type: 'text', content: '"I remember sitting in a meeting where we were discussing why nurse turnover was at 34%," Sarah recalls. "Everyone was talking about compensation and scheduling. But when I actually shadowed nurses for a week, I found that they were spending 3.5 hours per shift on documentation. Not patient care — documentation. The software was literally driving people out of healthcare."' },
      { type: 'text', content: 'Sarah had no technical co-founder, no venture capital connections, and no experience building software. What she had was something more valuable: eight years of watching the problem from the inside, a network of hospital administrators who trusted her, and $47,000 in savings she was willing to bet on herself.' },
      { type: 'pullquote', content: 'I didn\'t set out to build a $10M company. I set out to fix one broken workflow that was burning out nurses. The revenue followed the impact.' },

      { type: 'heading', content: 'The Problem & Market Opportunity' },
      { type: 'text', content: 'The healthcare documentation market is massive — estimated at $4.6 billion in 2025 and growing at 12% annually. But the existing players (Epic, Cerner, Meditech) are legacy systems designed for compliance, not usability. They\'re built to capture data for billing, not to make clinicians\' lives easier.' },
      { type: 'text', content: 'Sarah identified a specific gap: mid-sized hospitals (100-500 beds) were stuck between enterprise solutions they couldn\'t afford to customize and small tools that didn\'t integrate with their EHR systems. There were approximately 2,800 hospitals in this segment in the US alone.' },
      { type: 'metric-callout', content: 'Market Size: $4.6B | Target Segment: 2,800 mid-sized US hospitals | Average Contract Value: $120K/year | Documentation Time Saved: 60%' },

      { type: 'heading', content: 'Building the Product' },
      { type: 'text', content: 'With no technical skills, Sarah faced a decision that every non-technical founder confronts: learn to code, hire a developer, or find a technical co-founder. She chose a fourth option that most business advice would call wrong — she learned just enough to ship.' },
      { type: 'text', content: 'Sarah spent her first three months taking online courses in JavaScript and React. She wasn\'t trying to become a software engineer. She was trying to understand enough to build a functional prototype and to evaluate technical talent later.' },
      { type: 'text', content: 'The MVP cost $5,000 total. She built the frontend herself using Next.js (which she learned from a YouTube tutorial series), used Supabase for the backend and database, and Stripe for billing. The entire infrastructure ran on Vercel\'s free tier for the first six months.' },
      { type: 'tip', content: 'Sarah\'s $5K MVP stack: Next.js (free) + Supabase (free tier) + Stripe (pay-as-you-go) + Vercel (free tier). Total cost was primarily for a Figma subscription and a domain name. "You don\'t need $50K to build a SaaS MVP in 2026. You need $50 and 200 hours of focused work."' },
      { type: 'text', content: 'The initial product did one thing: it let nurses dictate clinical notes using their phone\'s microphone, automatically structured the notes into the hospital\'s required format, and synced them to the EHR system via HL7 FHIR APIs. No AI gimmicks, no fancy dashboards — just a microphone button and a text editor.' },

      { type: 'heading', content: 'First Customers & Revenue' },
      { type: 'text', content: 'Getting the first customer was the hardest part of Sarah\'s journey. Healthcare is a notoriously difficult market to sell into — long sales cycles, compliance requirements, and deeply entrenched incumbents.' },
      { type: 'text', content: 'Sarah\'s strategy was simple but labor-intensive: she cold-emailed every hospital administrator she had ever met, attended, or connected with on LinkedIn. In total, she sent 312 personalized emails in her first month. Not templates — 312 individual emails referencing specific problems she knew each hospital faced.' },
      { type: 'text', content: 'The response rate was 14%. She booked 43 demo calls. Of those, 8 agreed to a pilot. Of those 8, one signed a paid contract in month three: a 180-bed community hospital in Ohio that agreed to $3,500/month.' },
      { type: 'metric-callout', content: 'Month 3: $3.5K MRR (1 customer) | Month 6: $24K MRR (6 customers) | Month 12: $180K MRR (38 customers) | Month 18: $420K MRR (72 customers) | Month 24: $830K MRR (145 customers)' },
      { type: 'pullquote', content: 'I cold-emailed 312 hospital administrators in my first month. Not templates — 312 individual emails. My response rate was 14%. That one month of emails generated my first $1M in pipeline.' },

      { type: 'heading', content: 'The Growth Playbook' },
      { type: 'text', content: 'TechCo\'s growth came from three channels, in order of impact:' },
      { type: 'text', content: '**Channel 1: LinkedIn Content (40% of leads).** Sarah started posting candidly about healthcare technology problems. Not product pitches — genuine observations from her years inside hospitals. One post about "the 47 clicks it takes to document a patient discharge" went viral in healthcare circles, generating 180,000 impressions and 34 inbound demo requests.' },
      { type: 'text', content: '**Channel 2: Referral Program (35% of leads).** Happy customers became the best salespeople. Sarah offered a simple referral program: any administrator who referred a hospital that signed got a $2,000 gift card and a donation to a nursing scholarship fund in their name. The referral rate was 28% — meaning more than 1 in 4 customers referred at least one other hospital.' },
      { type: 'text', content: '**Channel 3: Conference Speaking (25% of leads).** Sarah spoke at every healthcare IT conference that would have her. She didn\'t pitch TechCo — she presented data about documentation burden and shared open-source frameworks. The credibility converted into sales conversations organically.' },

      { type: 'heading', content: 'Mistakes & Pivots' },
      { type: 'text', content: 'Sarah is refreshingly honest about the mistakes she made along the way. The biggest one cost her $200,000 and nearly derailed the company.' },
      { type: 'warning', content: 'Mistake: Hired a VP of Sales at $180K base + commission when they had 40 customers. "He came from Salesforce and tried to implement an enterprise sales process for a product that sold itself through word-of-mouth. We burned $200K in 6 months before I realized the hire was wrong. The lesson: don\'t hire ahead of your go-to-market maturity."' },
      { type: 'text', content: 'The second major mistake was trying to build an AI-powered feature too early. In month 14, Sarah hired two ML engineers to build a predictive documentation system that would auto-generate notes before the nurse even started dictating. The feature took 5 months to build, cost $280K in salaries, and was used by exactly 3% of users.' },
      { type: 'tip', content: 'Lesson: "The nurses didn\'t want AI to write their notes. They wanted to spend less time formatting and filing their own notes. We were solving a problem that didn\'t exist. Now I always ask: Is this a painkiller or a vitamin? If it\'s a vitamin, kill it."' },

      { type: 'heading', content: 'Revenue Breakdown' },
      { type: 'text', content: 'TechCo\'s revenue model is straightforward: per-bed monthly pricing with annual contracts. The pricing tiers scale based on hospital size and feature usage.' },
      { type: 'table', content: 'Revenue by Hospital Size', columns: ['Segment', 'Beds', 'Price/Month', '# Customers', 'Revenue %'], data: [
        { Segment: 'Small', Beds: '50-100', 'Price/Month': '$2,500', '# Customers': '45', 'Revenue %': '13%' },
        { Segment: 'Medium', Beds: '100-250', 'Price/Month': '$5,500', '# Customers': '82', 'Revenue %': '52%' },
        { Segment: 'Large', Beds: '250-500', 'Price/Month': '$12,000', '# Customers': '18', 'Revenue %': '25%' },
        { Segment: 'Enterprise', Beds: '500+', 'Price/Month': '$25,000', '# Customers': '5', 'Revenue %': '10%' },
      ]},
      { type: 'text', content: 'Net revenue retention is 118%, driven by hospitals expanding TechCo to additional departments after initial deployment. Gross margin is 82%, with the primary costs being cloud infrastructure (Vercel + Supabase) and the HL7 integration middleware.' },

      { type: 'heading', content: 'Tech Stack & Tools' },
      { type: 'text', content: 'Sarah is intentionally conservative with her tech stack. "Every dependency is a liability. We use the fewest tools possible and we use them deeply."' },

      { type: 'heading', content: 'Team & Culture' },
      { type: 'text', content: 'TechCo has 45 employees, structured into three pillars: Product (18), Go-to-Market (15), and Operations (12). There is no traditional management hierarchy — Sarah uses a "pods" model where cross-functional teams of 4-5 people own specific hospital segments end-to-end.' },
      { type: 'text', content: 'The company is fully remote, with team members across 12 US states. Sarah pays in the 75th percentile for each role\'s local market rate and offers 100% healthcare coverage — a decision she says is both ethical and strategic for a healthcare company.' },
      { type: 'pullquote', content: 'A healthcare company that doesn\'t provide excellent healthcare to its own employees has no credibility. Our benefits package is our best recruiting tool.' },

      { type: 'heading', content: 'Key Takeaways' },
      { type: 'text', content: 'Sarah\'s journey from hospital administrator to $10M ARR founder offers several actionable lessons for aspiring founders.' },

      { type: 'heading', content: 'Advice for Founders' },
      { type: 'text', content: '"Stop reading startup advice and go talk to 50 customers. Not 5, not 10 — 50. If you can\'t find 50 people who have the problem you\'re solving, you don\'t have a business. I spent my first 60 days doing nothing but talking to hospital administrators. Those conversations shaped everything that followed."' },
      { type: 'text', content: '"Bootstrapping isn\'t for everyone, but it forces a discipline that VC money often destroys. When every dollar comes from customers, you build what customers actually need. When dollars come from investors, you build what investors think the market wants. Those are very different things."' },
    ],
    techStack: [
      { name: 'Next.js', category: 'Frontend' },
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Supabase', category: 'Backend & Database' },
      { name: 'Stripe', category: 'Payments' },
      { name: 'Vercel', category: 'Hosting' },
      { name: 'Linear', category: 'Project Management' },
      { name: 'Resend', category: 'Email' },
      { name: 'PostHog', category: 'Analytics' },
      { name: 'Sentry', category: 'Error Tracking' },
    ],
    timeline: [
      { date: 'Mar 2021', event: 'Sarah quits hospital administrator job' },
      { date: 'Jun 2021', event: 'MVP launched — $5K total cost' },
      { date: 'Sep 2021', event: 'First paying customer — $3.5K MRR' },
      { date: 'Mar 2022', event: '$180K MRR — 38 hospitals' },
      { date: 'Sep 2022', event: 'Turned down $5M Series A offer' },
      { date: 'Mar 2023', event: '$420K MRR — 72 hospitals' },
      { date: 'Sep 2023', event: '$830K MRR — crossed $10M ARR run rate' },
      { date: 'Feb 2024', event: '200th hospital onboarded, team reaches 45' },
    ],
    revenueData: [
      { month: 'M3', mrr: 3500 }, { month: 'M6', mrr: 24000 }, { month: 'M9', mrr: 85000 },
      { month: 'M12', mrr: 180000 }, { month: 'M15', mrr: 290000 }, { month: 'M18', mrr: 420000 },
      { month: 'M21', mrr: 610000 }, { month: 'M24', mrr: 830000 },
    ],
    takeaways: [
      'Domain expertise beats technical skills when finding product-market fit — Sarah\'s 8 years in hospitals was her unfair advantage.',
      'You can build a SaaS MVP for $5K using modern tools (Next.js, Supabase, Vercel). Don\'t let "I need funding to build" be your excuse.',
      'LinkedIn content that tells the truth about industry problems is the most underrated B2B marketing channel.',
      'Don\'t hire a VP of Sales before you understand your own go-to-market motion. It cost Sarah $200K to learn this.',
      'Bootstrapping forces discipline that VC money often destroys. Every dollar from customers aligns incentives perfectly.',
      'Net revenue retention above 100% is the ultimate growth engine — TechCo\'s 118% NRR compounds without new sales effort.',
      'Build the simplest thing that solves the core problem. AI features sound impressive but only 3% of Sarah\'s users wanted them.',
    ],
    relatedSlugs: ['how-aisha-patel-built-datapulse-to-3m-arr', 'marcus-rivera-novapay-2m-failure'],
  },
  {
    id: 'cs-2',
    slug: 'marcus-rivera-novapay-2m-failure',
    title: 'I Burned Through $2M in 18 Months. Here\'s Every Mistake I Made.',
    headline: 'I Burned Through $2M in 18 Months. Here\'s Every Mistake I Made.',
    founderName: 'Marcus Rivera',
    founderTitle: 'Former CEO',
    founderBio: 'Marcus Rivera is a fintech operator and angel investor based in Miami. After NovaPay shut down, he spent two years advising early-stage fintech companies on the exact mistakes to avoid. He now runs a small fund investing in Latin American fintech startups, applying every lesson from his own failure. Marcus has been featured in Bloomberg Línea, TechCrunch, and Fintech Futures.',
    founderLinkedin: '#',
    founderTwitter: '#',
    company: 'NovaPay',
    companyDescription: 'NovaPay was a cross-border payment platform designed to simplify B2B payments between US companies and Latin American suppliers. The company raised $2M in seed funding and operated for 18 months before shutting down.',
    industry: 'Fintech',
    revenue: '$0 (Failed)',
    revenueNumeric: 0,
    founded: '2022',
    teamSize: 12,
    funding: '$2M Seed',
    fundingType: 'Seed',
    location: 'Miami, FL',
    stage: 'Failed',
    tags: ['Fintech', 'Failure', 'Funded', 'Payments'],
    readingTime: '16 min read',
    date: 'Feb 8, 2026',
    excerpt: 'Marcus raised $2M for NovaPay, hired 12 people, expanded to 4 countries, and watched it all collapse. This is the most honest startup failure post-mortem you\'ll read — with exact dollar amounts for every mistake.',
    metricPills: [
      { label: 'Revenue', value: '$0 (Failed)' },
      { label: 'Founded', value: '2022' },
      { label: 'Team (Peak)', value: '12 people' },
      { label: 'Funding', value: '$2M Seed' },
      { label: 'Industry', value: 'Fintech' },
      { label: 'Location', value: 'Miami, FL' },
    ],
    tableOfContents: [
      'The Idea That Felt Like Destiny',
      'Raising $2M in 6 Weeks',
      'The First Warning Signs',
      'Where the Money Went',
      'The Three Fatal Mistakes',
      'The Death Spiral',
      'The Final Month',
      'What I\'d Do Differently',
      'Key Takeaways',
      'Advice for Founders',
    ],
    content: [
      { type: 'heading', content: 'The Idea That Felt Like Destiny' },
      { type: 'text', content: 'I was born in Venezuela and grew up watching my father struggle with cross-border payments. He ran a small import business, and every time he needed to pay a supplier in Colombia or Mexico, it was a nightmare — wire transfers that took 5 days, 4-6% fees, and zero transparency on exchange rates.' },
      { type: 'text', content: 'By the time I graduated from MIT Sloan in 2021, I was convinced that cross-border B2B payments in Latin America was the biggest untapped market in fintech. The market size was real: $415 billion in annual B2B cross-border flows between the US and Latin America, with an average fee of 3.2%. That\'s $13 billion in annual fees — and the incumbent solutions were banks built on 1970s infrastructure.' },
      { type: 'text', content: 'I spent three months talking to potential customers. I interviewed 67 import/export businesses, freight forwarders, and manufacturers. Every single one complained about the same thing: slow, expensive, opaque cross-border payments. The problem was real. The market was massive. The timing felt perfect.' },
      { type: 'pullquote', content: 'Every data point said yes. Every customer interview confirmed the pain. Every market report validated the opportunity. And we still failed. Because having a real problem isn\'t enough — you also need the right solution, the right team, and the right timing for YOUR specific approach.' },

      { type: 'heading', content: 'Raising $2M in 6 Weeks' },
      { type: 'text', content: 'With an MIT Sloan degree, a compelling market thesis, and 67 customer interviews on record, fundraising was almost easy. We closed a $2M seed round in 6 weeks from two respected fintech VCs — Ribbit Capital put in $1.2M and a Miami-based LatAm fund added $800K.' },
      { type: 'text', content: 'The terms were standard: $10M pre-money valuation, 20% dilution, board seat for Ribbit, standard liquidation preferences. I felt like I had won the lottery.' },
      { type: 'warning', content: 'In retrospect, raising money was the worst thing that happened to us. It created a false sense of validation. We had $2M in the bank but zero paying customers. The money made us feel like we had product-market fit when we hadn\'t even shipped a product.' },

      { type: 'heading', content: 'The First Warning Signs' },
      { type: 'text', content: 'The warning signs started in month four, but I was too excited to see them.' },
      { type: 'text', content: 'Our original plan was to build a simple payment API that businesses could integrate in 2-3 days. But we discovered that cross-border B2B payments require money transmitter licenses in every state you operate in (18 states had significant LatAm trade volume), plus compliance with BSA/AML regulations, plus partnerships with correspondent banks in each target country.' },
      { type: 'text', content: 'The regulatory compliance costs alone were 4x our original projection. We had budgeted $80K for compliance in our first year. The actual cost was $340K — and that was just for the legal work, not including the technology to implement KYC/KYB workflows.' },
      { type: 'metric-callout', content: 'Projected compliance cost: $80K | Actual compliance cost: $340K | Projected time to first transaction: 3 months | Actual time: 9 months | Projected burn rate: $85K/month | Actual burn rate: $140K/month' },

      { type: 'heading', content: 'Where the Money Went' },
      { type: 'text', content: 'Here\'s the honest breakdown of how we spent $2M in 18 months:' },
      { type: 'table', content: 'Expense Breakdown', columns: ['Category', 'Budget', 'Actual', 'Difference'], data: [
        { Category: 'Engineering (salaries)', Budget: '$600K', Actual: '$720K', Difference: '+$120K' },
        { Category: 'Compliance & Legal', Budget: '$80K', Actual: '$340K', Difference: '+$260K' },
        { Category: 'Office & Operations', Budget: '$120K', Actual: '$210K', Difference: '+$90K' },
        { Category: 'Sales & Marketing', Budget: '$200K', Actual: '$180K', Difference: '-$20K' },
        { Category: 'Banking Partners', Budget: '$100K', Actual: '$250K', Difference: '+$150K' },
        { Category: 'Other (travel, tools)', Budget: '$100K', Actual: '$300K', Difference: '+$200K' },
      ]},

      { type: 'heading', content: 'The Three Fatal Mistakes' },
      { type: 'text', content: 'Looking back, I can point to exactly three decisions that killed NovaPay. Not market conditions, not competition, not bad luck — three specific mistakes I made as CEO.' },
      { type: 'warning', content: 'Fatal Mistake #1: Hiring too fast. We went from 3 people to 12 in four months. Half the team was still in onboarding while we were pivoting our product strategy. I hired a Head of Compliance ($160K/year), a VP of Engineering ($190K/year), and a Head of Partnerships ($140K/year) — all before we had a single paying customer. Combined cost: $490K in the first year for leadership roles that were premature.' },
      { type: 'warning', content: 'Fatal Mistake #2: Ignoring unit economics. Our customer acquisition cost was $2,400. Our average customer lifetime value was $800. We were literally paying $1,600 for every customer we acquired. I kept telling myself "unit economics will improve at scale." They didn\'t. They got worse, because our support costs scaled linearly with customers while our revenue per customer stayed flat.' },
      { type: 'warning', content: 'Fatal Mistake #3: Founder ego. Three advisors — all experienced fintech operators — told me to pivot to a simpler product (domestic payments first, then expand to cross-border). I ignored all of them. My pitch deck said "cross-border payments" and I was emotionally attached to the vision. Pivoting felt like admitting I was wrong. So I kept doubling down on the original thesis while the runway burned.' },

      { type: 'heading', content: 'The Death Spiral' },
      { type: 'text', content: 'By month 14, we had $280K left in the bank and a monthly burn of $140K. We had 30 active customers generating $12K in monthly revenue. The math was simple: we had two months of runway.' },
      { type: 'text', content: 'I spent month 14 and 15 trying to raise a bridge round. I called every VC contact I had. I pitched 23 investors in 4 weeks. Every single one passed. The feedback was consistent: "Love the market, but your unit economics don\'t work and you don\'t have enough traction to justify a bridge at a reasonable valuation."' },
      { type: 'text', content: 'Ribbit Capital offered to lead a $500K bridge — but at a 60% discount to our seed valuation. Taking the deal would have diluted the team\'s equity to almost nothing and only bought us 3.5 more months. I declined.' },

      { type: 'heading', content: 'The Final Month' },
      { type: 'text', content: 'On March 12, 2024, I laid off the entire team over Zoom. Twelve people, twelve individual calls, twelve conversations I\'ll never forget. The hardest was our first engineer, Miguel, who had turned down a Google offer to join NovaPay. He had a newborn daughter.' },
      { type: 'pullquote', content: 'The layoff calls were the worst day of my life. Not because the company failed — companies fail all the time. Because twelve people trusted me with their careers, and I let them down. That weight doesn\'t go away.' },
      { type: 'text', content: 'We returned $43K of remaining capital to our investors (yes, forty-three thousand out of two million), helped every team member find new roles within 6 weeks (I personally made 85 introductions), and formally dissolved the company in April 2024.' },

      { type: 'heading', content: 'What I\'d Do Differently' },
      { type: 'text', content: 'If I could restart NovaPay from day one with everything I know now, here\'s what I\'d change:' },
      { type: 'text', content: '**1. Start with domestic payments.** Build the infrastructure for US-to-US B2B payments first. Master the compliance, operations, and unit economics in one market before adding the complexity of cross-border.' },
      { type: 'text', content: '**2. Stay lean.** Keep the team at 4-5 people for the first 12 months. Hire for execution, not for titles. Nobody needs a VP of Engineering with 3 engineers.' },
      { type: 'text', content: '**3. Validate unit economics before scaling.** Don\'t acquire customer #31 until customer #1 through #30 are individually profitable. If your LTV/CAC ratio isn\'t above 3:1 with your first 30 customers, you have a business model problem, not a scale problem.' },
      { type: 'text', content: '**4. Listen to advisors.** Especially the ones who tell you things you don\'t want to hear. Confirmation bias is the deadliest disease in startup land.' },

      { type: 'heading', content: 'Key Takeaways' },
      { type: 'text', content: 'NovaPay\'s failure wasn\'t inevitable. The market was real, the timing was right, and the team was talented. What killed us was a series of avoidable decisions driven by ego, inexperience, and the false confidence that comes with having money in the bank.' },

      { type: 'heading', content: 'Advice for Founders' },
      { type: 'text', content: '"The money in your bank account is not validation. Customers paying you money is validation. Revenue growing month-over-month is validation. A VC writing you a check means they\'re making a bet — it doesn\'t mean you\'ve won."' },
      { type: 'text', content: '"If three experienced people in your industry tell you the same thing, listen. Even if it contradicts your vision. Especially if it contradicts your vision. The startup graveyard is full of founders who were too smart to take advice."' },
    ],
    techStack: [
      { name: 'Node.js', category: 'Backend' },
      { name: 'React', category: 'Frontend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'AWS', category: 'Infrastructure' },
      { name: 'Plaid', category: 'Banking API' },
      { name: 'Sardine', category: 'Fraud Detection' },
    ],
    timeline: [
      { date: 'Jan 2022', event: 'Idea conceived; began customer interviews' },
      { date: 'Apr 2022', event: 'Raised $2M seed round from Ribbit Capital' },
      { date: 'Aug 2022', event: 'Team grows to 12; office opened in Miami' },
      { date: 'Nov 2022', event: 'First beta users onboarded' },
      { date: 'Mar 2023', event: 'Realized compliance costs 4x over budget' },
      { date: 'Jul 2023', event: 'First paying customers — 30 active, $12K MRR' },
      { date: 'Nov 2023', event: 'Runway crisis — $280K remaining' },
      { date: 'Mar 2024', event: 'Company shut down; team laid off' },
    ],
    takeaways: [
      'Raising VC money creates a false sense of validation. Revenue from customers is the only real validation.',
      'Never hire ahead of product-market fit. NovaPay went from 3 to 12 people before having a single paying customer.',
      'Regulatory compliance in fintech costs 3-5x what you budget. Plan for it or pick a different market.',
      'If your LTV/CAC ratio is below 1:1, you don\'t have a growth problem — you have a business model problem.',
      'Founder ego is the silent killer. Three advisors told Marcus to pivot. He ignored all of them.',
      'The hardest part of failure isn\'t losing your company — it\'s letting down the people who trusted you with their careers.',
    ],
    relatedSlugs: ['how-sarah-chen-bootstrapped-techco-to-10m-arr', 'how-aisha-patel-built-datapulse-to-3m-arr'],
  },
  {
    id: 'cs-3',
    slug: 'how-aisha-patel-built-datapulse-to-3m-arr',
    title: 'From Side Project to $3M ARR While Working Full-Time at Google',
    headline: 'How Aisha Patel Built DataPulse to $3M ARR While Working Full-Time at Google',
    founderName: 'Aisha Patel',
    founderTitle: 'Founder & CEO',
    founderBio: 'Aisha Patel is the founder and CEO of DataPulse, a developer analytics platform used by 2,000+ engineering teams worldwide. Before going full-time on DataPulse, she spent 6 years as a senior software engineer at Google, working on the Cloud Monitoring team. She holds a CS degree from Carnegie Mellon and has been featured in The Verge, Hacker News (front page 4 times), and the Google Developer podcast.',
    founderLinkedin: '#',
    founderTwitter: '#',
    founderWebsite: '#',
    company: 'DataPulse',
    companyDescription: 'DataPulse is a developer analytics platform that gives engineering teams real-time visibility into API performance, error rates, and system health across microservices architectures. The platform processes over 2 billion events per day.',
    industry: 'Developer Tools',
    revenue: '$3M ARR',
    revenueNumeric: 3000000,
    founded: '2023',
    teamSize: 8,
    funding: '$0 (Bootstrapped)',
    fundingType: 'Bootstrapped',
    location: 'Remote (San Francisco)',
    stage: 'Growth',
    tags: ['Developer Tools', 'Side Project', 'Bootstrapped', 'SaaS'],
    readingTime: '13 min read',
    date: 'Jan 30, 2026',
    excerpt: 'Aisha built DataPulse in nights and weekends while working at Google, grew it to $80K MRR before quitting her job, and now runs a $3M ARR developer tools company with a team of 8. Here\'s exactly how she did it.',
    metricPills: [
      { label: 'Revenue', value: '$3M ARR' },
      { label: 'Founded', value: '2023' },
      { label: 'Team', value: '8 people' },
      { label: 'Funding', value: '$0 (Bootstrapped)' },
      { label: 'Industry', value: 'Developer Tools' },
      { label: 'Location', value: 'Remote' },
    ],
    tableOfContents: [
      'The Side Project Origin',
      'The Accidental Product Launch',
      'Growing While Employed',
      'Revenue Milestones',
      'The Pricing Evolution',
      'The Decision to Quit Google',
      'Scaling to $3M ARR',
      'Tech Stack & Architecture',
      'Key Takeaways',
      'Advice for Founders',
    ],
    content: [
      { type: 'heading', content: 'The Side Project Origin' },
      { type: 'text', content: 'DataPulse started because I was frustrated at my own job. I was a senior engineer on Google\'s Cloud Monitoring team, and ironically, the internal tools we used to monitor our own services were clunky. Every Monday morning, I spent 45 minutes manually checking API latencies, error rates, and throughput across 14 different microservices. The dashboards existed, but they were scattered across 6 different tools.' },
      { type: 'text', content: 'One weekend in January 2023, I built a simple dashboard that pulled metrics from all our services into a single view. It was ugly — a React app with plain HTML tables and a few Recharts graphs. But it worked. Monday morning, I opened it instead of my usual routine. My 45-minute check took 3 minutes.' },
      { type: 'text', content: 'A colleague saw my screen and asked, "What is that?" By the end of the week, 8 people on my team were using it. By the end of the month, engineers from three other teams had asked me to add their services. DataPulse was born — though it didn\'t have a name yet. I just called it "the dashboard."' },
      { type: 'pullquote', content: 'I didn\'t have a startup idea. I had a 45-minute problem that I solved in a weekend. The best products aren\'t conceived in brainstorming sessions — they\'re discovered through personal frustration.' },

      { type: 'heading', content: 'The Accidental Product Launch' },
      { type: 'text', content: 'In March 2023, I shared a screenshot of the dashboard on Twitter with the caption: "Built a thing that saves me 45 min every Monday morning. Anyone else want this?" I attached 4 screenshots showing the before (6 separate dashboards) and the after (one unified view).' },
      { type: 'text', content: 'The tweet got 12,000 impressions. Within 24 hours, I had 47 DMs from engineers asking if they could use it. Not "looks cool!" messages — actual "how do I install this?" messages. That weekend, I bought the domain datapulse.dev for $12, set up a Stripe checkout page ($29/month), and deployed the tool on Vercel.' },
      { type: 'metric-callout', content: 'Tweet impressions: 12,000 | DMs received: 47 | Time from tweet to Stripe checkout: 48 hours | First month revenue: $2,030 (70 customers at $29/mo)' },
      { type: 'text', content: 'I didn\'t build a landing page. I didn\'t write marketing copy. I didn\'t create a logo. I replied to each DM with a link to the Stripe checkout page and a Google Doc explaining how to connect their services. Seventy people paid $29 in the first month. Revenue: $2,030.' },
      { type: 'tip', content: 'Aisha\'s launch strategy: "Skip the landing page. Skip the logo. Skip the launch plan. If 47 people DM you asking to buy something, just give them a way to pay. You can make it pretty later."' },

      { type: 'heading', content: 'Growing While Employed' },
      { type: 'text', content: 'For the next 14 months, I lived a double life. From 9am to 6pm, I was a Google employee. From 8pm to midnight (and most of Saturday), I was the sole developer, designer, marketer, and support agent for DataPulse.' },
      { type: 'text', content: 'The biggest challenge wasn\'t time — it was energy. Google pays well partly because the work is mentally demanding. After 9 hours of debugging distributed systems at Google, I had to come home and debug distributed systems at DataPulse. Some nights I just stared at the screen.' },
      { type: 'text', content: 'What saved me was ruthless prioritization. I had maybe 25 productive hours per week for DataPulse. That meant I could only work on things that directly drove revenue or prevented churn. No redesigns, no new features that weren\'t requested by paying customers, no "nice to haves." Every hour had to count.' },
      { type: 'text', content: 'Growth was organic and steady. I posted on Twitter every week — not promotional content, but genuine observations about monitoring and observability. Developers followed me for the insights and discovered DataPulse through my bio. I never ran a single ad.' },

      { type: 'heading', content: 'Revenue Milestones' },
      { type: 'text', content: 'DataPulse\'s revenue growth was remarkably consistent, driven entirely by word-of-mouth and organic Twitter content:' },
      { type: 'metric-callout', content: 'Month 1: $2K MRR | Month 3: $8K MRR | Month 6: $22K MRR | Month 9: $45K MRR | Month 12: $80K MRR | Month 14: Quit Google | Month 18: $150K MRR | Month 24: $250K MRR' },
      { type: 'text', content: 'The growth curve was almost perfectly linear for the first year — roughly $6-8K in new MRR per month. No hockey stick, no viral moment. Just consistent organic growth from developers who found the tool useful and told their colleagues.' },

      { type: 'heading', content: 'The Pricing Evolution' },
      { type: 'text', content: 'Pricing was my biggest lever for revenue growth. I changed pricing three times in 20 months:' },
      { type: 'table', content: 'Pricing Evolution', columns: ['Version', 'Model', 'Price', 'ARPU', 'Revenue Impact'], data: [
        { Version: 'V1 (Launch)', Model: 'Flat rate', Price: '$29/mo', ARPU: '$29', 'Revenue Impact': 'Baseline' },
        { Version: 'V2 (Month 6)', Model: 'Tiered', Price: '$29/$99/$299', ARPU: '$67', 'Revenue Impact': '+131% ARPU' },
        { Version: 'V3 (Month 14)', Model: 'Usage + Tier', Price: '$49/$149/$499+', ARPU: '$142', 'Revenue Impact': '+112% ARPU' },
      ]},
      { type: 'tip', content: 'Lesson: "I underpriced by 5x at launch. Most developer tools founders do. Developers will pay $149/month for something that saves them 10 hours/month — that\'s $15/hour, less than any engineer\'s hourly rate. Don\'t anchor to consumer pricing."' },

      { type: 'heading', content: 'The Decision to Quit Google' },
      { type: 'text', content: 'I quit Google on May 15, 2024, when DataPulse hit $80K MRR. My Google compensation (salary + stock + bonus) was approximately $420K/year. DataPulse was generating $960K ARR. Financially, the math was clear.' },
      { type: 'text', content: 'Emotionally, it was the hardest decision I\'ve ever made. Google is comfortable — the benefits, the prestige, the smart colleagues, the free food (yes, the food matters when you work 12-hour days). Leaving felt like jumping off a cliff.' },
      { type: 'pullquote', content: 'I waited too long to quit. The golden handcuffs at Google are real — not just the money, but the identity. "I\'m a Google engineer" is a security blanket. "I\'m a bootstrapped founder with 8 months of runway" is terrifying. But the terrifying option was the right one.' },
      { type: 'text', content: 'In retrospect, I should have quit at $45K MRR (month 9). The additional 5 months at Google didn\'t add meaningful savings, but they slowed DataPulse\'s growth. The first month after quitting, revenue jumped from $80K to $105K MRR — because I finally had 60 hours per week to work on the product instead of 25.' },

      { type: 'heading', content: 'Scaling to $3M ARR' },
      { type: 'text', content: 'After going full-time, three things changed immediately:' },
      { type: 'text', content: '**1. Product velocity tripled.** I shipped more features in my first month full-time than in the previous 4 months combined. Users noticed. NPS went from 42 to 67 in two months.' },
      { type: 'text', content: '**2. I hired my first employee.** A support engineer at $70K/year who handled all customer questions, freeing me to focus 100% on product and growth. Best hire I ever made.' },
      { type: 'text', content: '**3. I launched enterprise pricing.** $499/month + custom pricing for teams over 50 engineers. The first enterprise deal ($2,400/month for a 200-person engineering team) closed in my second month full-time.' },
      { type: 'text', content: 'Today, DataPulse has 8 team members (4 engineers, 2 support, 1 marketing, 1 ops), 2,100+ paying customers, and processes over 2 billion events per day. Revenue is $3M ARR and growing at 15% month-over-month.' },

      { type: 'heading', content: 'Tech Stack & Architecture' },
      { type: 'text', content: 'DataPulse\'s architecture is designed for one thing: processing massive amounts of telemetry data cheaply. The entire infrastructure costs $8,200/month — giving us 96.7% gross margins at $250K MRR.' },

      { type: 'heading', content: 'Key Takeaways' },
      { type: 'text', content: 'Aisha\'s story demonstrates that the best startup ideas often come from solving your own problem. DataPulse wasn\'t planned — it was discovered through personal frustration, validated through a single tweet, and grown through consistent organic effort.' },

      { type: 'heading', content: 'Advice for Founders' },
      { type: 'text', content: '"Don\'t build a startup. Solve a problem. If the problem is real, people will pay you before you even ask them to. If you have to convince people they have a problem, you\'re building a vitamin, not a painkiller."' },
      { type: 'text', content: '"Side project founders: your constraint is your advantage. Having only 25 hours/week forces you to work on what matters. Full-time founders often waste their first 6 months on things that don\'t move revenue."' },
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Go', category: 'Backend' },
      { name: 'ClickHouse', category: 'Analytics Database' },
      { name: 'Redis', category: 'Caching' },
      { name: 'Vercel', category: 'Frontend Hosting' },
      { name: 'Fly.io', category: 'Backend Hosting' },
      { name: 'Stripe', category: 'Payments' },
      { name: 'Resend', category: 'Email' },
      { name: 'Linear', category: 'Project Management' },
    ],
    timeline: [
      { date: 'Jan 2023', event: 'Built internal dashboard at Google in a weekend' },
      { date: 'Mar 2023', event: 'Tweet goes semi-viral; 47 DMs; Stripe checkout live' },
      { date: 'Apr 2023', event: 'Month 1: $2K MRR — 70 paying customers' },
      { date: 'Sep 2023', event: 'Month 6: $22K MRR — tiered pricing launched' },
      { date: 'Jan 2024', event: 'Month 9: $45K MRR — should have quit Google' },
      { date: 'May 2024', event: 'Month 14: $80K MRR — quits Google' },
      { date: 'Nov 2024', event: 'Month 20: $250K MRR — team grows to 8' },
      { date: 'Jan 2026', event: 'Crosses $3M ARR; 2,100+ customers' },
    ],
    revenueData: [
      { month: 'M1', mrr: 2000 }, { month: 'M3', mrr: 8000 }, { month: 'M6', mrr: 22000 },
      { month: 'M9', mrr: 45000 }, { month: 'M12', mrr: 80000 }, { month: 'M14', mrr: 105000 },
      { month: 'M18', mrr: 150000 }, { month: 'M24', mrr: 250000 },
    ],
    takeaways: [
      'The best startup ideas come from solving your own problem. Aisha didn\'t brainstorm — she built something she needed at work.',
      'You don\'t need a landing page to launch. A tweet, 47 DMs, and a Stripe checkout page generated $2K in month one.',
      'Side project founders: your time constraint is an advantage. 25 hours/week forces you to work only on what drives revenue.',
      'Most developer tools are underpriced at launch. Aisha 5x\'d her ARPU by moving from $29 to $149 in 14 months.',
      'Don\'t wait too long to quit your day job. Aisha waited until $80K MRR but says she should have quit at $45K.',
      'Your first hire should free up YOUR time, not add capabilities. Aisha\'s first hire was support, not engineering.',
      'Organic content on Twitter/X is the most underrated growth channel for developer tools — zero ad spend got Aisha to $3M ARR.',
    ],
    relatedSlugs: ['how-sarah-chen-bootstrapped-techco-to-10m-arr', 'marcus-rivera-novapay-2m-failure'],
  },
];

// Programmatic SEO page data
export interface InsightPage {
  slug: string;
  type: 'startup-costs' | 'success-stories' | 'business-ideas' | 'tools';
  title: string;
  subtitle: string;
  basedOn: number;
  sections: InsightSection[];
  faqs: { question: string; answer: string }[];
  relatedCaseStudySlugs: string[];
}

export interface InsightSection {
  type: 'text' | 'heading' | 'cost-table' | 'story-list' | 'stats-summary';
  content: string;
  data?: Record<string, string>[];
  columns?: string[];
}

export const insightPages: InsightPage[] = [
  {
    slug: 'saas-business',
    type: 'startup-costs',
    title: 'How Much Does It Cost to Start a SaaS Business in 2026?',
    subtitle: 'Real cost data from founder case studies — not estimates from business plan templates.',
    basedOn: 3,
    sections: [
      { type: 'heading', content: 'The Real Cost of Starting a SaaS Business' },
      { type: 'text', content: 'We analyzed cost data from our founder case studies to give you real numbers — not guesses. The range is enormous: Sarah Chen started TechCo for $5,000. Marcus Rivera raised $2M for NovaPay and burned through all of it. Aisha Patel built DataPulse for approximately $1,200 (a domain name and a few SaaS subscriptions).' },
      { type: 'text', content: 'The key insight: the cost of starting a SaaS business in 2026 has never been lower, thanks to free-tier infrastructure (Vercel, Supabase, Stripe), open-source frameworks, and AI coding assistants. The bottleneck is no longer money — it\'s execution.' },
      { type: 'stats-summary', content: 'Minimum startup cost: $1,200 | Median startup cost: $5,000 | Average startup cost: $47,000 | Maximum in our dataset: $2,000,000 | Most common first-year revenue: $24K-$80K MRR' },
      { type: 'heading', content: 'Cost Breakdown by Category' },
      { type: 'cost-table', content: 'SaaS Startup Costs', columns: ['Category', 'Low Estimate', 'Average', 'High Estimate'], data: [
        { Category: 'Domain & Branding', 'Low Estimate': '$12', Average: '$200', 'High Estimate': '$2,000' },
        { Category: 'Hosting & Infrastructure', 'Low Estimate': '$0 (free tier)', Average: '$50/mo', 'High Estimate': '$500/mo' },
        { Category: 'Development Tools', 'Low Estimate': '$0 (open source)', Average: '$100/mo', 'High Estimate': '$1,000/mo' },
        { Category: 'Legal & Compliance', 'Low Estimate': '$500', Average: '$5,000', 'High Estimate': '$340,000' },
        { Category: 'Marketing', 'Low Estimate': '$0 (organic)', Average: '$2,000/mo', 'High Estimate': '$20,000/mo' },
        { Category: 'Salaries (if hiring)', 'Low Estimate': '$0 (solo)', Average: '$8,000/mo', 'High Estimate': '$50,000/mo' },
      ]},
      { type: 'heading', content: 'Real Examples From Our Case Studies' },
      { type: 'text', content: '**Sarah Chen / TechCo ($5,000 startup cost):** Built the MVP using Next.js, Supabase, and Vercel\'s free tier. The $5K went to a Figma subscription, domain name, and a few months of paid Supabase tier once she had customers. Reached $10M ARR without ever raising money.' },
      { type: 'text', content: '**Aisha Patel / DataPulse (~$1,200 startup cost):** Spent $12 on a domain, ~$50/month on Vercel Pro, and the rest on a few development tools. Built the entire product herself in nights and weekends while working at Google. Reached $3M ARR bootstrapped.' },
      { type: 'text', content: '**Marcus Rivera / NovaPay ($2,000,000 startup cost):** Raised a $2M seed round and burned through it in 18 months. The biggest expense was compliance and legal ($340K) — a cost that\'s unique to fintech. The company ultimately failed, proving that more money doesn\'t mean more success.' },
    ],
    faqs: [
      { question: 'What\'s the cheapest way to start a SaaS business?', answer: 'Based on our case studies, you can launch a SaaS product for under $1,500 using free-tier tools like Vercel, Supabase, and Stripe. Aisha Patel built DataPulse for approximately $1,200 and grew it to $3M ARR.' },
      { question: 'Do I need funding to start a SaaS company?', answer: 'No. Two of our three case study founders bootstrapped to millions in revenue without any outside funding. Sarah Chen reached $10M ARR and Aisha Patel reached $3M ARR — both with $0 in venture capital.' },
      { question: 'What\'s the biggest hidden cost of starting a SaaS?', answer: 'Compliance and legal costs, especially in regulated industries. Marcus Rivera budgeted $80K for compliance at NovaPay but spent $340K. If you\'re building in fintech, healthcare, or insurance, multiply your compliance budget by 3-5x.' },
      { question: 'How long until a SaaS business becomes profitable?', answer: 'In our case studies, bootstrapped SaaS companies reached profitability within 3-6 months (since they had no overhead). Funded companies like NovaPay never reached profitability. The median time to $100K ARR was approximately 9 months.' },
      { question: 'Should I quit my job to start a SaaS company?', answer: 'Not immediately. Aisha Patel built DataPulse to $80K MRR ($960K ARR) before leaving Google. She recommends quitting when your side project revenue exceeds 50% of your salary — though she says in retrospect, she waited too long.' },
    ],
    relatedCaseStudySlugs: ['how-sarah-chen-bootstrapped-techco-to-10m-arr', 'marcus-rivera-novapay-2m-failure', 'how-aisha-patel-built-datapulse-to-3m-arr'],
  },
  {
    slug: 'bootstrapped-saas',
    type: 'success-stories',
    title: '6 Bootstrapped Startup Success Stories (With Real Revenue Numbers)',
    subtitle: 'Real founders who built profitable companies without venture capital — with transparent revenue data.',
    basedOn: 6,
    sections: [
      { type: 'heading', content: 'Why Bootstrapping Works' },
      { type: 'text', content: 'The narrative that you need venture capital to build a successful startup is a myth. The founders in this roundup built companies generating a combined $14.7M in annual revenue — without a single dollar of outside funding.' },
      { type: 'text', content: 'These aren\'t lifestyle businesses. They\'re high-growth, high-impact companies that chose profitability over fundraising theatrics. Here are their stories, with real revenue numbers.' },
      { type: 'stats-summary', content: 'Combined Revenue: $14.7M ARR | Average Revenue: $4.9M ARR | Median Time to $1M: 2.1 years | Average Team Size: 18 people | Total Funding Raised: $0' },
      { type: 'heading', content: 'The Success Stories' },
      { type: 'story-list', content: 'Bootstrapped founders who built without VC money' },
    ],
    faqs: [
      { question: 'What percentage of successful startups are bootstrapped?', answer: 'According to our case study database, 62% of profitable startups in our collection were bootstrapped. The bootstrapped companies also had higher median profit margins (34% vs 12% for funded companies).' },
      { question: 'What\'s the average revenue of a bootstrapped startup?', answer: 'Among our case studies, the average bootstrapped startup generates $2.1M in annual recurring revenue. The range is wide — from $500K to $10M ARR — but the median is $1.8M ARR.' },
      { question: 'How long does it take a bootstrapped startup to reach $1M ARR?', answer: 'The median time to $1M ARR for bootstrapped startups in our database is 2.1 years. The fastest was 14 months (DataPulse by Aisha Patel). The slowest was 3.5 years.' },
    ],
    relatedCaseStudySlugs: ['how-sarah-chen-bootstrapped-techco-to-10m-arr', 'how-aisha-patel-built-datapulse-to-3m-arr'],
  },
];

// Aggregated stats for the revenue database sidebar
export const caseStudyStats = {
  totalCaseStudies: 127,
  averageRevenue: '$2.1M ARR',
  medianTimeTo1M: '2.3 years',
  bootstrappedVsFunded: '62% / 38%',
  topIndustry: 'SaaS (34%)',
  mostCommonFirstRevenue: 'Consulting → Product',
};
