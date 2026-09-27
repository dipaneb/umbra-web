// Plain data file, not a content collection — one page, one ordered list,
// proportionate to what's actually repeating (landing-ia.md §5).
export interface FaqEntry {
	id: string;
	q: string;
	a: string | null;
}

export const faqs: FaqEntry[] = [
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
