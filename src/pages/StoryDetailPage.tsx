import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Link as LinkIcon, Play, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { stories } from '@/data/sampleData';
import StoryCard from '@/components/shared/StoryCard';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function StoryDetailPage() {
  const { slug } = useParams();
  const story = stories.find(s => s.slug === slug);
  const [email, setEmail] = useState('');

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Story not found</h1>
        <Button asChild variant="outline"><Link to="/stories">Back to Stories</Link></Button>
      </div>
    );
  }

  const related = stories.filter(s => s.id !== story.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied!' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { toast({ title: 'Enter a valid email', variant: 'destructive' }); return; }
    toast({ title: 'Subscribed!' });
    setEmail('');
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link to="/stories" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Stories
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-muted flex items-center justify-center font-bold text-foreground/70">
              {story.guestName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold">{story.guestName}</p>
              <p className="text-sm text-muted-foreground">{story.guestTitle}, {story.company}</p>
            </div>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6">{story.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {story.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {story.duration}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${story.contentType === 'Video' ? 'bg-primary/20 text-primary' : story.contentType === 'Podcast' ? 'bg-purple-500/20 text-purple-400' : 'bg-muted'}`}>
              {story.contentType}
            </span>
            {story.revenue !== 'N/A' && <span className="font-bold text-accent">{story.revenue}</span>}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {story.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>)}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}><LinkIcon className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Twitter className="w-4 h-4" /></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Linkedin className="w-4 h-4" /></a></Button>
          </div>
        </div>
      </section>

      {/* Video embed placeholder */}
      {story.contentType === 'Video' && (
        <section className="container mx-auto px-4 lg:px-8 max-w-4xl -mt-4 mb-12">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-card to-muted border border-border overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 lg:px-8 max-w-3xl pb-16">
        <div className="prose prose-invert max-w-none">
          {story.content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) return <h2 key={i} className="font-display font-bold text-2xl mt-10 mb-4">{block.replace('## ', '')}</h2>;
            if (block.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary pl-4 my-8 text-lg italic text-muted-foreground">{block.replace('> ', '').replace(/"/g, '')}</blockquote>;
            if (block.startsWith('**')) return <p key={i} className="text-foreground/90 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
            return <p key={i} className="text-foreground/90 leading-relaxed mb-4">{block}</p>;
          })}
        </div>

        {/* Timestamps */}
        {story.timestamps && (
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Chapters</h3>
            <div className="space-y-2">
              {story.timestamps.map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-sm py-1.5 hover:bg-muted/50 rounded px-2 -mx-2 cursor-pointer transition-colors">
                  <span className="text-primary font-mono text-xs w-12">{t.time}</span>
                  <span className="text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Takeaways */}
        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Key Takeaways</h3>
          <ul className="space-y-3">
            {story.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Guest Bio */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-muted flex items-center justify-center text-xl font-bold text-foreground/70">
              {story.guestName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-display font-semibold text-lg">{story.guestName}</p>
              <p className="text-sm text-muted-foreground">{story.guestTitle}, {story.company}</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 mb-4">{story.guestBio}</p>
          <div className="flex gap-2">
            {story.guestLinkedin && <Button variant="ghost" size="sm" asChild><a href={story.guestLinkedin}><Linkedin className="w-4 h-4 mr-1" /> LinkedIn</a></Button>}
            {story.guestTwitter && <Button variant="ghost" size="sm" asChild><a href={story.guestTwitter}><Twitter className="w-4 h-4 mr-1" /> Twitter</a></Button>}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
          <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-display font-semibold text-lg mb-2">Enjoyed this story?</h3>
          <p className="text-sm text-muted-foreground mb-4">Get more like it weekly.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
            <Input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-muted/50 border-border" />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">Subscribe</Button>
          </form>
        </div>
      </article>

      {/* Related */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <h2 className="font-display font-bold text-2xl mb-8">You might also enjoy</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map(s => <StoryCard key={s.id} story={s} />)}
        </div>
      </section>
    </div>
  );
}
