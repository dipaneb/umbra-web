import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Step 6.13 — a curated index for coding agents (Cursor, Claude Code,
// Copilot, Cline, Aider), not an AI-citation play; the roadmap's own
// research (README.md's Step 6.13 entry) found no major LLM provider
// commits to reading this in production. Generated at build time from the
// same content collections the site renders from, so it can't drift the
// way a hand-maintained copy would (landing-ia.md §5's sync concern,
// applied here) — every description below is that entry's own
// `seoDescription`, already written and ledger-checked for the page it
// comes from, not new copy invented for this file.
//
// English-only, at the site root, same as `robots.txt`/`sitemap-index.xml`
// — this site's other locale-agnostic entry points — rather than a second
// `/fr/llms.txt`; the French mirror is noted below, not duplicated.
export const GET: APIRoute = async ({ site }) => {
	const url = (path: string) => new URL(path, site).toString();

	const tools = (await getCollection('tools', ({ id }) => id.startsWith('en/')))
		.map((t) => ({ ...t, id: t.id.replace(/^en\//, '') }))
		.sort((a, b) => a.data.order - b.data.order);

	const comparisons = (await getCollection('comparisons', ({ id }) => id.startsWith('en/')))
		.map((c) => ({ ...c, id: c.id.replace(/^en\//, '') }))
		.sort((a, b) => a.data.order - b.data.order);

	const lines: string[] = [];

	lines.push('# Umbra', '');
	lines.push(
		"> Umbra is a free, source-available desktop app for macOS, Windows, and Linux, bundling everyday developer tools — JSON, Base64, UUID, Hash, JWT, Cron, PDF, Images, and OCR — that run entirely on-device. No account, no cloud dependency, and no network calls except one disclosed exception: a launch-time check for app updates.",
		'',
	);
	lines.push(
		'This is a curated index for coding agents fetching context about this site or repo (the reason named in https://llmstxt.org), not an AI-search citation strategy — as of 2026 there is little evidence major LLM providers read this file in production. The site ships full French translations of every page below at the same path under `/fr/` (e.g. `/fr/faq/`); this index lists English URLs only.',
		'',
	);

	lines.push('## Product', '');
	lines.push(`- [Home](${url('/')}): JSON, JWT, hashing, cron, and more — everyday developer tools that run entirely on your machine. Free, no account, no cloud.`);
	lines.push(`- [Download](${url('/download/')}): Download Umbra free for macOS, Windows, or Linux. Signed and notarized on macOS; Windows and Linux builds are best-effort.`);
	lines.push(`- [Tools](${url('/tools/')}): Nine everyday developer tools — JSON, Base64, UUID, Hash, JWT, Cron, Image to Text, PDF, Images — in one offline app.`);
	lines.push(`- [FAQ](${url('/faq/')}): Is Umbra open source? Is it safe on Windows? Does it phone home? Direct answers to the most common questions.`);
	lines.push(`- [Changelog](${url('/changelog/')}): What's shipped in Umbra, release by release, pulled directly from GitHub — added, changed, fixed.`);
	lines.push(`- [About](${url('/about/')}): Umbra is built and maintained by a single developer. Here's what that means for speed, privacy, and testing.`);
	lines.push('');

	lines.push(`## Tools (${tools.length})`, '');
	for (const tool of tools) {
		lines.push(`- [${tool.data.name}](${url(`/tools/${tool.id}/`)}): ${tool.data.seoDescription}`);
	}
	lines.push('');

	lines.push('## Comparisons', '');
	for (const cmp of comparisons) {
		lines.push(`- [Umbra vs. ${cmp.data.competitorName}](${url(`/compare/${cmp.id}/`)}): ${cmp.data.seoDescription}`);
	}
	lines.push('');

	lines.push('## Legal', '');
	lines.push(`- [Privacy Policy](${url('/privacy/')}): What the Umbra website collects and doesn't: cookieless analytics, no session recording, no email capture.`);
	lines.push(`- [Legal Notice](${url('/legal/')}): Publisher identity, hosting provider, and intellectual-property status for the Umbra website, per French law.`);
	lines.push(`- [End User License Agreement](${url('/eula/')}): The terms for using the downloaded Umbra binary: personal use, no redistribution, no reverse engineering, as-is.`);
	lines.push('');

	lines.push('## Full content', '');
	lines.push(
		`- [llms-full.txt](${url('/llms-full.txt')}): every tool page, comparison page, changelog entry, and FAQ answer inlined in full, for a single-fetch read of the site's substantive content.`,
	);
	lines.push('');

	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
