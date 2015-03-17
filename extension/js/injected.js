/*
 * WarezTogether code that is injected into a <script> tag on the iframe page so we can access the player globals (API)
 */

var player = $f();

var firstStart = true;

player.onStart(function () {

	/* 
	 * This event is ignored the first time it runs
	 *
	 * From the API docs: 
	 * "With autoBuffering set to true it even fires when autoPlay is false,
	 *  because the clip is paused at the first frame."
	 *
	 */

	if (firstStart) {

		firstStart = false;

	} else {

		window.postMessage({from: 'wareztogether', action: 'start'}, '*');
	}
});

player.onBeforePause(function () {
	window.postMessage({from: 'wareztogether', action: 'pause'}, '*');
});

player.onBeforeResume(function () {
	window.postMessage({from: 'wareztogether', action: 'resume'}, '*');
});

//
// React to events from server
//

window.addEventListener('message', function (event) {

	var data = event.data;

	if (data.from === 'wareztogether-server') {

		if (data.action === 'start') {

			if (player.isPlaying()) {

				player.seek(0).play();

			} else {

				player.play();
			}

		} else if (data.action === 'pause') {

			player.pause();

		} else if (data.action === 'resume') {

			player.play();
		}
	}
});