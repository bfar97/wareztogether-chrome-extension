document.title = "WarezTogether";

$(document).ready(function () {

	// Send init message to background.js
	// Todo: allow the user to specify which group they are connecting to and all that before sending this
	chrome.runtime.sendMessage({from: 'wareztogether', action: 'init'}, function (response) {

		if (!response) { // Background.js returns false if there was a problem
			console.log('WarezTogether: ERROR - Failed init message.');	
		}

	});

	// Listen for messages from background script
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

		if (request.from === 'wareztogether') {
			// Nothing to do here (for now)
		}
	});

	// Check if a video has been loaded so we can get the file url

	var params = getUrlParameters();

	if (params['m'] && params['sv'] && params['url']) {

		// User has loaded a video, inject our script into the page
		injectScript(params['sv']);

		// Listen for events from the DOM, triggered by our injected script
		listenForEvents();

		// TODO: use the fileUrl to append a player with the video to the page

	}

});

//
// Internal/Utility functions
//

/*
 * Get parameters from a url string
 * (This function was copied from stack overflow hehue)
 *
 * Example:
 *
 *  var params = getUrlParameters('http://www.wareztuga.tv/movie.php?m=The_Skeleton_Twins&sv=cloudzilla&url=YK0X1EWVV4HCM5APALYM2N560');
 *
 *  params['m']; ==> 'The_Skeleton_Twins'
 *
 */
function getUrlParameters () {

	var vars = window.location.search.substring(1).split("&"),
		params = {};

	for (var i = 0; i < vars.length; i++) {

			var pair = vars[i].split("=");
			params[pair[0]] = pair[1];
	}
	
	return params;
}

/*
 * Inject our script into the page
 *
 * @description
 *    We need to inject a script into the page because this content script is running in a sandbox and
 *  cannot access the page's window object, where the player objects are found.
 *    To interact with the players, we have to inject a script, gain access to their objects, and trigger
 *  events when something happens. These events will be catched by this content script and reacted to accordingly.
 *
 * @param server - Players may vary from server to server
 */
function injectScript (server) {

	if (server === 'dropvideo') {

		var s = document.createElement('script');
		s.src = chrome.extension.getURL('js/injected.js');
		console.log('chromeextensiongeturl');
		console.log(s);
		console.log(s.src);

		(document.head || document.documentElement).appendChild(s);
	}

}

/*
 * Listens for events triggered by our injected script
 *
 */
function listenForEvents () {

}
