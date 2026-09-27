// Plain data file, not a content collection — one page, one ordered list,
// proportionate to what's actually repeating (landing-ia.md §5). Step 6.5
// adds the French array alongside the English one; both keep the same `id`
// order and slugs so an anchor like `/faq/#update-check-vs-zero-network-calls`
// resolves the same way in either locale (ids aren't themselves translated —
// they're internal anchors, not visible copy).
export interface FaqEntry {
	id: string;
	q: string;
	a: string | null;
}

export const faqsEn: FaqEntry[] = [
	{
		id: 'windows-smartscreen-warning',
		q: 'Why did Windows warn me this file might be dangerous?',
		a: `Windows shows a "Windows protected your PC" warning for any app that isn't code-signed — and Umbra's Windows build currently isn't. Code-signing needs a certificate that costs money to buy and renew every year, which hasn't been justified yet for a free project with no revenue. This isn't a finding about Umbra specifically; it's Windows' standard response to any unsigned .exe. To open it: click More info, then Run anyway.`,
	},
	{
		id: 'open-source-and-audit-status',
		q: 'Is Umbra open source?',
		a: `No — Umbra is source-available, not open source. The repository is public, so you (or anyone) can read the code and confirm what it does, including the networking layer. But the licence is All Rights Reserved: nobody has the right to copy, modify, redistribute, or reuse it without written permission. There's also no formal third-party audit — the closest thing is the network-monitor check described on the home page's "Verify it yourself" section, which you can run yourself against your own downloaded copy.`,
	},
	{
		id: 'windows-linux-trust-parity',
		q: 'Are the Windows and Linux builds as trustworthy as the macOS one?',
		a: `Not in the same way — Umbra's Windows and Linux builds are best-effort, while macOS is the primary platform: fully tested, signed with a Developer ID certificate, and notarized by Apple. Windows and Linux are built by the same release pipeline, but not tested on a second machine the way macOS is, and the Windows build isn't code-signed yet.`,
	},
	{
		id: 'update-behavior',
		q: 'Does updating Umbra install anything without asking me?',
		a: `No. Every update shows a confirmation dialog before anything installs. If you decline, Umbra keeps running exactly as it was — nothing changes without you saying so.`,
	},
	{
		id: 'update-check-vs-zero-network-calls',
		q: `Doesn't checking for updates break the "zero network calls" promise?`,
		a: `The update check is Umbra's one disclosed exception to that promise. Once, at launch, Umbra checks GitHub for a newer release — that's the only network call it ever makes, and it's the same call named in the home page's "Verify it yourself" section. Only the install step itself waits for your confirmation; the check runs automatically. This is also the app's entire analytics footprint — Umbra itself sends no telemetry of any kind; the anonymous page-view analytics on this website are a separate, site-only concern (see the Privacy policy).`,
	},
	{
		id: 'comparison-to-named-competitors',
		q: 'How is Umbra different from DevToys, DevUtils, or DevTools-X?',
		a: null,
	},
	{
		id: 'free-online-tools',
		q: 'Why not just use a free online JSON formatter or JWT decoder instead?',
		a: null,
	},
	{
		id: 'verify-privacy-yourself',
		q: `Is there a way to check that Umbra actually isn't sending my data anywhere, rather than just trusting what it says?`,
		a: `Yes — run a network monitor while Umbra is running and watch what it actually does, on your own downloaded copy, instead of taking the claim on faith. On macOS: quit and relaunch Umbra while nettop -p $(pgrep -x umbra) is already running in a terminal. You'll see exactly one connection — the update check, at launch — and nothing else, no matter which tool you use. (macOS only; Windows and Linux instructions don't exist yet.) The full reasoning is on the home page's "Verify it yourself" section.`,
	},
];

