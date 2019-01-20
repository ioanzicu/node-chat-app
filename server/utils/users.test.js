/**
 *  Users Class Test Utility - test functionality of the class's method 
 */

const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;

	// create an array with users objects
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'Bika',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Cika',
			room: 'Node Course'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Iro',
			room: 'The Office Fans'
		};
		// add new user to the users array
		var resUser = users.addUser(user.id, user.name, user.room);
		// expect that new user is in the users array
		expect(users.users).toEqual([user]);
	});

	it('should remove the user', () => {
		var userId = '2';
		// remmove user from the users array with id 2
		var user = users.removeUser(userId);
		// expect that removed user has id 2
		expect(user.id).toBe(userId);
		// expect that users array length is now 2
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		var userId = '333';
		// remmove user from the users array with id 333
		var user = users.removeUser(userId);
		// expect to not remove, becouse there is not user with such id
		expect(user).toBeFalsy();
		// expect that users array length to be the same 3
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var userId = '1';
		// get user with id 1
		var user = users.getUser(userId);
		// expect that user with id 1 was found
		expect(user.id).toBe(userId);
	});

	it('should not find user', () => {
		var userId = '333';
		// get user with id 333
		var user = users.getUser(userId);
		// expect that user with id 333 was not found
		expect(user).toBeFalsy();
	});

	it('should return names for node course', () => {
		// get user lists wich have the same course
		var userList = users.getUserList('Node Course');
		// expect to be an array with 2 users ['Mike', 'Cika']
		expect(userList).toEqual(['Mike', 'Cika']);
	});

	it('should return names for react course', () => {
		// get user lists wich have the same course
		var userList = users.getUserList('React Course');
		// expect to be an array with one users ['Bika']
		expect(userList).toEqual(['Bika']);
	});
});