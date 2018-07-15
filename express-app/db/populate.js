import City from '../models/city';
import cities from './citiesMock';
import Product from '../models/product';
import products from './productsMock';
import User from '../models/user';
import users from './usersMock';

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

export default populateDB;