import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

interface SubscribeFormProps {
  className?: string;
  onSuccess?: () => void;
  successMessage?: string;
  buttonText?: string;
}

export default function SubscribeForm({
  className,
  onSuccess,
  successMessage = "You're subscribed! Check your inbox.",
  buttonText = 'Subscribe',
}: SubscribeFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: SubscribeFormValues) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');

      if (onSuccess) {
        setTimeout(onSuccess, 800);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    }
  };

  if (status === 'success' && !onSuccess) {
    return (
      <div className={cn('flex items-center justify-center gap-2 text-nessie', className)}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium">{successMessage}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            disabled={status === 'loading' || status === 'success'}
            className="pl-10 h-11 bg-card/50 border-border"
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Subscribed!
            </>
          ) : (
            <>
              {buttonText}
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </form>
      {errors.email && (
        <p className="text-sm text-destructive mt-2">{errors.email.message}</p>
      )}
      {status === 'error' && errorMessage && (
        <p className="text-sm text-destructive mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
