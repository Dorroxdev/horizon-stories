export interface Story {
  id: string;
  slug: string;
  title: string;
  guestName: string;
  guestTitle: string;
  company: string;
  revenue: string;
  contentType: 'Video' | 'Podcast' | 'Written';
  category: 'story' | 'failure' | 'playbook' | 'guide';
  tags: string[];
  duration: string;
  date: string;
  excerpt: string;
  content: string;
  takeaways: string[];
  timestamps?: { time: string; label: string }[];
  guestBio: string;
  guestLinkedin?: string;
  guestTwitter?: string;
  guestWebsite?: string;
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  guestName: string;
  duration: string;
  date: string;
  description: string;
}

export interface Guest {
  id: string;
  name: string;
  company: string;
  title: string;
  revenue: string;
  industry: string;
  storySlug: string;
  quote: string;
}

export const stories: Story[] = [
  {
    id: '1',
    slug: 'bootstrapped-healthcare-saas-10m-arr',
    title: 'How I Bootstrapped a Healthcare SaaS to $10M ARR',
    guestName: 'Sarah Chen',
    guestTitle: 'Founder & CEO',
    company: 'TechCo',
    revenue: '$10M ARR',
    contentType: 'Video',
    category: 'story',
    tags: ['SaaS', 'Healthcare', 'Bootstrapped'],
    duration: '38 min',
    date: 'Feb 12, 2026',
    excerpt: 'Sarah built TechCo from her apartment with zero funding, turning a frustrating hospital workflow into a $10M revenue machine.',
    content: `When I left my job as a hospital administrator, everyone thought I was crazy. I had no technical co-founder, no funding, and no connections in Silicon Valley. But I had something more valuable: 8 years of watching broken software waste doctors' time.\n\nThe first year was brutal. I taught myself to code using online courses, building the MVP in nights and weekends. Our first customer was a small clinic in Ohio that I cold-called 47 times before they agreed to a demo.\n\n## The Turning Point\n\nMonth 14 was when everything changed. We landed a 200-bed hospital system in Texas. They found us through a LinkedIn post I almost didn't publish — a candid breakdown of how much time nurses waste on documentation. That post got 50,000 views and brought in 23 demo requests.\n\n> "The best marketing for a healthcare product is telling the truth about how broken healthcare software is."\n\n## Scaling Without VC Money\n\nBy year 3, we were at $3M ARR with a team of 12. I bootstrapped everything using customer revenue. No pitch decks, no investor meetings. Just shipping features that customers actually asked for.\n\nThe hardest part wasn't building the product — it was saying no. We turned down a $5M Series A because the terms would have forced us to chase enterprise deals we weren't ready for.`,
    takeaways: [
      'Domain expertise beats technical skills when finding product-market fit',
      'LinkedIn content can be your best sales channel if you tell authentic stories',
      'Bootstrapping forces discipline that VC money often destroys'
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction & background' },
      { time: '05:12', label: 'Leaving the hospital job' },
      { time: '12:30', label: 'Building the MVP alone' },
      { time: '18:45', label: 'First customer story' },
      { time: '24:10', label: 'The LinkedIn post that changed everything' },
      { time: '31:00', label: 'Turning down VC money' },
      { time: '35:20', label: 'Advice for founders' },
    ],
    guestBio: 'Sarah Chen is the founder and CEO of TechCo, a healthcare SaaS platform that helps hospitals reduce documentation time by 60%. Before founding TechCo, she spent 8 years as a hospital administrator.',
    guestLinkedin: '#', guestTwitter: '#', guestWebsite: '#',
  },
  {
    id: '2',
    slug: 'burned-through-2m-in-18-months',
    title: 'I Burned Through $2M in 18 Months. Here\'s What Killed Us.',
    guestName: 'Marcus Rivera',
    guestTitle: 'Former CEO',
    company: 'NovaPay',
    revenue: '$0 (Failed)',
    contentType: 'Video',
    category: 'failure',
    tags: ['Fintech', 'Failure', 'Funded'],
    duration: '42 min',
    date: 'Feb 5, 2026',
    excerpt: 'Marcus raised $2M for NovaPay, hired 15 people, and watched it all collapse. This is the most honest failure post-mortem you\'ll read this year.',
    content: `I still remember the day we closed our seed round. $2M from two top-tier VCs, champagne in the office, a team of 15, and a product roadmap that would "disrupt payments in Latin America."\n\n18 months later, I was laying off the entire team over Zoom.\n\n## What Went Wrong\n\nThe short answer: everything. The long answer is more nuanced.\n\nWe built what we wanted to build, not what the market needed. Our payment solution was technically elegant — beautiful API, great documentation, seamless integration. But we were solving a problem that only existed in our pitch deck.\n\n> "We were so in love with our solution that we forgot to validate the problem."\n\n## The Three Fatal Mistakes\n\n**Mistake #1: Hiring too fast.** We went from 3 to 15 people in 4 months. Half the team was in onboarding while we were still figuring out product-market fit.\n\n**Mistake #2: Ignoring unit economics.** Our customer acquisition cost was $2,400. Our average customer lifetime value was $800. We were literally paying people to use our product.\n\n**Mistake #3: Founder ego.** I couldn't admit we were wrong. Three advisors told me to pivot. I ignored all of them.`,
    takeaways: [
      'Validate the problem before falling in love with your solution',
      'Never hire ahead of product-market fit',
      'Founder ego is the silent killer of startups'
    ],
    timestamps: [
      { time: '00:00', label: 'The day we raised $2M' },
      { time: '06:30', label: 'The first warning signs' },
      { time: '15:00', label: 'When the numbers stopped adding up' },
      { time: '25:00', label: 'The three fatal mistakes' },
      { time: '35:00', label: 'The layoff call' },
      { time: '38:30', label: 'What I\'d do differently' },
    ],
    guestBio: 'Marcus Rivera is a fintech operator and angel investor based in Miami. After NovaPay, he spent two years advising early-stage fintech companies on avoiding the mistakes he made.',
    guestLinkedin: '#', guestTwitter: '#',
  },
  {
    id: '3',
    slug: 'side-project-to-3m-arr',
    title: 'From Side Project to $3M ARR While Working Full-Time',
    guestName: 'Aisha Patel',
    guestTitle: 'Founder',
    company: 'DataPulse',
    revenue: '$3M ARR',
    contentType: 'Written',
    category: 'story',
    tags: ['Developer Tools', 'Side Project', 'Bootstrapped'],
    duration: '8 min read',
    date: 'Jan 28, 2026',
    excerpt: 'Aisha built DataPulse in nights and weekends while working at Google, growing it to $3M ARR before going full-time.',
    content: `For three years, I led a double life. By day, I was a senior engineer at Google. By night, I was building DataPulse — a developer analytics tool that would eventually replace my day job income 10x over.\n\nThe secret? I didn't try to boil the ocean. DataPulse started as a simple dashboard I built for myself to track API performance across microservices.\n\n## The Accidental Product\n\nI shared a screenshot on Twitter. 47 DMs asking "can I use this?" Within a week, I had a Stripe checkout page and 12 paying customers at $29/month.\n\n> "The best products are the ones you build for yourself first."\n\nGrowth was slow but steady. No viral moments, no Product Hunt launches. Just consistent shipping and listening to customers. Month 18: $50K ARR. Month 24: $500K ARR. Month 36: $3M ARR.\n\n## When I Finally Quit Google\n\nI quit Google when DataPulse hit $1.5M ARR — and even then, it felt terrifying. Golden handcuffs are real. But looking back, I should have quit at $500K.`,
    takeaways: [
      'Build for yourself first — the best products solve your own problems',
      'Consistent shipping beats viral launches every time',
      'Don\'t wait too long to go full-time on your side project'
    ],
    guestBio: 'Aisha Patel is the founder of DataPulse, a developer analytics platform used by 2,000+ engineering teams. She previously spent 6 years as a senior engineer at Google.',
    guestLinkedin: '#', guestTwitter: '#', guestWebsite: '#',
  },
  {
    id: '4',
    slug: 'building-africas-largest-marketplace',
    title: 'Building Africa\'s Largest Marketplace on $50K',
    guestName: 'James Okafor',
    guestTitle: 'Co-Founder & CEO',
    company: 'TradeFlow',
    revenue: '$1.2M ARR',
    contentType: 'Podcast',
    category: 'story',
    tags: ['Marketplace', 'Africa', 'E-commerce'],
    duration: '35 min',
    date: 'Jan 20, 2026',
    excerpt: 'James built TradeFlow across 12 African countries with just $50K in initial capital, proving that constraint breeds creativity.',
    content: `Everyone told me building a marketplace in Africa was a bad idea. Too many languages, too many currencies, not enough internet penetration. They were right about the challenges — and wrong about the conclusion.\n\nTradeFlow started in Lagos with $50K from personal savings and a small family loan. Today, we operate in 12 countries with 200,000 active merchants.\n\n## The $50K Strategy\n\nWe didn't try to build a platform. We started with WhatsApp groups. Seriously. Our first "marketplace" was a network of WhatsApp groups connecting suppliers with retailers. The technology was a Google Sheet.\n\n> "Your MVP doesn't need to be an app. It needs to solve a problem."\n\nThe app came 8 months later, after we understood exactly what merchants needed. By then, we had 5,000 active users who were already transacting through our WhatsApp system.`,
    takeaways: [
      'Start with the simplest possible solution — even WhatsApp groups',
      'Constraints force creative solutions that well-funded competitors miss',
      'Understand your market before building technology'
    ],
    timestamps: [
      { time: '00:00', label: 'Growing up in Lagos' },
      { time: '08:00', label: 'The WhatsApp MVP' },
      { time: '16:30', label: 'Expanding to 12 countries' },
      { time: '25:00', label: 'Fundraising in Africa' },
      { time: '30:00', label: 'What\'s next for TradeFlow' },
    ],
    guestBio: 'James Okafor is the co-founder and CEO of TradeFlow, a B2B marketplace operating across 12 African countries. He was named in Forbes Africa 30 Under 30.',
    guestLinkedin: '#', guestWebsite: '#',
  },
  {
    id: '5',
    slug: 'how-stripes-pm-team-prioritizes',
    title: 'How Stripe\'s PM Team Actually Prioritizes',
    guestName: 'Elena Volkov',
    guestTitle: 'Senior Product Manager',
    company: 'Stripe',
    revenue: 'N/A',
    contentType: 'Written',
    category: 'playbook',
    tags: ['Product Management', 'Framework', 'Scale-up'],
    duration: '12 min read',
    date: 'Jan 15, 2026',
    excerpt: 'Elena reveals the exact prioritization framework used by Stripe\'s PM team — and why most prioritization frameworks fail.',
    content: `I've been a PM at Stripe for 4 years, and the #1 question I get from other PMs is: "How do you prioritize at Stripe?"\n\nThe honest answer is: it's messy. But it's deliberately messy.\n\n## Why RICE and ICE Don't Work\n\nMost prioritization frameworks try to turn subjective decisions into math. RICE scores, ICE scores, weighted matrices — they all suffer from the same problem: garbage in, garbage out.\n\nAt Stripe, we don't use scoring frameworks. Instead, we use a principle-based approach.\n\n> "Prioritization isn't about finding the mathematically optimal sequence. It's about making bets you can defend with conviction."\n\n## The Stripe Prioritization Principles\n\n**Principle 1: Start with user pain, not business value.** Revenue impact is the output of great products, not the input to prioritization.\n\n**Principle 2: Sequence for learning.** Ship the thing that teaches you the most about the problem first.\n\n**Principle 3: Default to reversible decisions.** If you can undo it easily, just ship it and see what happens.`,
    takeaways: [
      'Scoring frameworks create false precision — use principles instead',
      'Prioritize for learning velocity, not just business impact',
      'Reversible decisions should be made fast; irreversible ones deserve deliberation'
    ],
    guestBio: 'Elena Volkov is a Senior Product Manager at Stripe, where she leads the Payments Platform team. She previously held PM roles at Airbnb and Microsoft.',
    guestLinkedin: '#', guestTwitter: '#',
  },
  {
    id: '6',
    slug: 'ai-agent-stack-replaced-workflows',
    title: 'The AI Agent Stack That Replaced 3 of Our Workflows',
    guestName: 'David Kim',
    guestTitle: 'CTO & Co-Founder',
    company: 'AutoScale',
    revenue: '$500K ARR',
    contentType: 'Video',
    category: 'story',
    tags: ['AI', 'Automation', 'SaaS'],
    duration: '31 min',
    date: 'Jan 8, 2026',
    excerpt: 'David shares the exact AI agent architecture that automated customer onboarding, support triage, and reporting at AutoScale.',
    content: `Last year, we had 3 full-time people handling customer onboarding, support ticket triage, and weekly reporting. Today, AI agents handle 80% of that work.\n\nI'm not talking about chatbots. I'm talking about autonomous agents that actually do work — create accounts, classify tickets, generate reports, and escalate edge cases to humans.\n\n## The Architecture\n\nOur stack is surprisingly simple: GPT-4 for reasoning, LangChain for orchestration, Pinecone for vector search, and a custom action layer that connects to our APIs.\n\n> "The secret to AI agents isn't the AI — it's the guardrails. 90% of our code is error handling and edge case management."\n\n## The Results\n\nOnboarding time dropped from 48 hours to 12 minutes. Support ticket first-response time went from 4 hours to 30 seconds. Weekly reports that took 6 hours now generate in 3 minutes.\n\nBut here's the thing nobody talks about: it took us 4 months and $150K in development costs to get there. AI agents aren't plug-and-play.`,
    takeaways: [
      'AI agents work best for structured, repeatable workflows with clear success criteria',
      'Invest 90% of your effort in guardrails and error handling, not the AI itself',
      'Expect 3-6 months of iteration before AI agents are production-ready'
    ],
    timestamps: [
      { time: '00:00', label: 'The before: manual workflows' },
      { time: '07:00', label: 'Choosing the AI stack' },
      { time: '14:30', label: 'Building the agent architecture' },
      { time: '21:00', label: 'The 4-month iteration cycle' },
      { time: '26:00', label: 'Results and ROI breakdown' },
      { time: '29:00', label: 'Advice for AI implementation' },
    ],
    guestBio: 'David Kim is the CTO and co-founder of AutoScale, a workflow automation platform. He previously led engineering teams at Datadog and Segment.',
    guestLinkedin: '#', guestTwitter: '#', guestWebsite: '#',
  },
  {
    id: '7',
    slug: 'growth-playbook-0-to-10k-users',
    title: 'The Growth Playbook: 0 to 10K Users in 90 Days',
    guestName: 'Nina Sharma',
    guestTitle: 'Head of Growth',
    company: 'ScaleUp Labs',
    revenue: 'N/A',
    contentType: 'Written',
    category: 'playbook',
    tags: ['Growth', 'Marketing', 'B2B'],
    duration: '15 min read',
    date: 'Jan 2, 2026',
    excerpt: 'Nina shares the exact channel-by-channel playbook she used to grow three B2B SaaS products from 0 to 10K users.',
    content: `I've taken three B2B products from zero to 10,000 users. Each time, the playbook was different — but the principles were the same.\n\nHere's the framework I use, channel by channel, with the exact tactics and metrics.\n\n## The 90-Day Framework\n\n**Days 1-30: Foundation.** Set up analytics, define your ICP, create 10 pieces of cornerstone content, and start 50 conversations per week with potential users.\n\n**Days 31-60: Channel Testing.** Run small experiments across 5 channels simultaneously. Spend $500 max per channel. Measure CAC and activation rate, not vanity metrics.\n\n**Days 61-90: Double Down.** Kill the 3 worst-performing channels. Pour all resources into the 2 winners. Optimize for LTV, not just acquisition.`,
    takeaways: [
      'Test 5 channels simultaneously with small budgets before committing',
      'Focus on activation rate and CAC in the first 90 days, not revenue',
      'Kill underperforming channels fast — sunk cost fallacy kills growth teams'
    ],
    guestBio: 'Nina Sharma is the Head of Growth at ScaleUp Labs and a growth advisor to 15+ B2B SaaS startups.',
    guestLinkedin: '#',
  },
  {
    id: '8',
    slug: 'complete-guide-to-fundraising',
    title: 'The Complete Guide to Raising Your First Round',
    guestName: 'Horizon Launchpad',
    guestTitle: 'Editorial Team',
    company: 'Horizon Launchpad',
    revenue: 'N/A',
    contentType: 'Written',
    category: 'guide',
    tags: ['Fundraising', 'Beginners', 'Strategy'],
    duration: '20 min read',
    date: 'Dec 20, 2025',
    excerpt: 'Everything you need to know about raising your first round of funding — from pitch deck to term sheet.',
    content: `Fundraising is one of the most misunderstood aspects of building a startup. This guide breaks down every step of raising your first round.\n\n## Before You Start\n\nBefore reaching out to a single investor, answer these three questions honestly:\n1. Do you actually need external funding?\n2. Can you demonstrate traction or a clear path to revenue?\n3. Are you willing to give up control for capital?\n\nIf you answered "no" to #2, you're not ready. Go build more.`,
    takeaways: [
      'Don\'t fundraise until you have clear traction or revenue',
      'Your pitch deck should tell a story, not list features',
      'Term sheets are negotiable — always get legal counsel'
    ],
    guestBio: 'This guide was written by the Horizon Launchpad editorial team based on interviews with 50+ founders and 20+ VCs.',
  },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: '1',
    episodeNumber: 47,
    title: 'Sarah Chen — $0 to $10M ARR Without VC Money',
    guestName: 'Sarah Chen',
    duration: '38 min',
    date: 'Feb 12, 2026',
    description: 'Sarah Chen bootstrapped TechCo from her apartment to $10M ARR. We dive deep into her unconventional growth strategy.',
  },
  {
    id: '2',
    episodeNumber: 46,
    title: 'Marcus Rivera — The $2M Mistake Nobody Warned Me About',
    guestName: 'Marcus Rivera',
    duration: '42 min',
    date: 'Feb 5, 2026',
    description: 'Marcus raised $2M, hired fast, and watched NovaPay collapse. The most honest failure post-mortem on the show.',
  },
  {
    id: '3',
    episodeNumber: 45,
    title: 'James Okafor — Building a Marketplace Across 12 African Countries',
    guestName: 'James Okafor',
    duration: '35 min',
    date: 'Jan 20, 2026',
    description: 'James built TradeFlow across 12 African countries with just $50K. A masterclass in constraint-driven innovation.',
  },
  {
    id: '4',
    episodeNumber: 44,
    title: 'David Kim — Why We Replaced 3 Humans With AI Agents',
    guestName: 'David Kim',
    duration: '31 min',
    date: 'Jan 8, 2026',
    description: 'David shares the exact AI agent architecture that automated three critical workflows at AutoScale.',
  },
  {
    id: '5',
    episodeNumber: 43,
    title: 'Nina Sharma — The 90-Day Growth Playbook',
    guestName: 'Nina Sharma',
    duration: '29 min',
    date: 'Dec 28, 2025',
    description: 'Nina breaks down her channel-by-channel growth framework for taking B2B products from 0 to 10K users.',
  },
];

