// @ts-check
import { defineConfig } from 'astro/config';

// Vercel's default deployment URL is <project-name>.vercel.app, and the
// project name defaults to the repo name (umbra-web) — update this once a
// custom domain is connected (Task 5) or if the actual Vercel project name
// differs.
// https://astro.build/config
export default defineConfig({
	site: 'https://umbra-web.vercel.app',
});
