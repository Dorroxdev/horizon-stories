import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Rss } from 'lucide-react';
import SimpleNavbar from './SimpleNavbar';

interface SimpleLayoutProps {
  children: ReactNode;
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleNavbar />
      <main className="flex-1 pt-16">{children}</main>
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-sm">
              <img src="/logo-nav.svg" alt="Horizon Launchpad" className="w-4 h-7" />
              <span>Horizon Launchpad</span>
            </Link>
            <div className="flex items-center gap-6">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Subscribe to the RSS feed"
              >
                <Rss className="w-4 h-4" aria-hidden="true" />
                <span>RSS</span>
              </a>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Horizon Launchpad. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
