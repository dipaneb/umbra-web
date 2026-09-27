import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;

// Astro's own documented i18n recipe (`getLangFromUrl`/`useTranslations`),
// adapted for `prefixDefaultLocale: false`: English has no `/en/` segment,
// so a French page is anything whose path starts with `/fr/`.
export function getLangFromUrl(url: URL): Lang {
	return url.pathname.startsWith('/fr/') || url.pathname === '/fr' ? 'fr' : defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

// Umbra's own routes aren't translated (no `routes` slug map, unlike Astro's
// recipe) — every page exists at the same path in both locales, so the only
// difference between an English and a French URL is the `/fr` prefix. This
// also means the language switcher can always preserve the visitor's exact
// page (landing-copy.md §5's correctness requirement) with pure string
// manipulation, no per-page lookup table to keep in sync.
export function localizePath(path: string, lang: Lang): string {
	if (lang === defaultLang) return path;
	return `/fr${path}`;
}

// Strips a `/fr` prefix so a French URL's English counterpart (and vice
// versa) can be computed generically — used by the language switcher and by
// Layout.astro's hreflang wiring, both of which need "the same page, other
// locale," never a redirect to home (landing-copy.md §5).
export function delocalizePath(pathname: string): string {
	return pathname === '/fr' || pathname === '/fr/' ? '/' : pathname.replace(/^\/fr(?=\/)/, '');
}
