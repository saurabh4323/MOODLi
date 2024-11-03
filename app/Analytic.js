import React from "react";
import Script from "next/script";

export default function Analytic() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-D8F8GCXR49"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

  gtag('config', 'G-D8F8GCXR49');
        `}
      </Script>
    </>
  );
}
