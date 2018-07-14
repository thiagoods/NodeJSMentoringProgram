import db from '../models';

function allProducts(request, response) {
	return db.productModel.findAll().then(product => response.json(product));
};

function singleProduct(request, response) {
	const id = Number(request.params.id);
	if (!id) response.send('You should pass a product id');
	return db.productModel.findById(id)
		.then(product => response.json(product))
		.catch(error => response.status(400).send('No products found with the given id'));
};

function productReviews(request, response) {
	const id = Number(request.params.id);
	if (!id) response.send('You should pass a product id');
	return db.reviewModel.findAll({
			where: {
				productId: id
			}
		})
		.then(reviews => response.json(reviews))
		.catch(error => response.status(400).send('No reviews found for the given product id'));
};

function addProduct(request, response) {
	return db.productModel.create(request.body)
		.then(product => response.status(201).send(product))
		.catch(error => response.status(400).send(error));
};

function addUser(request, response) {
	return db.userModel.create(request.body)
		.then(user => response.status(201).send(user))
		.catch(error => response.status(400).send(error));
};

function allUsers(request, response) {
	db.userModel.findAll().then(users => response.json(users));
};

export default { allProducts, singleProduct, productReviews, addProduct, addUser, allUsers };