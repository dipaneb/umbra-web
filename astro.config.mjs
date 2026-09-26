// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Production domain (Step 6.1). The old umbra-web-beta.vercel.app URL
// redirects here — see vercel.json.
// https://astro.build/config
export default defineConfig({
  site: 'https://umbra.dipane.fr',
  // Pins one canonical URL form per page (matches the directory/index.html
  // build output) so /faq and /faq/ don't count as two distinct URLs for SEO.
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Step 6.2 — self-hosted via Astro's built-in Fonts API (stable since v6,
  // Context7-verified against /withastro/docs), which downloads and serves
  // the files itself rather than depending on an @fontsource npm dependency.
  // Only the weights/styles actually used (landing-design.md §1's type
  // scale) are requested, and Astro generates a metric-matched fallback
  // automatically to limit layout shift.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Sans',
      cssVariable: '--font-geist-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [400],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      // Display face for hero/h1/h2 only (landing-design.md §1) — Geist
      // Sans keeps every other role. Weight 700 is the developer's initial
      // pick, flagged there as an easy tuning point once real copy is set.
      provider: fontProviders.fontsource(),
      name: 'Hubot Sans',
      cssVariable: '--font-hubot-sans',
      weights: [700],
      styles: ['normal'],
      fallbacks: ['Geist Sans', 'sans-serif'],
    },
  ],
});