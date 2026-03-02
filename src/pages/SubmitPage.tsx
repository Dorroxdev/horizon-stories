import { useState } from 'react';
import { Mic, FileText, Send, CheckCircle, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export default function SubmitPage() {
  const [track, setTrack] = useState<'interview' | 'written' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', website: '', role: '', stage: '', story: '', source: '', linkedin: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.story) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({ title: 'Please enter a valid email', variant: 'destructive' });
      return;
    }
    toast({ title: 'Story submitted!', description: 'We\'ll review your submission and get back to you within 5 business days.' });
    setFormData({ name: '', email: '', company: '', website: '', role: '', stage: '', story: '', source: '', linkedin: '' });
    setTrack(null);
  };

  const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 max-w-3xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">Share Your Story</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Built something? Failed at something? Learned something worth sharing? We want to hear from you.</p>
      </div>

      {/* Track Selection */}
      {!track && (
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <button onClick={() => setTrack('interview')} className="rounded-xl border border-border bg-card p-8 text-center hover:border-primary/30 transition-all hover:-translate-y-0.5">
            <Mic className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-semibold text-lg mb-2">I want to be interviewed</h3>
            <p className="text-sm text-muted-foreground">For video/podcast interview requests</p>
          </button>
          <button onClick={() => setTrack('written')} className="rounded-xl border border-border bg-card p-8 text-center hover:border-primary/30 transition-all hover:-translate-y-0.5">
            <FileText className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-semibold text-lg mb-2">I want to submit a written story</h3>
            <p className="text-sm text-muted-foreground">For async written case studies</p>
          </button>
        </div>
      )}

      {/* Form */}
      {track && (
        <div>
          <button onClick={() => setTrack(null)} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">← Back to options</button>
          <h2 className="font-display font-bold text-2xl mb-6">{track === 'interview' ? 'Interview Request' : 'Written Story Submission'}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Name *</label><Input value={formData.name} onChange={e => update('name', e.target.value)} className="bg-card border-border" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Email *</label><Input type="email" value={formData.email} onChange={e => update('email', e.target.value)} className="bg-card border-border" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Company</label><Input value={formData.company} onChange={e => update('company', e.target.value)} className="bg-card border-border" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Website</label><Input value={formData.website} onChange={e => update('website', e.target.value)} className="bg-card border-border" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-1.5 block">Role / Title</label><Input value={formData.role} onChange={e => update('role', e.target.value)} className="bg-card border-border" /></div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Company Stage</label>
                <Select value={formData.stage} onValueChange={v => update('stage', v)}>
                  <SelectTrigger className="bg-card border-border"><SelectValue placeholder="Select stage" /></SelectTrigger>
                  <SelectContent>
                    {['Pre-revenue', '$0-$100K', '$100K-$1M', '$1M-$10M', '$10M+'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><label className="text-sm font-medium mb-1.5 block">Brief description of your story *</label><Textarea value={formData.story} onChange={e => update('story', e.target.value)} rows={5} className="bg-card border-border" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">LinkedIn profile URL</label><Input value={formData.linkedin} onChange={e => update('linkedin', e.target.value)} className="bg-card border-border" /></div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">How did you hear about us?</label>
              <Select value={formData.source} onValueChange={v => update('source', v)}>
                <SelectTrigger className="bg-card border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {['Social media', 'Podcast', 'Friend/colleague', 'Search engine', 'Other'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" /> Submit Your Story
            </Button>
            <p className="text-xs text-muted-foreground">We review every submission. You'll hear back within 5 business days.</p>
          </form>
        </div>
      )}

      {/* What to Expect */}
      <div className="mt-16">
        <h2 className="font-display font-bold text-2xl mb-8">What to Expect</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Send, step: '1', title: 'Submit', desc: 'Fill out the form with your story details' },
            { icon: Search, step: '2', title: 'We Review', desc: 'Our team reviews every submission within 5 days' },
            { icon: Calendar, step: '3', title: 'Interview Scheduled', desc: 'We\'ll reach out to schedule your episode' },
          ].map(s => (
            <div key={s.step} className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mx-auto mb-3">{s.step}</div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
