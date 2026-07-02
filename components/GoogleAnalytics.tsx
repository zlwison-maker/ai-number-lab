"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const GA_MEASUREMENT_ID = "G-BYGKDVNZNK";
const isProduction = process.env.NODE_ENV === "production";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    googleAnalyticsInitialized?: boolean;
  }
}

function isLocalhost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".localhost")
  );
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  const pagePath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isProduction) {
      return;
    }

    setEnabled(!isLocalhost(window.location.hostname));
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    ensureGtag();
    if (!window.googleAnalyticsInitialized) {
      window.gtag?.("js", new Date());
      window.gtag?.("config", GA_MEASUREMENT_ID, {
        send_page_view: false
      });
      window.googleAnalyticsInitialized = true;
    }

    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: pagePath
    });
  }, [enabled, pagePath]);

  if (!isProduction || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
          if (!window.googleAnalyticsInitialized) {
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            window.googleAnalyticsInitialized = true;
          }
        `}
      </Script>
    </>
  );
}
