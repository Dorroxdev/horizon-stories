export type PillarSlug =
  | 'founder-stories'
  | 'expert-playbooks'
  | 'ai-strategy'
  | 'failure-post-mortems'
  | 'guides-frameworks';

export interface PillarMeta {
  slug: PillarSlug;
  label: string;
  description: string;
  accentClass: string;
}

export const pillars: Record<PillarSlug, PillarMeta> = {
  'founder-stories':       { slug: 'founder-stories',       label: 'Founder Stories',       description: 'In-depth profiles and case studies from founders building in the open.',                 accentClass: 'bg-primary/15 text-primary border-primary/30' },
  'expert-playbooks':      { slug: 'expert-playbooks',      label: 'Expert Playbooks',      description: 'Operator frameworks and how-to deep-dives.',                                                 accentClass: 'bg-nessie/15 text-nessie border-nessie/30' },
  'ai-strategy':           { slug: 'ai-strategy',           label: 'AI Strategy',           description: 'Where AI actually adds leverage for builders — and where it doesn\'t.',                       accentClass: 'bg-accent/15 text-accent border-accent/30' },
  'failure-post-mortems':  { slug: 'failure-post-mortems',  label: 'Failure Post-Mortems',  description: 'Honest narratives of what broke, why, and what was learned.',                                accentClass: 'bg-destructive/15 text-destructive border-destructive/30' },
  'guides-frameworks':     { slug: 'guides-frameworks',     label: 'Guides & Frameworks',   description: 'Practical templates and decision frameworks.',                                                 accentClass: 'bg-muted text-muted-foreground border-muted-foreground/30' },
};

export const pillarSlugs = Object.keys(pillars) as PillarSlug[];
