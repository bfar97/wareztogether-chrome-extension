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
	socket = io('ws://wareztogether-mpgp.rhcloud.com:8000');
});

//
// Listening for messages
//

// Messages from background script
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether' && request.action === 'enterRoom' && request.roomName) {

		socket.emit('enterRoom', {roomName: request.roomName});

		sendResponse(true);

		listenToServer(socket);
	}
});

function listenToServer (socket) {

	socket.on('start', function (data) {
		
		window.postMessage({from: 'wareztogether-server', action: 'start'}, '*');

		skipNextStart = true;
	});

	socket.on('pause', function (data) {
		
		window.postMessage({from: 'wareztogether-server', action: 'pause'}, '*');

		skipNextPause = true;
	});

	socket.on('resume', function (data) {
		
		window.postMessage({from: 'wareztogether-server', action: 'resume'}, '*');

		skipNextResume = true;
	});

}

// Messages from our injected script

var skipNextStart = false;
	skipNextPause = false;
	skipNextResume = false;

window.addEventListener('message', function (event) {

	var data = event.data;

	if (data.from === 'wareztogether') {

		if (data.action === 'start') {

			if (skipNextStart) {

				skipNextStart = false;

				return false;
			}

			socket.emit('start');

		} else if (data.action === 'pause') {

			if (skipNextPause) {

				skipNextPause = false;

				return false;
			}

			socket.emit('pause');

		} else if (data.action === 'resume') {

			if (skipNextResume) {

				skipNextResume = false;

				return false;
			}

			socket.emit('resume');
		}
	}
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