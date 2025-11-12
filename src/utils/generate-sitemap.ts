/**
 * Sitemap Generator Utility
 * 
 * This utility generates an XML sitemap for EyeLoveSleep
 * Run this script to regenerate the sitemap when needed
 */

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: {
    loc: string;
    title: string;
    caption?: string;
  }[];
}

const DOMAIN = 'https://eyelovesleep.com';

// Get current date in YYYY-MM-DD format
const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Define all pages for the sitemap
const pages: SitemapURL[] = [
  {
    loc: `${DOMAIN}/`,
    lastmod: getCurrentDate(),
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      {
        loc: `${DOMAIN}/og-sleep-calculator.png`,
        title: 'Sleep Calculator - Calculate Best Bedtime and Wake Time',
        caption: 'Free sleep calculator based on 90-minute sleep cycles. Calculate optimal bedtime and wake time to feel refreshed.',
      },
    ],
  },
  {
    loc: `${DOMAIN}/caffeine-sleep`,
    lastmod: getCurrentDate(),
    changefreq: 'weekly',
    priority: 0.9,
    images: [
      {
        loc: `${DOMAIN}/og-caffeine-calculator.png`,
        title: 'Caffeine & Sleep Calculator - Track Coffee Impact on Sleep',
        caption: 'Track caffeine intake and discover optimal bedtime based on caffeine half-life and metabolism.',
      },
    ],
  },
  {
    loc: `${DOMAIN}/jet-lag`,
    lastmod: getCurrentDate(),
    changefreq: 'monthly',
    priority: 0.9,
    images: [
      {
        loc: `${DOMAIN}/og-jet-lag-calculator.png`,
        title: 'Jet Lag Calculator - Beat Jet Lag Fast with Adjustment Plans',
        caption: 'Advanced jet lag calculator with personalized adjustment plans for eastward and westward travel.',
      },
    ],
  },
];

// Generate XML sitemap
export const generateSitemap = (): string => {
  const urls = pages
    .map((page) => {
      const images = page.images
        ? page.images
            .map(
              (img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`
            )
            .join('')
        : '';

      return `
  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>${images}
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls}
</urlset>`;
};

// Escape XML special characters
const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Generate and log sitemap (for manual use)
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  console.log(generateSitemap());
}

export default generateSitemap;
