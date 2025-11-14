import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import CaffeineSleepPage from '../pages/CaffeineSleepPage';
import '../styles/globals.css';

// Initialize performance optimizations
import { initCriticalCSS } from '../utils/critical-css';
import { initResourcePrioritization } from '../utils/resource-prioritization';
import { initErrorSuppression } from '../utils/error-suppression';

if (typeof window !== 'undefined') {
  initCriticalCSS();
  initResourcePrioritization();
  initErrorSuppression();
}

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root and render caffeine sleep page
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <CaffeineSleepPage />
    </HelmetProvider>
  </StrictMode>
);
