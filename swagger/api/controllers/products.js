var Product = require('../models/product');

function addProduct(request, response) {
	const reqBody = request.swagger.body;
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
	const id = request.swagger.params.id;
	if (!id) response.send('You should pass a product id');
	return Product.find({ _id: id })
		.then(product => response.json(product))
		.catch(error => response.status(400).send('No products found with the given id'));
};

function deleteProduct(request, response) {
	const id = request.swagger.params.id;
	if (!id) response.send('You should pass a product id');
	return Product.deleteOne({ _id: id })
		.then(() => response.status(201).send('Product deleted'))
		.catch(error => response.status(400).send(error));
};

module.exports = {
	addProduct: addProduct,
	allProducts: allProducts,
	singleProduct: singleProduct,
	deleteProduct: deleteProduct
};