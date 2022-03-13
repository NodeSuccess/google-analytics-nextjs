import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { sendPageview } from '../lib/analytics';

const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const AnalyticsProvider = () => {
  const { events } = useRouter();

  const handleChange = (url) => {
    sendPageview(url);
  };

  useEffect(() => {
    if (!NEXT_PUBLIC_GA_ID) return;

    events.on('routeChangeComplete', handleChange);

    return () => {
      events.off('routeChangeComplete', handleChange);
    };
  }, [events]);

  return NEXT_PUBLIC_GA_ID ? (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `
        }}
      />
    </>
  ) : (
    <></>
  );
};
