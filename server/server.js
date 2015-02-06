var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function (socket) {
	
	socket.on('message', function (data) {
		console.log(data);
	});
});

server.listen(8080);