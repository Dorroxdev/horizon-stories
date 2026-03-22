import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const BEEHIIV_FORM_ID = '73dce1a9-83dc-491b-a0e1-870c1f087e5b';

interface BeehiivEmbedProps {
  className?: string;
  redirectUrl?: string;
}

export default function BeehiivEmbed({ className, redirectUrl }: BeehiivEmbedProps) {
  // Load Beehiiv embed script once
  useEffect(() => {
    if (document.querySelector('script[src="https://subscribe-forms.beehiiv.com/embed.js"]')) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const src = redirectUrl
    ? `https://subscribe-forms.beehiiv.com/${BEEHIIV_FORM_ID}?redirect_url=${encodeURIComponent(redirectUrl)}`
    : `https://subscribe-forms.beehiiv.com/${BEEHIIV_FORM_ID}`;

  return (
    <div className={cn('overflow-hidden', className)}>
      <iframe
        src={src}
        className="beehiiv-embed"
        data-test-id="beehiiv-embed"
        frameBorder="0"
        scrolling="no"
        style={{
          width: '100%',
          height: 339,
          margin: 0,
          borderRadius: 0,
          backgroundColor: 'transparent',
          maxWidth: '100%',
        }}
        title="Newsletter signup"
      />
    </div>
  );
}
