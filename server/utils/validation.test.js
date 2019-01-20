/**
 *  String Validator Test Utilty - test the String Validator 
 */

const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
	it('should reject non-string value', () => {
		var res = isRealString(1233);
		// validate if numbers are strings
		expect(res).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var res = isRealString('   ');
		// validate if empty spaces are strings
		expect(res).toBe(false);
	});

	it('should allow string with non-space characters', () => {
		var res = isRealString('  Iro ');
		// validate if strings with empty spaces around are strings
		expect(res).toBe(true);
	});
});