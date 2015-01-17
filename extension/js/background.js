//
// Not in use right now, this file is possibly going to be deleted
//


/*var socket = io('localhost:3000');
console.log('Emitting socket message');
socket.emit('message', { my: 'data' });*/

var warezTabId = false;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether' && request.action === 'init') {
		
		warezTabId = sender.tab.id;
		sendResponse(true);
	}

});