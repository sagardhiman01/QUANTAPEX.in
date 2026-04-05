'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: pathname,
            referrer: document.referrer,
            device: window.innerWidth < 768 ? 'mobile' : 'desktop'
          }),
        });
      } catch (err) {
        console.error('Analytics Fetch Error:', err);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
