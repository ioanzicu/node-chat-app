var socket = io();

function scrollToBottom() {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	// Formula for scrolling to the new message if user is near to the bottom 
	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

// CONNECT
socket.on('connect', function () {
	var params = jQuery.deparam(window.location.search);

	// Join to the new room
	socket.emit('join', params, function (err) {
		// if user didn't enter the name or room
		if (err) {
			// inform user about error
			alert(err);
			// redirect to the welcome page
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

// DISCONNECT
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// Join a new user
socket.on('updateUserList', function(users) {
	// prepare an ordered list
	var ol = jQuery('<ol></ol>');
	// append each user to the ordered list 
	users.forEach(function (user) {
		ol.append(jQuery('<li></li>').text(user));
	});
	// append ordered list to the bar with id #users
	jQuery('#users').html(ol);
});

// NEW MESSAGE
socket.on('newMessage', function (message) {
	// format the time (Hours : Minutes : am | pm)
	var formattedTime = moment(message.createdAt).format('h:mm a');
	// add formated time to the script with id #message-template
	var template = jQuery('#message-template').html();
	// render object to the template using Mustachee
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	// append rendered template to the ordered list with id #messages
	jQuery('#messages').append(html);
	// scroll to the bottom for new message
	scrollToBottom();
});

// NEW LOCATION
socket.on('newLocationMessage', function (message) {
	// format the time (Hours : Minutes : am | pm)
	var formattedTime = moment(message.createdAt).format('h:mm a');
	// add formated time to the script with id #message-template
	var template = jQuery('#location-message-template').html();
	// render object to the template using Mustache
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});

	// append rendered template to the ordered list with id #messages
	jQuery('#messages').append(html);
	// scroll to the bottom for new message
	scrollToBottom();
});

// FORM
jQuery('#message-form').on('submit', function (e) {
	// prevent default page reloading after submiting new message
	e.preventDefault();
	// initialize an message text box container to hold message content
	var messageTextbox = jQuery('[name=message]');

	// create the new message with the given content
	socket.emit('createMessage', {
		text: messageTextbox.val()
	}, function () {
		// clear the message text box
		messageTextbox.val('');
	});
});

// SEND LOCATION
var locationButton = jQuery('#send-location');
// send location on click event on the button
jQuery('#send-location').on('click', function () {
	// check if the browser support jQuery api geolocation 
	if (!navigator.geolocation) {
		return alert('Geologation not supported by your browser.');
	} 
	// change the text of the button, when geolocation is loading and disable the button
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	// create a location message with coordinates longitude and latitude
	navigator.geolocation.getCurrentPosition(function (position) {
		// reverse content button back and enable the button
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		// if there are some errors, alert to the user, and enable the button
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});