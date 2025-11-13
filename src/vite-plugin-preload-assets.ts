import { Plugin } from 'vite';

/**
 * Plugin to inject preload links for critical assets
 * This reduces render-blocking and improves LCP
 */
export function preloadAssets(): Plugin {
  return {
    name: 'vite-plugin-preload-assets',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Get the bundle information
        const bundle = ctx.bundle;
        if (!bundle) return html;

        const preloadLinks: string[] = [];
        const assetMap = new Map<string, string>();

        // Collect all assets
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if ('code' in chunk || 'source' in chunk) {
            assetMap.set(fileName, fileName);
          }
        }

        // Find critical assets to preload
        for (const [fileName, chunk] of Object.entries(bundle)) {
          // Preload main JS entry
          if (fileName.includes('index') && fileName.endsWith('.js')) {
            preloadLinks.push(
              `<link rel="modulepreload" href="/${fileName}" fetchpriority="high">`
            );
          }
          
          // Preload main CSS
          if (fileName.includes('index') && fileName.endsWith('.css')) {
            preloadLinks.push(
              `<link rel="preload" href="/${fileName}" as="style" fetchpriority="high">`
            );
          }
          
          // Preload critical vendor chunks
          if (fileName.includes('react-vendor') && fileName.endsWith('.js')) {
            preloadLinks.push(
              `<link rel="modulepreload" href="/${fileName}" fetchpriority="high">`
            );
          }
        }

        // Inject preload links right after the opening <head> tag
        const headOpenIndex = html.indexOf('<head>');
        if (headOpenIndex !== -1) {
          const insertPosition = headOpenIndex + 6; // After '<head>'
          const preloadHtml = '\n  ' + preloadLinks.join('\n  ') + '\n';
          html = html.slice(0, insertPosition) + preloadHtml + html.slice(insertPosition);
        }

        return html;
      },
    },
  };
}
