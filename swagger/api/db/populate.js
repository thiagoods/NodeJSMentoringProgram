var City = require('../models/city');
var cities = require('./citiesMock');
var Product = require('../models/product');
var products = require('./productsMock');
var User = require('../models/user');
var users = require('./usersMock');

function batchInserts(model, array) {
	array.forEach(item => {
		model.update(
			{ _id: item._id },
			{ $setOnInsert: item },
			{ upsert: true },
			(err, numAffected) => { console.log(numAffected) }
		);
	});
}

function populateDB() {
	batchInserts(Product, products);
	batchInserts(User, users);
	batchInserts(City, cities);
}

module.exports = populateDB;