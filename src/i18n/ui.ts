// UI-chrome translations (Step 6.5) — everything that isn't page-specific
// long-form copy or content-collection data. Page bodies (home, download,
// faq, about, privacy, legal, eula, changelog, tools hub) keep their own
// per-locale content inline in their own component, the same way this
// project's `landing-copy.md` organized copy per page rather than as one
// flat dictionary — this file only holds strings that repeat across pages
// (nav, footer, shared CTAs, shared page chrome) or that a shared component
// (ToolPage, ComparePage) needs.

export const languages = {
	en: 'English',
	fr: 'Français',
} as const;

export const defaultLang = 'en';

export const ui = {
	en: {
		'nav.aria': 'Primary',
		'nav.tools': 'Tools',
		'nav.faq': 'FAQ',
		'nav.about': 'About',
		'nav.download': 'Download',
		'nav.menu': 'Menu',
		'footer.aria': 'Footer',
		'footer.faq': 'FAQ',
		'footer.privacy': 'Privacy',
		'footer.legal': 'Legal notice',
		'footer.eula': 'EULA',
		'footer.changelog': 'Changelog',
		'footer.about': 'About',
		'footer.compareLabel': 'Compare:',
		'footer.attribution': "Hey — I'm the developer, the one person building and maintaining Umbra.",
		'footer.analytics': 'Umbra collects anonymous analytics only — no cookies, no session recording. See the {privacy} for exactly what.',
		'footer.analyticsPrivacyLinkText': 'Privacy Policy',
		'footer.licence': 'Source-available, not open source. See the {eula}.',
		'footer.watch': '{watchLink} to get notified about new releases.',
		'footer.watchLinkText': 'Watch on GitHub',
		'footer.copyright': '© 2026 Umbra.',
		'lang.switchTo': 'Français',
		'cta.download': 'Download',
		'cta.backToTools': '← All tools',
		'cta.faqHeading': 'FAQ',
		'cta.crossLinkIntro': 'See how Umbra compares to the other three:',
		'notfound.seoTitle': 'Page Not Found',
		'notfound.title': 'Page not found.',
		'notfound.body': "That page doesn't exist, or it moved.",
		'notfound.home': 'Home',
		'notfound.download': 'Download',
	},
	fr: {
		'nav.aria': 'Principale',
		'nav.tools': 'Outils',
		'nav.faq': 'FAQ',
		'nav.about': 'À propos',
		'nav.download': 'Télécharger',
		'nav.menu': 'Menu',
		'footer.aria': 'Pied de page',
		'footer.faq': 'FAQ',
		'footer.privacy': 'Confidentialité',
		'footer.legal': 'Mentions légales',
		'footer.eula': 'CLUF',
		'footer.changelog': 'Journal des modifications',
		'footer.about': 'À propos',
		'footer.compareLabel': 'Comparer :',
		'footer.attribution': 'Bonjour — je suis le développeur, seul aux commandes du développement et de la maintenance d’Umbra.',
		'footer.analytics': 'Umbra collecte uniquement des données d’analyse anonymes — aucun cookie, aucun enregistrement de session. Voir la {privacy} pour le détail.',
		'footer.analyticsPrivacyLinkText': 'politique de confidentialité',
		'footer.licence': 'Source-available, pas open source. Voir le {eula}.',
		'footer.watch': '{watchLink} pour être averti des nouvelles versions.',
		'footer.watchLinkText': 'Suivez Umbra sur GitHub',
		'footer.copyright': '© 2026 Umbra.',
		'lang.switchTo': 'English',
		'cta.download': 'Télécharger',
		'cta.backToTools': '← Tous les outils',
		'cta.faqHeading': 'FAQ',
		'cta.crossLinkIntro': 'Voici comment Umbra se compare aux trois autres :',
		'notfound.seoTitle': 'Page introuvable',
		'notfound.title': 'Page introuvable.',
		'notfound.body': 'Cette page n’existe pas, ou a été déplacée.',
		'notfound.home': 'Accueil',
		'notfound.download': 'Télécharger',
	},
} as const;
