const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
	it('should reject non-string value', () => {
		var res = isRealString(1233);
		expect(res).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var res = isRealString('   ');
		expect(res).toBe(false);
	});

	it('should allow string with non-space characters', () => {
		var res = isRealString('  Iro ');
		expect(res).toBe(true);
	});
});