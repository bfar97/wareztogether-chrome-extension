document.title = "WarezTogether";

$(document).ready(function () {

	// Send init message to background.js
	// Todo: allow the user to specify which group they are connecting to and all that before sending this
	chrome.runtime.sendMessage({from: 'wareztogether', action: 'init'}, function (response) {

		if (!response) { // Background.js returns false if there was a problem
			console.log('WarezTogether: ERROR - Failed init message.');	
		}

	});

	// Inject our script into the page
	injectScript();

});

//
// Listening for messages
//

// Listen for messages from background script
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether') {
		// Nothing to do here (for now)
	}
});

// Listen for messages from our injected script

window.addEventListener('message', function (event) {
	console.log("console.log('received init event!!!');\n console.log(event);\n console.log(event.from === 'wareztogether');\n console.log(event.source != window);\n console.log(event.source !== window);");

	console.log('received init event!!!');
	console.log(event);
	console.log(event.data.from === 'wareztogether');
	console.log(event.source != window);
	console.log(event.source !== window);
});

//
// Sending messages
//

/* TODO */

//
// Internal functions
//

/*
 * Inject our script into the page
 *
 * @description
 *    We need to inject a script into the page because this content script is running in a sandbox and
 *  cannot access the page's window object, where the player objects are found.
 *    To interact with the players, we have to inject a script, gain access to their objects, and trigger
 *  events when something happens. These events will be catched by this content script and reacted to accordingly.
 *
 */
function injectScript () {

	var s = document.createElement('script');
	s.src = chrome.extension.getURL('js/injected.js');

	(document.head || document.documentElement).appendChild(s);
}