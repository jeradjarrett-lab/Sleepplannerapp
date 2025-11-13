import { Plugin } from 'vite';
import { minify } from 'html-minifier-terser';

export function htmlMinify(): Plugin {
  return {
    name: 'vite-plugin-html-minify',
    apply: 'build',
    enforce: 'post',
    async transformIndexHtml(html) {
      return await minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeEmptyAttributes: true,
        removeOptionalTags: false,
        sortAttributes: true,
        sortClassName: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        removeAttributeQuotes: false, // Keep for compatibility
        html5: true,
      });
    },
  };
}
