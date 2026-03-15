import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { guests } from '@/data/sampleData';

export default function GuestsPage() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? guests.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.company.toLowerCase().includes(search.toLowerCase()))
    : guests;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">Our Guests</h1>
        <p className="text-muted-foreground">The founders, operators, and experts who shared their stories.</p>
      </div>

      <div className="relative w-full sm:w-72 mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search guests..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(g => (
          <Link to={`/stories/${g.storySlug}`} key={g.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all hover:-translate-y-0.5 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center text-lg font-bold text-foreground/70 mx-auto mb-3">
              {g.name.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="font-semibold text-sm">{g.name}</p>
            <p className="text-xs text-muted-foreground mb-2">{g.title}, {g.company}</p>
            {g.revenue !== 'N/A' && <span className="text-xs font-bold text-accent">{g.revenue}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
