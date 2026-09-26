// @ts-check
import { defineConfig } from 'astro/config';

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
});