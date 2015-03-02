// Create a server and respond to every direct request with a greeting message
var server = require('http').createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Bem vindo ao wareztogether :)');
});

var io = require('socket.io')(server),
	rooms = [];

io.on('connection', function (socket) {
	
	socket.on('createRoom', function (data) {

		var roomName = data.roomName;
		
		// Re-test if room name is valid
		if (/^[a-zA-Z0-9-_ ]*$/.test(roomName) === false) {
			return false;
		}

		console.log('Someone is creating ' + roomName);

		socket.join(roomName);

		io.to(roomName).emit('hello');
	});
});

server.listen(8080);
console.log('Server listening on 8080')

//
// Internal functions
//

/*
 * Get a unique user ID
 */
var lastId = 0;

function getId () {
	return lastId++;
}