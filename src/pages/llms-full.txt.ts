import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getFaqs } from '../data/faq';

// Step 6.13's full-content companion to `llms.txt` — a community convention
// (Mintlify's, not part of the llmstxt.org spec itself; re-verified live
// this session), so there's no format to follow beyond "inline the real
// content instead of just linking to it."
//
// Deliberately does NOT inline Home/Download/About/Privacy/Legal/EULA's own
// prose: that copy lives as hardcoded per-locale objects inside their
// `.astro` components, not in a shared data module, so duplicating it here
// would create exactly the second-source-of-truth drift problem
// landing-ia.md §5 already flagged for the tool list and ruled out — this
// file would silently go stale the next time that copy is edited on the
// live page, with nothing to catch it. Those pages get a link and their own
// already-published `description` only; everything below is instead built
// from the site's actual content collections and data files (`src/content/
// tools`, `src/content/comparisons`, `src/content/changelog`,
// `src/data/faq.ts`) — the same single sources of truth the pages
// themselves render from, so this file can't drift from them either.
export const GET: APIRoute = async ({ site }) => {
	const url = (path: string) => new URL(path, site).toString();

	const tools = (await getCollection('tools', ({ id }) => id.startsWith('en/')))
		.map((t) => ({ ...t, id: t.id.replace(/^en\//, '') }))
		.sort((a, b) => a.data.order - b.data.order);

	const comparisons = (await getCollection('comparisons', ({ id }) => id.startsWith('en/')))
		.map((c) => ({ ...c, id: c.id.replace(/^en\//, '') }))
		.sort((a, b) => a.data.order - b.data.order);

	const changelog = (await getCollection('changelog')).sort(
		(a, b) => new Date(b.data.fallbackDate).getTime() - new Date(a.data.fallbackDate).getTime(),
	);

	const faqs = getFaqs('en');

	// A couple of FAQ/tool-FAQ answers embed a raw `<a href="...">text</a>` —
	// safe in their real home (`set:html` on the actual page), wrong in a
	// plain-text file. Convert to a Markdown link rather than leaving the
	// HTML tag literal in the output.
	const toMarkdownLinks = (text: string) => text.replace(/<a href="([^"]+)">([^<]*)<\/a>/g, '[$2]($1)');

	const lines: string[] = [];

	lines.push('# Umbra — Full Content', '');
	lines.push(
		'> Full-text export of Umbra\'s content-model pages (tools, comparisons, changelog, FAQ), generated at build time from the same source files those pages render from. English only. Marketing-page prose (Home, Download, About, Privacy, Legal, EULA) is intentionally not duplicated here — see the note in this endpoint\'s own source, `src/pages/llms-full.txt.ts` — fetch those pages directly for their exact current wording.',
		'',
	);

	lines.push('## Tools', '');
	for (const tool of tools) {
		lines.push(`### ${tool.data.name}`, '');
		lines.push(`URL: ${url(`/tools/${tool.id}/`)}`, '');
		lines.push(tool.data.directAnswer, '');
		lines.push(tool.data.body, '');
		if (tool.data.faqs.length) {
			lines.push('Questions:', '');
			for (const item of tool.data.faqs) {
				lines.push(`Q: ${item.q}`);
				lines.push(`A: ${toMarkdownLinks(item.a)}`, '');
			}
		}
	}

	lines.push('## Comparisons', '');
	for (const cmp of comparisons) {
		lines.push(`### Umbra vs. ${cmp.data.competitorName}`, '');
		lines.push(`URL: ${url(`/compare/${cmp.id}/`)}`);
		lines.push(`Checked: ${cmp.data.dateChecked}`, '');
		lines.push(cmp.data.intro, '');
		lines.push('| | Umbra | ' + cmp.data.competitorName + ' |');
		lines.push('|---|---|---|');
		for (const row of cmp.data.rows) {
			lines.push(`| ${row.label} | ${row.umbra} | ${row.competitor} |`);
		}
		lines.push('');
		lines.push(cmp.data.verdict, '');
	}

	lines.push('## Changelog', '');
	lines.push(
		`URL: ${url('/changelog/')} (dates below are this repo's own recorded fallback dates, not a live GitHub fetch — the site itself merges those live at request time; treat these as approximate.)`,
		'',
	);
	for (const entry of changelog) {
		lines.push(`### ${entry.id} — ${entry.data.fallbackDate}`, '');
		if (entry.data.added?.length) {
			lines.push('Added:');
			for (const line of entry.data.added) lines.push(`- ${line}`);
			lines.push('');
		}
		if (entry.data.changed?.length) {
			lines.push('Changed:');
			for (const line of entry.data.changed) lines.push(`- ${line}`);
			lines.push('');
		}
		if (entry.data.fixed?.length) {
			lines.push('Fixed:');
			for (const line of entry.data.fixed) lines.push(`- ${line}`);
			lines.push('');
		}
	}

	lines.push('## FAQ', '');
	lines.push(`URL: ${url('/faq/')}`, '');
	for (const item of faqs) {
		lines.push(`Q: ${item.q}`);
		lines.push(`A: ${item.a ?? 'See the Tools and Comparisons sections above — this answer links out to those pages rather than repeating a fixed sentence.'}`, '');
	}

	lines.push('## Other pages (linked, not inlined — see this file\'s header note)', '');
	lines.push(`- [Home](${url('/')}): JSON, JWT, hashing, cron, and more — everyday developer tools that run entirely on your machine. Free, no account, no cloud.`);
	lines.push(`- [Download](${url('/download/')}): Download Umbra free for macOS, Windows, or Linux. Signed and notarized on macOS; Windows and Linux builds are best-effort.`);
	lines.push(`- [About](${url('/about/')}): Umbra is built and maintained by a single developer. Here's what that means for speed, privacy, and testing.`);
	lines.push(`- [Privacy Policy](${url('/privacy/')}): What the Umbra website collects and doesn't: cookieless analytics, no session recording, no email capture.`);
	lines.push(`- [Legal Notice](${url('/legal/')}): Publisher identity, hosting provider, and intellectual-property status for the Umbra website, per French law.`);
	lines.push(`- [End User License Agreement](${url('/eula/')}): The terms for using the downloaded Umbra binary: personal use, no redistribution, no reverse engineering, as-is.`);
	lines.push('');

	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