export const guests: Guest[] = [
  { id: '1', name: 'Sarah Chen', company: 'TechCo', title: 'Founder & CEO', revenue: '$10M ARR', industry: 'Healthcare', storySlug: 'bootstrapped-healthcare-saas-10m-arr', quote: 'The best marketing is telling the truth about broken systems.' },
  { id: '2', name: 'Marcus Rivera', company: 'NovaPay', title: 'Former CEO', revenue: '$0 (Failed)', industry: 'Fintech', storySlug: 'burned-through-2m-in-18-months', quote: 'Founder ego is the silent killer of startups.' },
  { id: '3', name: 'Aisha Patel', company: 'DataPulse', title: 'Founder', revenue: '$3M ARR', industry: 'Developer Tools', storySlug: 'side-project-to-3m-arr', quote: 'The best products solve your own problems first.' },
  { id: '4', name: 'James Okafor', company: 'TradeFlow', title: 'Co-Founder & CEO', revenue: '$1.2M ARR', industry: 'E-commerce', storySlug: 'building-africas-largest-marketplace', quote: 'Your MVP doesn\'t need to be an app. It needs to solve a problem.' },
  { id: '5', name: 'Elena Volkov', company: 'Stripe', title: 'Senior Product Manager', revenue: 'N/A', industry: 'Fintech', storySlug: 'how-stripes-pm-team-prioritizes', quote: 'Prioritization is about making bets you can defend with conviction.' },
  { id: '6', name: 'David Kim', company: 'AutoScale', title: 'CTO & Co-Founder', revenue: '$500K ARR', industry: 'AI & Automation', storySlug: 'ai-agent-stack-replaced-workflows', quote: 'The secret to AI agents is the guardrails, not the AI.' },
  { id: '7', name: 'Nina Sharma', company: 'ScaleUp Labs', title: 'Head of Growth', revenue: 'N/A', industry: 'Growth', storySlug: 'growth-playbook-0-to-10k-users', quote: 'Kill underperforming channels fast.' },
];

