// Step 7.2 — bridge GitHub Releases per-asset download counts into PostHog.
//
// GitHub's `download_count` is a running total, so each run emits a *snapshot*
// (`cumulative_downloads`), never a delta. Chart it with the "Maximum" property
// math per day (or diff consecutive days in HogQL) — summing it overcounts.
//
// Only human-facing installers are counted. The app's background update check
// fetches `latest.json` and then the `.app.tar.gz` updater bundle (and `.sig`
// files), so those inflate on every check and are excluded.
//
// Env: POSTHOG_PROJECT_API_KEY (required), POSTHOG_HOST (default EU ingest),
//      GITHUB_TOKEN (optional, raises the API rate limit), DRY_RUN=1 to print only.

const REPO = 'dipaneb/umbra';
const HOST = process.env.POSTHOG_HOST ?? 'https://eu.i.posthog.com';
const KEY = process.env.POSTHOG_PROJECT_API_KEY;
const DRY_RUN = process.env.DRY_RUN === '1';

if (!KEY && !DRY_RUN) throw new Error('POSTHOG_PROJECT_API_KEY is not set');

const PLATFORMS = [
	[/\.dmg$/, 'macos'],
	[/\.exe$|\.msi$/, 'windows'],
	[/\.AppImage$|\.deb$|\.rpm$/, 'linux'],
];

const platformOf = (name) => PLATFORMS.find(([re]) => re.test(name))?.[1] ?? null;

async function fetchReleases() {
	const releases = [];
	for (let page = 1; ; page++) {
		const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, {
			headers: {
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
			},
		});
		if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
		const batch = await res.json();
		releases.push(...batch);
		if (batch.length < 100) return releases;
	}
}

const now = new Date();
const day = now.toISOString().slice(0, 10);
const batch = [];

for (const release of await fetchReleases()) {
	if (release.draft) continue;
	for (const asset of release.assets) {
		const platform = platformOf(asset.name);
		if (!platform) continue;
		batch.push({
			event: 'github_release_downloads',
			distinct_id: 'github-releases-bridge',
			timestamp: now.toISOString(),
			// Same asset + same day dedupes if the job is re-run.
			properties: {
				$insert_id: `${day}:${release.tag_name}:${asset.name}`,
				$process_person_profile: false,
				release_tag: release.tag_name,
				prerelease: release.prerelease,
				asset_name: asset.name,
				platform,
				cumulative_downloads: asset.download_count,
			},
		});
	}
}

console.log(`${batch.length} asset snapshots`);
console.table(batch.map((e) => ({ ...e.properties })), ['release_tag', 'asset_name', 'platform', 'cumulative_downloads']);

if (DRY_RUN || batch.length === 0) process.exit(0);

const res = await fetch(`${HOST}/batch/`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ api_key: KEY, batch }),
});
if (!res.ok) throw new Error(`PostHog ${res.status}: ${await res.text()}`);
console.log('Sent to PostHog');
