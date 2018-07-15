import City from '../models/city';
import Product from '../models/product';
import User from '../models/user';
import Review from '../models/review';

function addProduct(request, response) {
	const reqBody = request.body;
	const newProduct = new Product({
		_id: reqBody._id,
		name: reqBody.name,
		brand: reqBody.brand,
		price: reqBody.price,
		color: reqBody.color,
		size: reqBody.size
	});
	return newProduct.save({})
		.then(product => response.status(201).send(product))
		.catch(error => response.status(400).send(error));
};

function allProducts(request, response) {
	return Product.find({}).then(product => response.json(product));
};

function singleProduct(request, response) {
	const id = request.params.id;
	if (!id) response.send('You should pass a product id');
	return Product.find({ _id: id })
		.then(product => response.json(product))
		.catch(error => response.status(400).send('No products found with the given id'));
};

function productReviews(request, response) {
	const id = request.params.id;
	if (!id) response.send('You should pass a product id');
	return Review.find({ productId: id })
		.then(reviews => response.json(reviews))
		.catch(error => response.status(400).send('No reviews found for the given product id'));
};

function removeProduct(request, response) {
	const id = request.params.id;
	if (!id) response.send('You should pass a product id');
	return Product.deleteOne({ _id: id })
		.then(() => response.status(201).send('Product deleted'))
		.catch(error => response.status(400).send(error));
};

function addUser(request, response) {
	const reqBody = request.body;
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

function removeUser(request, response) {
	const id = request.params.id;
	if (!id) response.send('You should pass a user id');
	return User.deleteOne({ _id: id })
	.then(() => response.status(201).send('User deleted'))
	.catch(error => response.status(400).send(error));
};

function addCity(request, response) {
	const reqBody = request.body;
	const newCity = new City({
		_id: reqBody._id,
		name: reqBody.name,
		country: reqBody.country,
		capital: (reqBody.isCapital === 'on'),
		location: {
			lat: reqBody.lat,
			long: reqBody.long
		}
	});
	return newCity.save({})
		.then(city => response.status(201).send(city))
		.catch(error => response.status(400).send(error));
};

function allCities(request, response) {
	return City.find({}).then(cities => response.json(cities));
};

function getRandomCity(request, response) {
	return City.find({}).then(cities => response.json(cities[Math.floor(Math.random() * cities.length)]));
};

function updateCity(request, response) {
	const id = request.params.id;
	if (!id) {
		return response.send('You should pass a city id');
	}
	const reqBody = request.body;
	const newCity = {
		_id: reqBody._id,
		name: reqBody.name,
		country: reqBody.country,
		capital: (reqBody.isCapital === 'on'),
		location: {
			lat: reqBody.lat,
			long: reqBody.long
		},
		createdAt: new Date(),
		lastModifiedDate: new Date()
	};
	return City.findByIdAndUpdate(
		id,
		{ ...newCity },
		{ upsert: true },
		(err, numAffected) => { response.status(201).send(newCity) }
	);
};

function removeCity(request, response) {
	const id = request.params.id;
	if (!id) response.send('You should pass a city id');
	return City.findOneAndRemove({ _id: id })
		.then(() => response.status(201).send('City deleted'))
		.catch(error => response.status(400).send(error));
};

export default {
	addProduct,
	allProducts,
	singleProduct,
	removeProduct,
	productReviews,
	addUser,
	allUsers,
	removeUser,
	addCity,
	allCities,
	getRandomCity,
	updateCity,
	removeCity
};