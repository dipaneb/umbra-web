import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site);

	return new Response(
		`User-agent: *
Allow: /

# AI crawlers are allowed here, explicitly and by name, as a deliberate choice, not an
# oversight. Umbra has no monetizable content to protect, and being present in an AI's
# training data or answer index is exactly how "privacy-first developer toolbox" surfaces
# as a recommendation. This governs the marketing site only, not the app (see INV-1/INV-2
# for the app's own data handling). Roster verified live 2026-09-29 against each vendor's
# own docs.

# Training crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

# Retrieval / answer crawlers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-AdsBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

Sitemap: ${sitemapURL}
`,
		{ headers: { 'Content-Type': 'text/plain' } },
	);
};
