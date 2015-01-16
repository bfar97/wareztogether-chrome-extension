/*var socket = io('localhost:3000');
console.log('Emitting socket message');
socket.emit('message', { my: 'data' });*/

var warezTabId = false;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether') {

		if (request.action === 'init') {

			warezTabId = sender.tab.id;
			sendResponse({message: 'all ok!'});

		} else {
			console.log(request.message);

			chrome.tabs.sendMessage(warezTabId, {from: 'wareztogether', message: 'clicked the container!'}, function(response) {
				console.log(response.message);
			});
		}
	}
});