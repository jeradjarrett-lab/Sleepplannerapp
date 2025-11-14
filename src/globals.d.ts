// Global type declarations

interface Window {
  adsbygoogle: any[];
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}

declare global {
  var adsbygoogle: any[];
}

export {};
