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

			// Nothing to do here
			// ---------xXXXXXXXXXXXxx--------------
			// ------xXX^----------^^XXx------------
			// ----xX^----------------^XX-----------
			// --xX^--------------------^Xx---------
			// -X^--XX--------------XX---^XX--------
			// X^--------------------------XX-------
			// X--XXXXXXXXXXXXXXXXXXX-------X-------
			// X----------------------------X-------
			// X----------------------------X-------
			// Xx---------------------------X-------
			// ^Xx-------------------------XX-------
			// --^Xx--------------------xX^---------
			// -----^Xx--------------xX^------------
			// -------^Xxxx------xxxXXXXXXXxx-------
			// --------XXXXXXXXXXXXXXX---^XXXXXXx---
			// -----xXXX^^--------^XXXx------X-XXX--
			// ---xXXXx-----xxxx----XXX----xxXXXX^--
			// -xXXX00X-----X00X---XXXXXXXXXXXX^----
			// -^^XX^^^^^^^^^^XXXXXXXXXXX----X------
			// ----X-xxxxxxxxX^X00-----XX----X------
			// ----X-X-------X-X-00----XX----X------
			// ----XxX-------XxX--00000XXXxxxX------
			// ------------------------XX----------
			// ------------------------XX---xXXXx---
			// ------------------------XX-xXX000XX--
			// ---------------xXXXXXXXXXX-X000X00XXx
			// -------------xXX^---^^XXX--X000XX000X
			// -xXXXXXXXx--XXX---xxXXXX---XX00XXXX0X
			// XXX^--^^XXXXXXXXXXXXX^^-----XX0000XXX
			// XX^---------XX--------------XX0XX0XXX
			// XX----------XXX--------------XXXXX-XX
			// XX-----------XXX--------------X-XX--X
			// XX------------XX-----------------X---
			// XX-------------XX--------------------
			// XX-------------XXX-------------------
			// XXX-------------XXXxx----------------
			// -XXX-------------^^XXX---------------
			// --XXX--------------------------------

		}
	});

	// Check if a video has been loaded so we can get the file url
	chrome.tabs.getCurrent(function (tab) {

		var params = getUrlParameters(tab.url);

		if (params['m'] && params['sv'] && params['url']) {

			// User has loaded a video, get the file url
			var fileUrl = getVideoFileUrl(params['sv'], params['url']);

			// TODO: use the fileUrl to append a player with the video to the page

		}
	});
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
function getUrlParameters (url) {

	var parse = function(params, pairs) {
		var pair = pairs[0];
		var parts = pair.split('=');
		var key = decodeURIComponent(parts[0]);
		var value = decodeURIComponent(parts.slice(1).join('='));

		// Handle multiple parameters of the same name
		if (typeof params[key] === "undefined") {
			params[key] = value;
		} else {
			params[key] = [].concat(params[key], value);
		}

		return pairs.length == 1 ? params : parse(params, pairs.slice(1))
	}

	// Get rid of leading "?""
	return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
}

/*
 * Get video file url based on warez's parameters
 *
 * @param server - The server where the file is hosted
 *
 * @param url - The url string that warez receives as a parameter
 *
 */
function getVideoFileUrl (server, url) {

	// TODO

}
