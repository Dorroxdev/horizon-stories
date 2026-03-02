import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Stories', path: '/stories' },
  { label: 'Failures', path: '/failures' },
  { label: 'Playbooks', path: '/playbooks' },
  { label: 'Guides', path: '/guides' },
  { label: 'Podcast', path: '/podcast' },
  { label: 'Newsletter', path: '/newsletter' },
];

interface NavbarProps {
  onSearchOpen: () => void;
  onSubscribeOpen: () => void;
}

export default function Navbar({ onSearchOpen, onSubscribeOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
          <Rocket className="w-5 h-5 text-primary" />
          <span>Horizon Launchpad</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onSearchOpen} aria-label="Search">
            <Search className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={onSubscribeOpen} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Subscribe
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onSearchOpen} aria-label="Search">
            <Search className="w-4 h-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-background border-border">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.path}>
                    <Link
                      to={link.path}
                      className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button onClick={onSubscribeOpen} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Subscribe
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