export const faqsFr: FaqEntry[] = [
	{
		id: 'windows-smartscreen-warning',
		q: 'Pourquoi Windows m’a-t-il averti que ce fichier pourrait être dangereux ?',
		a: `Windows affiche l'avertissement « Windows a protégé votre ordinateur » pour toute application non signée numériquement — et le build Windows d'Umbra ne l'est pas encore. La signature de code nécessite un certificat payant, à renouveler chaque année, ce qui n'a pas encore été justifié pour un projet gratuit sans revenu. Ce n'est pas un signal propre à Umbra ; c'est la réponse standard de Windows à tout .exe non signé. Pour l'ouvrir : cliquez sur Plus d'informations, puis Exécuter quand même.`,
	},
	{
		id: 'open-source-and-audit-status',
		q: 'Umbra est-il open source ?',
		a: `Non — Umbra est source-available, pas open source. Le dépôt est public, donc vous (ou n'importe qui) pouvez lire le code et vérifier ce qu'il fait, y compris la couche réseau. Mais la licence est All Rights Reserved : personne n'a le droit de copier, modifier, redistribuer ou réutiliser le code sans autorisation écrite. Il n'existe pas non plus d'audit formel par un tiers — ce qui s'en approche le plus est le contrôle réseau décrit dans la section « Vérifiez-le vous-même » de la page d'accueil, que vous pouvez exécuter vous-même sur votre propre copie.`,
	},
	{
		id: 'windows-linux-trust-parity',
		q: 'Les builds Windows et Linux sont-ils aussi fiables que la version macOS ?',
		a: `Pas de la même façon — les builds Windows et Linux d'Umbra sont fournis à titre best-effort, tandis que macOS est la plateforme principale : entièrement testée, signée avec un certificat Developer ID, et notarisée par Apple. Windows et Linux sont générés par le même pipeline de publication, mais pas testés sur une seconde machine comme macOS l'est, et le build Windows n'est pas encore signé.`,
	},
	{
		id: 'update-behavior',
		q: 'La mise à jour d’Umbra installe-t-elle quelque chose sans me demander ?',
		a: `Non. Chaque mise à jour affiche une boîte de dialogue de confirmation avant toute installation. Si vous refusez, Umbra continue de fonctionner exactement comme avant — rien ne change sans votre accord.`,
	},
	{
		id: 'update-check-vs-zero-network-calls',
		q: `La vérification des mises à jour ne contredit-elle pas la promesse « zéro appel réseau » ?`,
		a: `La vérification des mises à jour est l'unique exception assumée à cette promesse. Une fois, au lancement, Umbra vérifie sur GitHub si une nouvelle version existe — c'est le seul appel réseau qu'il effectue, le même que celui décrit dans la section « Vérifiez-le vous-même » de la page d'accueil. Seule l'étape d'installation attend votre confirmation ; la vérification, elle, se fait automatiquement. C'est aussi tout ce qu'Umbra collecte en matière d'analyse — l'application elle-même n'envoie aucune télémétrie ; les statistiques anonymes de pages vues de ce site sont un sujet distinct, propre au site (voir la politique de confidentialité).`,
	},
	{
		id: 'comparison-to-named-competitors',
		q: 'En quoi Umbra diffère-t-il de DevToys, DevUtils ou DevTools-X ?',
		a: null,
	},
	{
		id: 'free-online-tools',
		q: 'Pourquoi ne pas simplement utiliser un formateur JSON ou un décodeur JWT gratuit en ligne ?',
		a: null,
	},
	{
		id: 'verify-privacy-yourself',
		q: `Existe-t-il un moyen de vérifier qu'Umbra n'envoie vraiment aucune donnée nulle part, plutôt que de simplement croire ce qu'il affirme ?`,
		a: `Oui — exécutez un moniteur réseau pendant qu'Umbra tourne, sur votre propre copie téléchargée, et observez ce qu'il fait réellement plutôt que de le croire sur parole. Sur macOS : quittez puis relancez Umbra pendant que nettop -p $(pgrep -x umbra) tourne déjà dans un terminal. Vous ne verrez qu'une seule connexion — la vérification de mise à jour, au lancement — et rien d'autre, quel que soit l'outil utilisé. (macOS uniquement ; les instructions pour Windows et Linux n'existent pas encore.) Le raisonnement complet se trouve dans la section « Vérifiez-le vous-même » de la page d'accueil.`,
	},
];

export function getFaqs(lang: 'en' | 'fr'): FaqEntry[] {
	return lang === 'fr' ? faqsFr : faqsEn;
}
