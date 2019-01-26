// include node modules
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// include utilities
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// define public folder
const publicPath = path.join(__dirname, '../public');
// define port number dynamic or static
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
// create new users object
var users = new Users();

// make local directory accessible to express
app.use(express.static(publicPath));

// CONNECTION OF A NEW USER
io.on('connection', (socket) => {
	// listen to the event join
	socket.on('join', (params, callback) => {
		var room = params.room.toLowerCase();
		// check if the user entered the name and room
		if (!isRealString(params.name) || !isRealString(room)) {
			return callback('Name and room name are required.');
		}

		// join user to the room
		socket.join(room);
		
		users.removeUser(socket.id);
		
		// add new user 		
		users.addUser(socket.id, params.name, room);
		// update the list of users
		io.to(room).emit('updateUserList', users.getUserList(room));
		// welcome new user
		socket.emit('newMessage', generateMessage('ChatApp Administration:', 'Welcome to the chat app'));
		// broadcast that new user was joined
		socket.broadcast.to(room).emit('newMessage', generateMessage('ChatApp Administration:', `${params.name} has joined.`));

		callback();
	});

	// SEND TEXT MESSAGE
	socket.on('createMessage', (message, callback) => {
		// track user by id
		var user = users.getUser(socket.id);
		// check validity of the text message
		if (user && isRealString(message.text)) {
			// emit text message to the chat room 
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}

		callback();
	});

	// SEND GEOLOCATION MESSAGE
	socket.on('createLocationMessage', (coords) => {
		// track user by id
		var user = users.getUser(socket.id);

		if (user) {
			// emit geolocation message to the chat room 
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	// DISCONNECT FROM THE ROOM
	socket.on('disconnect', () => {
		// remove user from the connected users
		var user = users.removeUser(socket.id);

		if (user) {
			// update conected users list
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			// emit message that user has left the room
			io.to(user.room).emit('newMessage', generateMessage(`${user.name} has left.`));
		}
	});
});

// server is listening on given port
server.listen(port, () => {
	console.log(`Server start up on port ${port}`);
})