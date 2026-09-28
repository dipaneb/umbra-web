function guessPlatform() {
	var ua = navigator.userAgent;
	if (/Mac/.test(ua)) return 'macos';
	if (/Win/.test(ua)) return 'windows';
	if (/Linux/.test(ua)) return 'linux';
	return 'unknown';
}

document.addEventListener('click', function (event) {
	var el = event.target.closest('[data-analytics]');
	if (!el || !window.posthog) return;
	var props = {};
	if (el.dataset.analyticsProps) {
		try {
			props = JSON.parse(el.dataset.analyticsProps);
		} catch (e) {
			/* malformed props — send the event without them rather than drop it */
		}
	}
	// Nav/hero/closing-CTA "Download" links go to /download rather than a specific
	// asset, so they don't know which platform yet — best-effort guess from the UA,
	// same purpose ledger row 7's live per-platform logic serves on /download itself.
	if (el.dataset.analytics === 'download_clicked' && !props.platform) {
		props.platform = guessPlatform();
	}
	window.posthog.capture(el.dataset.analytics, props);
});

// Marks an explicit language choice (either direction) so the root
// redirect script above never overrides it — a visitor who
// deliberately picked a language should never be bounced back by
// browser-language inference, on this visit or a future one.
document.addEventListener('click', function (event) {
	if (event.target.closest('.lang-switch')) {
		try {
			localStorage.setItem('umbra-lang-manual', '1');
		} catch (e) {
			// localStorage unavailable — the switch itself still works via
			// normal navigation, only the "don't auto-redirect later" memory is lost.
		}
	}
});

// Mobile nav toggle — a real <button> instead of the previous
// checkbox+label hack, so state is exposed via `aria-expanded`
// rather than relying on assistive tech to interpret an
// aria-hidden checkbox. Closes on Escape or on selecting a link,
// both real keyboard-usability gaps the checkbox version had no
// way to fix.
(function () {
	var toggle = document.getElementById('nav-toggle');
	var nav = document.querySelector('.site-nav');
	if (!toggle || !nav) return;
	function setOpen(open) {
		nav.classList.toggle('nav-open', open);
		toggle.setAttribute('aria-expanded', String(open));
	}
	toggle.addEventListener('click', function () {
		setOpen(!nav.classList.contains('nav-open'));
	});
	nav.querySelector('.nav-links').addEventListener('click', function (event) {
		if (event.target.closest('a')) setOpen(false);
	});
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && nav.classList.contains('nav-open')) {
			setOpen(false);
			toggle.focus();
		}
	});
})();
