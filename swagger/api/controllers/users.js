var User = require('../models/user');

function addUser(request, response) {
	const reqBody = request.swagger.body;
	const newProduct = new User({
		_id: reqBody._id,
		name: reqBody.name
	});
	return newUser.save({})
	.then(user => response.status(201).send(user))
	.catch(error => response.status(400).send(error));
};

function allUsers(request, response) {
	return User.find({}).then(users => response.json(users));
};

function deleteUser(request, response) {
	const id = request.swagger.params.id;
	if (!id) response.send('You should pass a user id');
	return User.deleteOne({ _id: id })
	.then(() => response.status(201).send('User deleted'))
	.catch(error => response.status(400).send(error));
};

module.exports = {
	addUser: addUser,
	allUsers: allUsers,
	deleteUser: deleteUser
};