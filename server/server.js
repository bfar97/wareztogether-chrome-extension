// Create a server and respond to every direct request with a greeting message
var server = require('http').createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Bem vindo ao wareztogether :)');
});

var io = require('socket.io')(server),
	rooms = [];

io.on('connection', function (socket) {
	
	socket.on('init', function (data) {
		console.log(data);
	});
});

server.listen(8080);

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