(function () {
	var strings = JSON.parse(document.getElementById('download-i18n').textContent);
	var REPO = 'dipaneb/umbra';
	var statusEl = document.getElementById('release-status');

	var panels = {
		macos: {
			test: /\.dmg$/i,
			button: document.getElementById('btn-macos'),
			unavailable: document.getElementById('unavailable-macos'),
		},
		windows: {
			test: /\.(exe|msi)$/i,
			button: document.getElementById('btn-windows'),
			unavailable: document.getElementById('unavailable-windows'),
		},
		linux: {
			test: /\.(deb|rpm|AppImage)$/i,
			button: document.getElementById('btn-linux'),
			unavailable: document.getElementById('unavailable-linux'),
		},
	};

	// Auto-detect + pre-select the visitor's platform tab (landing-ia.md §4).
	var ua = navigator.userAgent;
	var detected = /Win/.test(ua) ? 'windows' : /Linux/.test(ua) && !/Android/.test(ua) ? 'linux' : 'macos';
	var radio = document.getElementById('os-' + detected);
	if (radio) radio.checked = true;

	fetch('https://api.github.com/repos/' + REPO + '/releases/latest')
		.then(function (res) {
			if (!res.ok) throw new Error('bad response');
			return res.json();
		})
		.then(function (data) {
			statusEl.hidden = true;

			Object.keys(panels).forEach(function (platform) {
				var panel = panels[platform];
				var asset = data.assets.find(function (a) {
					return panel.test.test(a.name);
				});
				if (asset) {
					if (panel.button.tagName === 'A') panel.button.href = asset.browser_download_url;
					else panel.button.dataset.href = asset.browser_download_url;
					panel.button.hidden = false;
					panel.unavailable.hidden = true;
				} else {
					panel.button.hidden = true;
					panel.unavailable.hidden = false;
				}
			});

			var metaEl = document.getElementById('meta-macos');
			if (metaEl) {
				var date = new Date(data.published_at).toLocaleDateString(strings.dateLocale, {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					timeZone: 'UTC',
				});
				metaEl.textContent = 'Version ' + data.tag_name.replace(/^v/, '') + strings.metaSeparator + date;
			}
		})
		.catch(function () {
			statusEl.textContent = strings.fetchFailurePrefix;
			var link = document.createElement('a');
			link.href = 'https://github.com/dipaneb/umbra/releases';
			link.textContent = strings.fetchFailureLinkText;
			statusEl.appendChild(link);
			statusEl.append('.');
		});

	// Windows unsigned-build disclosure modal — fires before the file downloads
	// (landing-strategy.md §4 event table: windows_unsigned_modal_shown/_proceeded).
	var winButton = document.getElementById('btn-windows');
	var modal = document.getElementById('windows-modal');
	var modalCancel = document.getElementById('windows-modal-cancel');
	var modalContinue = document.getElementById('windows-modal-continue');

	winButton.addEventListener('click', function () {
		modal.showModal();
		if (window.posthog) window.posthog.capture('windows_unsigned_modal_shown');
	});

	modalCancel.addEventListener('click', function () {
		modal.close();
	});

	modalContinue.addEventListener('click', function () {
		if (window.posthog) {
			window.posthog.capture('windows_unsigned_modal_proceeded');
			window.posthog.capture('download_clicked', { platform: 'windows' });
		}
		modal.close();
		if (winButton.dataset.href) window.location.href = winButton.dataset.href;
	});
})();
