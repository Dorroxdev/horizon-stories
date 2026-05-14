export type ResourceCategory = 'toolkit' | 'guide' | 'playbook' | 'template' | 'checklist';

export interface ResourceItem {
  title: string;
  desc: string;
}

export interface AudienceSegment {
  title: string;
  desc: string;
}

export interface Resource {
  slug: string;
  title: string;
  category: ResourceCategory;
  tagline: string;
  description: string;
  headline: string;
  subheadline: string;
  problem: {
    stat: string;
    text: string;
    detail: string;
  };
  whatsInside: ResourceItem[];
  whoIsFor: AudienceSegment[];
  socialProof: string;
  downloadUrl?: string;
}

export const resources: Resource[] = [
  {
    slug: 'saas-validation-toolkit',
    title: 'SaaS Validation Toolkit',
    category: 'toolkit',
    tagline: 'Validate any idea in 30 days. No code required',
    description:
      '7 fill-in-the-blank templates for a data-backed GO or NO-GO decision.',
    headline: 'Validate Any SaaS Idea in 30 Days Without Writing Code',
    subheadline:
      '7 fill-in-the-blank templates that take a SaaS idea from "I think this could work" to a data-backed GO or NO-GO decision. No coding. No guessing.',
    problem: {
      stat: '60%',
      text: 'of SaaS products fail because nobody validated the idea first.',
      detail:
        "Not because the code was bad. Not because the market was too crowded. Because the founder skipped the part where real people confirm the problem is worth solving, and that they'd actually pay for a solution.",
    },
    whatsInside: [
      {
        title: 'Problem Definition Canvas',
        desc: 'Nail the problem statement before talking to anyone',
      },
      {
        title: 'Customer Interview Script',
        desc: '11 questions based on The Mom Test that reveal real pain',
      },
      {
        title: 'Competitor Analysis Matrix',
        desc: 'Map direct competitors, indirect solutions, and DIY workarounds',
      },
      {
        title: 'Market Sizing Worksheet',
        desc: 'Bottom-up TAM calculation that actually means something',
      },
      {
        title: 'Landing Page Validation Checklist',
        desc: 'Test demand with a $150 budget and zero code',
      },
      {
        title: 'Smoke Test Tracker',
        desc: 'Track waitlist signups, pre-sales, and conversion rates',
      },
      {
        title: 'Go/No-Go Scorecard',
        desc: 'A 7-category scoring framework that forces an honest decision',
      },
    ],
    whoIsFor: [
      {
        title: 'First-time founders',
        desc: 'Evaluating a SaaS idea for the first time',
      },
      {
        title: 'Technical builders',
        desc: 'Want market proof before writing code',
      },
      {
        title: 'Side-project operators',
        desc: 'Testing whether to go full-time',
      },
      {
        title: 'Serial founders',
        desc: 'Want a repeatable validation process',
      },
    ],
    socialProof:
      'Built by Altan Doyran, operator, product builder, and founder of Horizon Launchpad. Based on patterns from dozens of founder conversations and real validation cycles.',
    downloadUrl:
      'https://drive.google.com/uc?export=download&id=1uT19nq1z4X-DJ2Njmx6mD5xogGBcoUu1',
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export const categoryLabels: Record<ResourceCategory, string> = {
  toolkit: 'Toolkit',
  guide: 'Guide',
  playbook: 'Playbook',
  template: 'Template',
  checklist: 'Checklist',
};
