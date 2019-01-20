/**
 *  String Validator Utilty - validate the string 
 */

var isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};