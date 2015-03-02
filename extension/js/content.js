// Global socket.io
var socket = false;

$(document).ready(function () {

	// Send init message to background.js
	chrome.runtime.sendMessage({from: 'wareztogether', action: 'showPageAction'}, function (response) {

		if (!response) {
			console.log('WarezTogether: ERROR - Failed init message.');	
		}
	});

	// Inject our script into the page
	injectScript();

	// Init socket.io
	socket = io('localhost:8080');
});

//
// Listening for messages
//

// Listen for messages from background script
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether' && request.action === 'createRoom' && request.roomName) {
	
		console.log('emitting createRoom');

		socket.emit('createRoom', {roomName: request.roomName});

		socket.on('hello', function (data) {
			//alert('hello!');
		});

		sendResponse(true);
	}
});

// Listen for messages from our injected script
window.addEventListener('message', function (event) {

	console.log('received init event!');
});

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