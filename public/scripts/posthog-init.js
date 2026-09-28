!(function (t, e) {
	var o, n, p, r;
	e.__SV ||
		((window.posthog = e),
		(e._i = []),
		(e.init = function (i, s, a) {
			function g(t, e) {
				var o = e.split('.');
				2 == o.length && ((t = t[o[0]]), (e = o[1])),
					(t[e] = function () {
						t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
					});
			}
			((p = t.createElement('script')).type = 'text/javascript'),
				(p.crossOrigin = 'anonymous'),
				(p.async = !0),
				(p.src =
					s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js'),
				(r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
			var u = e;
			for (
				void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
					u.people = u.people || [],
					u.toString = function (t) {
						var e = 'posthog';
						return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
					},
					u.people.toString = function () {
						return u.toString(1) + '.people (stub)';
					},
					o =
						'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug'.split(
							' ',
						),
					n = 0;
				n < o.length;
				n++
			)
				g(u, o[n]);
			e._i.push([i, s, a]);
		}),
		(e.__SV = 1));
})(document, window.posthog || []);
posthog.init('phc_qFffTVrdyHuB6yyzY5mSFbjWHAMD2t7M9aid2ySCQ9fL', {
	api_host: 'https://eu.i.posthog.com',
	autocapture: false,
	disable_session_recording: true,
	// Cookieless (Step 6.8 / landing-strategy.md §4): without this,
	// posthog-js defaults to `persistence: 'localStorage+cookie'`,
	// which sets a real persistent cookie — contradicting the "No
	// cookies" claim on /privacy. `cookieless_mode: 'always'` sets no
	// cookie/storage at all; identity is a privacy-preserving hash
	// computed server-side instead. Must also be enabled in the
	// PostHog project's own settings ("Cookieless server hash mode"),
	// or these events are dropped.
	cookieless_mode: 'always',
	// identify()/alias() are unused anywhere on this site (no
	// accounts) and become meaningless under cookieless_mode per
	// PostHog's own guidance — explicitly disabled rather than left
	// silently unreachable.
	person_profiles: 'never',
});
