#!/usr/bin/env node
// Step 6.12 — vercel.json's CSP allow-lists style-src by sha256 hash for the
// inline <style> tags Astro's <Font> component emits (its @font-face rules
// can't be externalized; build.inlineStylesheets: 'never' in astro.config.mjs
// already externalizes every other component style, so these should be the
// ONLY inline <style> tags left in a fresh build). Run this after `astro
// build` whenever the font config in astro.config.mjs changes, and paste the
// printed hashes into vercel.json's style-src directive.
//
// Usage: astro build && node scripts/print-csp-style-hashes.mjs

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const distDir = new URL('../dist', import.meta.url).pathname;

function walk(dir, files = []) {
	for (const entry of readdirSync(dir)) {
		const p = join(dir, entry);
		if (statSync(p).isDirectory()) walk(p, files);
		else if (entry.endsWith('.html')) files.push(p);
	}
	return files;
}

const hashToFiles = new Map();
const nonFontFound = [];

for (const file of walk(distDir)) {
	const html = readFileSync(file, 'utf8');
	const re = /<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/g;
	let m;
	while ((m = re.exec(html))) {
		const body = m[1];
		if (!body.trim()) continue;
		const hash = 'sha256-' + createHash('sha256').update(body, 'utf8').digest('base64');
		if (!hashToFiles.has(hash)) hashToFiles.set(hash, new Set());
		hashToFiles.get(hash).add(file);
		if (!body.trim().startsWith('@font-face')) nonFontFound.push([file, body.slice(0, 80)]);
	}
}

if (nonFontFound.length > 0) {
	console.error(
		`Found ${nonFontFound.length} inline <style> block(s) that aren't @font-face rules — ` +
			`build.inlineStylesheets may not be 'never' anymore, or something new is emitting inline CSS. ` +
			`Investigate before trusting the hashes below:`,
	);
	for (const [file, snippet] of nonFontFound.slice(0, 5)) console.error(` ${file}: ${snippet}`);
}

console.log(`\n${hashToFiles.size} unique inline <style> hash(es) across the build:\n`);
for (const hash of hashToFiles.keys()) console.log(`'${hash}'`);
