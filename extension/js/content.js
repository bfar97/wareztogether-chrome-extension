document.title = "WarezTogether";


$(document).ready(function () {

	chrome.runtime.sendMessage({from: 'wareztogether', action: 'init'}, function(response) {
		//alert(response.message);
	});

	$('#play-box').on('click', function (event) {
		//alert('You\'ve just clicked the video container!');

		chrome.runtime.sendMessage({from: 'wareztogether', message: 'clicked some stuff!'});
	});

	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

		if (request.from === 'wareztogether') {
			//alert(request.message);
		}
	});


});
