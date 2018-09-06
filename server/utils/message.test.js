var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'Test';
		var text = 'Test Message';
		var res = generateMessage(from, text);

		expect(typeof res.createdAt).toBe('number');
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

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, url});
	});
});