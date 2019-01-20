/**
 *  Message Test Utility - help us to test two types of messages: 
 *  --> text message and 
 *  --> geolocation message,
 *  by following a given template.
 */

var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'Test';
		var text = 'Test Message';
		var res = generateMessage(from, text);
		// expect type of res.createdAt property to be number
		expect(typeof res.createdAt).toBe('number');
		// expect text object to match with given object
		expect(res).toMatchObject({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'GeoTest';
		var latitude = 10;
		var longitude = 23;
		var url = 'https://www.google.com/maps?q=10,23';
		var message = generateLocationMessage(from, latitude, longitude);

		// expect type of res.createdAt property to be number
		expect(typeof message.createdAt).toBe('number');
		// expect url object to match with given object
		expect(message).toMatchObject({from, url});
	});
});