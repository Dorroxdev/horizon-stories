import { Link } from 'react-router-dom';
import { Rocket, Youtube, Music, Linkedin, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Stories', path: '/stories' },
    { label: 'Failures', path: '/failures' },
    { label: 'Playbooks', path: '/playbooks' },
    { label: 'Guides', path: '/guides' },
    { label: 'Podcast', path: '/podcast' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Our Guests', path: '/guests' },
    { label: 'Submit Your Story', path: '/submit' },
    { label: 'Topics', path: '/topics' },
    { label: 'Newsletter', path: '/newsletter' },
  ],
};

const socialLinks = [
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Music, label: 'Spotify', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <Rocket className="w-5 h-5 text-primary" />
              <span>Horizon Launchpad</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Real stories from founders, failures, and the people building the future.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors" aria-label={s.label}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Horizon Launchpad. All rights reserved.</p>
          <p className="italic">Made with substance, not fluff.</p>
        </div>
      </div>
    </footer>
  );
}
