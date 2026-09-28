(function () {
	// Live-filtering search — dims/greys non-matching tiles and outlines
	// matches in the signature accent, across the bento grid (desktop/
	// tablet) and the mobile strip alike (landing-design.md §2).
	var input = document.getElementById('tool-search');
	var tiles = Array.prototype.slice.call(document.querySelectorAll('[data-tool-name]'));
	if (input) {
		input.addEventListener('input', function () {
			var q = input.value.trim().toLowerCase();
			tiles.forEach(function (tile) {
				var hay = (tile.getAttribute('data-tool-name') || '').toLowerCase();
				var match = q === '' || (hay !== '' && hay.indexOf(q) !== -1);
				tile.style.opacity = match ? '1' : '0.3';
				tile.style.filter = match ? 'none' : 'grayscale(70%)';
				tile.style.outline = match && q !== '' && hay !== '' ? '2px solid var(--accent-signature)' : 'none';
				tile.style.outlineOffset = '2px';
			});
		});
	}

	// Nav Download button hides while the hero (which carries its own,
	// more prominent CTA) is in view, per landing-design.md §2.
	var hero = document.getElementById('hero');
	var navBtn = document.getElementById('nav-download-btn');
	if (hero && navBtn) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					navBtn.style.opacity = entry.isIntersecting ? '0' : '1';
					navBtn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
				});
			},
			{ threshold: 0.2 },
		);
		observer.observe(hero);
	}
})();
