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
  build: {
    // Step 6.12 — vercel.json's CSP ships `style-src 'self'` with no
    // `unsafe-inline`. Astro's default ('auto') inlines any component
    // <style> block under 4kb directly into the page instead of an
    // external file — CSP-invisible until you actually load the page in
    // a browser with the policy on, since the HTML still looks fine and
    // `astro build` never warns. `'never'` forces every component's CSS
    // external permanently, so style-src needs no per-page hash that
    // would silently go stale on the next routine CSS edit. This is
    // separate from the Font component's own @font-face <style> tags
    // below, which aren't governed by this setting at all.
    inlineStylesheets: 'never',
  },
  // Step 6.5 — French ships alongside English at launch (landing-strategy.md,
  // decisions table, revised 2026-09-19). `prefixDefaultLocale: false` keeps
  // English unprefixed at `/` (page files stay at `src/pages/*.astro`) since
  // Step 6.1 already moved the domain — stacking a second URL-shape change
  // (`/en/...`) on top of that in the same pre-launch pass isn't worth it.
  // French lives under `/fr/` (`src/pages/fr/*.astro`).
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // Separate config block from Astro's own `i18n` above — easy to set
      // one and miss the other (landing-copy.md §7 Part 6). `fr-FR`, not the
      // `fr-CA` Astro's own docs example uses — Umbra's French isn't
      // Québécois or otherwise regionally scoped.
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR',
        },
      },
    }),
  ],
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