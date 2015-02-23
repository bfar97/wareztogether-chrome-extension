var warezTabId = false;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether' && request.action === 'init') {
		
		warezTabId = sender.tab.id;
		sendResponse(true);

		// Show page action
		chrome.pageAction.show(warezTabId);
	}
});