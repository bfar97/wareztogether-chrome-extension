$('#create-button').on('click', function (e) {

	var roomName = $('#create-input').val();

	if (/^[a-zA-Z0-9-_ ]*$/.test(roomName) === false) {

		$('#error-message').html('O nome da sala deve conter apenas letras, números, espaços, "-" e "_".');
	}

	chrome.runtime.sendMessage({
		from: 'wareztogether',
		action: 'createRoom',
		roomName: roomName
	},
	function (response) {

		if (!response) {
			console.log('WarezTogether: ERROR - Failed to create room.');	
		}
	});

});

$('#enter-button').on('click', function (e) {

});