var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'Test';
		var text = 'Test Message';
		var res = generateMessage(from, text);

		expect(typeof res.createdAt).toBe('number');
		expect(res).toMatchObject({from, text});
	});
});