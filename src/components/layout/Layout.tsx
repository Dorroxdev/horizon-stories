import { useState, useEffect, ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchOverlay from '@/components/shared/SearchOverlay';
import NewsletterModal from '@/components/shared/NewsletterModal';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchOpen={() => setSearchOpen(true)} onSubscribeOpen={() => setSubscribeOpen(true)} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NewsletterModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </div>
  );
}
