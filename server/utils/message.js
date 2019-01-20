/**
 *  Message Utility - help us to create two types of messages: 
 *  --> text message and 
 *  --> geolocation message,
 *  by following a given template.
 */

var moment = require('moment');

var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	};
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	}
};

module.exports = {generateMessage, generateLocationMessage};