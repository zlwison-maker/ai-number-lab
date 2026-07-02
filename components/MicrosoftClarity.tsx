import Script from "next/script";

const CLARITY_PROJECT_ID = "xfyd51mca9";
const isProduction = process.env.NODE_ENV === "production";

export function MicrosoftClarity() {
  if (!isProduction) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function() {
          var hostname = window.location.hostname;
          var isLocalhost =
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "::1" ||
            hostname.slice(-10) === ".localhost";

          if (isLocalhost) {
            return;
          }

          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/xfyd51mca9";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        })();
      `}
    </Script>
  );
}
