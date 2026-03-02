import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import type { Story } from '@/data/sampleData';

interface StoryCardProps {
  story: Story;
  accentColor?: string;
}

export default function StoryCard({ story, accentColor }: StoryCardProps) {
  const badgeClass = story.contentType === 'Video'
    ? 'bg-primary/20 text-primary'
    : story.contentType === 'Podcast'
    ? 'bg-purple-500/20 text-purple-400'
    : 'bg-muted text-muted-foreground';

  return (
    <Link to={`/stories/${story.slug}`} className="group block">
      <div className="rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-card to-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground/30 text-sm font-medium">{story.company}</span>
          </div>
          {story.contentType === 'Video' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
              </div>
            </div>
          )}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
            {story.contentType}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-foreground">{story.guestName}</span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="text-xs text-muted-foreground">{story.company}</span>
          </div>
          <h3 className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {story.title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            {story.revenue !== 'N/A' && (
              <span className="text-xs font-bold text-accent">{story.revenue}</span>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Clock className="w-3 h-3" />
              {story.duration}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {story.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
