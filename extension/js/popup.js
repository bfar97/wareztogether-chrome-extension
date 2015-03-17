$(document).ready(function () {

	var currentTab;

	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		currentTab = tabs[0];
	});

	$('#enter-button').on('click', function (e) {
		var roomName = $('#enter-input').val();

		if (/^[a-zA-Z0-9-_ ]*$/.test(roomName) === false) {

			$('#error-message').html('O nome da sala deve conter apenas letras, números, espaços, "-" e "_".').fadeIn(200);
		} else {

			$('#error-message').fadeOut(200);
		}

		chrome.tabs.sendMessage(currentTab.id, {from: 'wareztogether', action: 'enterRoom', roomName: roomName}, function (response) {

			if (!response) {

				console.log('WarezTogether: ERROR - Failed to enter room.');

			} else {

				$('#success-message').html('Entraste na sala ' + roomName + ' com sucesso!');

			}
		});
	});

});