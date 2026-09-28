(function () {
	try {
		if (localStorage.getItem('umbra-lang-manual')) return;
		var lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
		if (/^fr\b/i.test(lang)) location.replace('/fr/');
	} catch (e) {
		// localStorage unavailable (private mode, disabled) — fail open,
		// stay on the default English page rather than error.
	}
})();
