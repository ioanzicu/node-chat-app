/**
 *  Users Class Utility - hold necesarry method 
 *  which  we need for managing users connected to the room
 */

class Users {
	// create an users empty array
	constructor () {
		this.users = [];
	}

	// add new user to the room and return it
	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user; 
	}

	// remove the user form the users array
	removeUser(id) {
		var user = this.getUser(id);

		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
		}

		return user;
	}

	// return the uniq identifier of the user
	getUser(id) {
		return this.users.filter((user) => user.id === id)[0];
	}

	// return an array containing the users connected to the given room
	getUserList(room) {
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);

		return namesArray;
	}
}

module.exports = {Users};
