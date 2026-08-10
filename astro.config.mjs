// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Actual assigned Vercel URL, confirmed after connecting the project
// (umbra-web was already taken by another Vercel account, hence -beta).
// https://astro.build/config
export default defineConfig({
  site: 'https://umbra-web-beta.vercel.app',
  // Pins one canonical URL form per page (matches the directory/index.html
  // build output) so /faq and /faq/ don't count as two distinct URLs for SEO.
  trailingSlash: 'always',
  integrations: [sitemap()],
});