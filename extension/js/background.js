var warezTabId = false;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	if (request.from === 'wareztogether' && request.action === 'showPageAction') {
		
		warezTabId = sender.tab.id;
		sendResponse(true);

		// Show page action
		chrome.pageAction.show(warezTabId);
	}
});