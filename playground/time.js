var moment = require('moment');

// Jan 1970 00:00:10 am

// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do YYYY'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

// 10:35 am
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));