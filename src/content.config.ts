import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// registry.ts (Umbra's own repo) is the tool list's source of truth for what
// tools exist and what they're named, but it's a Vue/Pinia store in a
// different git repository — this collection is the mechanical single
// source *this* repo reads from, kept in manual sync with it
// (landing-ia.md §5).
//
// Locale-scoped since Step 6.5: one subfolder per locale (`en/`, `fr/`),
// entry id keeps the `{locale}/{slug}` shape (e.g. `en/json`, `fr/json`) so
// a page can look up its own tool by slug within its own locale — the same
// per-locale-file convention this collection already used per-tool, just
// with one more path segment.
const stripJsonExt = ({ entry }: { entry: string }) => entry.replace(/\.json$/, '');

const tools = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/tools', generateId: stripJsonExt }),
	schema: z.object({
		name: z.string(),
		order: z.number(),
		icon: z.string(),
		// Schema-checked guard rail (landing-ia.md §5) — only OCR may make
		// the "even the AI" claim; every other tool page must say so
		// explicitly to opt in.
		aiClaim: z.boolean().default(false),
		searchTerms: z.string(),
		hubBlurb: z.string(),
		tileDescription: z.string().optional(),
		seoTitle: z.string(),
		seoDescription: z.string(),
		directAnswer: z.string(),
		body: z.string(),
		screenshotSlug: z.string(),
		screenshotAlt: z.string(),
		faqs: z.array(z.object({ q: z.string(), a: z.string() })),
	}),
});

const comparisons = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/comparisons', generateId: stripJsonExt }),
	schema: z.object({
		competitorName: z.string(),
		order: z.number(),
		// Mandatory, not optional (landing-ia.md §5) — a competitor-fact
		// entry without a dated source fails the build.
		dateChecked: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
		intro: z.string(),
		rows: z.array(z.object({ label: z.string(), umbra: z.string(), competitor: z.string() })),
		verdict: z.string(),
	}),
});

const changelog = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/changelog', generateId: stripJsonExt }),
	schema: z.object({
		// Same dates GitHub reports as of authoring, used if the live fetch
		// at build time fails (e.g. an offline build).
		fallbackDate: z.string(),
		added: z.array(z.string()).optional(),
		changed: z.array(z.string()).optional(),
		fixed: z.array(z.string()).optional(),
	}),
});

export const collections = { tools, comparisons, changelog };
