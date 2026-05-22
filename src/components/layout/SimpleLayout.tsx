import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
            {/* RSS footer link hidden while POSTS_HIDDEN is true (2026-05-22).
                Restore by re-adding the <a href="/feed.xml"> block with the
                Rss icon from lucide-react. Tied to the posts surface kill
                switch in src/data/site-flags.ts. */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Horizon Launchpad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