export const topics = [
  { name: 'SaaS', count: 18, description: 'Software-as-a-service businesses, metrics, and strategies' },
  { name: 'E-commerce', count: 12, description: 'Online retail, marketplaces, and D2C brands' },
  { name: 'AI & Automation', count: 15, description: 'Applied AI, agents, and workflow automation' },
  { name: 'Bootstrapped', count: 14, description: 'Self-funded startups and profitable growth' },
  { name: 'Funded', count: 9, description: 'VC-backed startups and fundraising stories' },
  { name: 'B2B', count: 11, description: 'Business-to-business products and strategies' },
  { name: 'B2C', count: 7, description: 'Consumer products and growth tactics' },
  { name: 'Marketplace', count: 6, description: 'Two-sided platforms and network effects' },
  { name: 'Fintech', count: 8, description: 'Financial technology and payments' },
  { name: 'Healthcare', count: 5, description: 'Health tech, digital health, and medical SaaS' },
  { name: 'Creator Economy', count: 4, description: 'Tools and platforms for creators' },
  { name: 'Developer Tools', count: 10, description: 'Dev tools, APIs, and infrastructure' },
  { name: 'Product Management', count: 6, description: 'PM frameworks, prioritization, and strategy' },
  { name: 'Growth', count: 13, description: 'Growth marketing, acquisition, and retention' },
  { name: 'Failure', count: 8, description: 'Post-mortems, lessons learned, and pivots' },
];

export const newsletterEditions = [
  { id: '1', title: 'The Revenue Transparency Playbook', date: 'Feb 10, 2026', preview: 'Why the best founder stories include real numbers — and what that means for your startup.' },
  { id: '2', title: 'Why 90% of AI Startups Will Fail', date: 'Feb 3, 2026', preview: 'The uncomfortable truth about AI product-market fit and what separates winners from the hype.' },
  { id: '3', title: 'The Bootstrapper\'s Unfair Advantage', date: 'Jan 27, 2026', preview: 'How constraint-driven founders consistently outperform their VC-backed competitors.' },
  { id: '4', title: 'Hiring Before Product-Market Fit', date: 'Jan 20, 2026', preview: 'The most expensive mistake in startup history — and how to avoid it.' },
  { id: '5', title: 'The Side Project Playbook', date: 'Jan 13, 2026', preview: 'A tactical guide to building a revenue-generating side project while keeping your day job.' },
];
