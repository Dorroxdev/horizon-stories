import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { stories } from '@/data/sampleData';
import StoryCard from '@/components/shared/StoryCard';
import type { Story } from '@/data/sampleData';

interface ContentListingProps {
  title: string;
  subtitle: string;
  filterCategory?: Story['category'];
  accentColor?: string;
}

const typeFilters = ['All', 'Video', 'Podcast', 'Written'];

export default function ContentListing({ title, subtitle, filterCategory, accentColor }: ContentListingProps) {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filtered = useMemo(() => {
    let items = filterCategory ? stories.filter(s => s.category === filterCategory) : stories;
    if (activeType !== 'All') items = items.filter(s => s.contentType === activeType);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s => s.title.toLowerCase().includes(q) || s.guestName.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q)));
    }
    return items;
  }, [filterCategory, activeType, search]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">{title}</h1>
        <p className="text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 sticky top-16 z-10 py-3 -mt-3 bg-background/80 backdrop-blur-md">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {typeFilters.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${activeType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => <StoryCard key={s.id} story={s} accentColor={accentColor} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No results found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
