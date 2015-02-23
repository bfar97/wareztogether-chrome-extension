var server = require('http').createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Bem vindo ao wareztogether :)');
});
var io = require('socket.io')(server);

io.on('connection', function (socket) {
	
	socket.on('message', function (data) {
		console.log(data);
	});
});

server.listen(8080);