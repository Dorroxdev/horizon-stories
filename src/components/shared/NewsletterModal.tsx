import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({ title: 'Please enter a valid email', variant: 'destructive' });
      return;
    }
    toast({ title: 'You\'re subscribed!', description: 'Welcome to Horizon Launchpad.' });
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-strong rounded-2xl shadow-2xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-bold text-xl">Stay in the loop</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Weekly deep-dives, failure lessons, and frameworks from real operators. Free.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-muted/50 border-border"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">Join 2,500+ founders. No spam.</p>
      </div>
    </div>
  );
}
