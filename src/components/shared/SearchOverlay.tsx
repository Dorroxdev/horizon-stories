import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { stories, guests } from '@/data/sampleData';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const q = query.toLowerCase();
  const filteredStories = q ? stories.filter(s => s.title.toLowerCase().includes(q) || s.guestName.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q))).slice(0, 5) : [];
  const filteredGuests = q ? guests.filter(g => g.name.toLowerCase().includes(q) || g.company.toLowerCase().includes(q)).slice(0, 3) : [];

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="container mx-auto max-w-2xl px-4 pt-[15vh]" onClick={e => e.stopPropagation()}>
        <div className="glass-strong rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search stories, guests, topics..."
              className="flex-1 bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground"
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          {q && (
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredStories.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">Stories</p>
                  {filteredStories.map(s => (
                    <button key={s.id} onClick={() => handleSelect(`/stories/${s.slug}`)} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.guestName} · {s.company}</p>
                      </div>
                      {s.revenue !== 'N/A' && <span className="text-xs font-semibold text-accent">{s.revenue}</span>}
                    </button>
                  ))}
                </div>
              )}
              {filteredGuests.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">Guests</p>
                  {filteredGuests.map(g => (
                    <button key={g.id} onClick={() => handleSelect(`/stories/${g.storySlug}`)} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="text-xs text-muted-foreground">{g.title} at {g.company}</p>
                    </button>
                  ))}
                </div>
              )}
              {filteredStories.length === 0 && filteredGuests.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No results for "{query}"</p>
              )}
            </div>
          )}

          {!q && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Start typing to search across all content
            </div>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}
