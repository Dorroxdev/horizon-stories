import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Youtube, Play, Search, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { podcastEpisodes } from '@/data/sampleData';

export default function PodcastPage() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const featured = podcastEpisodes[0];

  const filtered = search
    ? podcastEpisodes.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.guestName.toLowerCase().includes(search.toLowerCase()))
    : podcastEpisodes;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-primary/30 to-nessie/20 flex items-center justify-center shrink-0 border border-border">
          <Music className="w-16 h-16 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">Horizon Launchpad Podcast</h1>
          <p className="text-muted-foreground mb-4 max-w-xl">In-depth conversations with founders who share their real numbers, real failures, and real strategies. New episodes every Tuesday & Thursday.</p>
          <p className="text-sm text-muted-foreground mb-4">{podcastEpisodes.length} episodes</p>
          <div className="flex flex-wrap gap-3">
            {['Spotify', 'Apple Podcasts', 'YouTube', 'Amazon Music'].map(p => (
              <a key={p} href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors text-sm text-muted-foreground hover:text-foreground">
                {p === 'YouTube' ? <Youtube className="w-4 h-4" /> : <Music className="w-4 h-4" />} {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="rounded-xl border border-border bg-card p-6 mb-12">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Latest Episode</span>
        <h2 className="font-display font-bold text-xl mt-2 mb-2">EP {featured.episodeNumber}: {featured.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{featured.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.duration}</span>
          <span>{featured.date}</span>
        </div>
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-0 bg-primary rounded-full" />
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search episodes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
      </div>

      {/* Episodes List */}
      <div className="space-y-2">
        {filtered.map(ep => (
          <div key={ep.id} className="rounded-xl border border-border bg-card hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-4 p-4">
              <button className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                <Play className="w-4 h-4 text-primary ml-0.5" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">EP {ep.episodeNumber}: {ep.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{ep.guestName} · {ep.duration} · {ep.date}</p>
              </div>
              <button onClick={() => setExpandedId(expandedId === ep.id ? null : ep.id)} className="text-muted-foreground hover:text-foreground shrink-0">
                {expandedId === ep.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            {expandedId === ep.id && (
              <div className="px-4 pb-4 border-t border-border pt-3">
                <p className="text-sm text-muted-foreground mb-3">{ep.description}</p>
                <Button variant="ghost" size="sm" className="text-primary">Read Transcript</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
