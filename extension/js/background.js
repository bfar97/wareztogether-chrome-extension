var socket = io('localhost:3000');

console.log('Emitting socket message');
socket.emit('message', { my: 'data' });