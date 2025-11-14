import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import SleepCalculatorPage from '../pages/SleepCalculatorPage';
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

// Create root and render sleep calculator page
const root = createRoot(rootElement);

// Log to console for debugging
console.log('🌙 Loading Sleep Calculator Page');

root.render(
  <StrictMode>
    <HelmetProvider>
      <SleepCalculatorPage />
    </HelmetProvider>
  </StrictMode>
);
