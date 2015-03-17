// Create a server and respond to every direct request with a greeting message
var server = require('http').createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Bem vindo ao wareztogether :)');
});

var server_port = process.env.PORT || 8080,
	server_ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
	io = require('socket.io')(server);

io.on('connection', function (socket) {
	
	socket.on('enterRoom', function (data) {

		var roomName = data.roomName;
		
		// Re-test if room name is valid
		if (/^[a-zA-Z0-9-_ ]*$/.test(roomName) === false) {
			return false;
		}

		console.log('Socket entering ' + roomName);

		socket.join(roomName);

		socket.on('start', function (data) {

			console.log('start event!');

			socket.broadcast.to(roomName).emit('start');
		});

		socket.on('pause', function (data) {

			console.log('pause event!');

			socket.broadcast.to(roomName).emit('pause');
		});

		socket.on('resume', function (data) {

			console.log('resume event!');

			socket.broadcast.to(roomName).emit('resume');
		});
	});
});

server.listen(server_port, server_ip);
console.log('Server listening on ' + server_port);