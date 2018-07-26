var Review = require('../models/review');

function productReviews(request, response) {
	const id = request.swagger.params.id;
	if (!id) response.send('You should pass a product id');
	return Review.find({ productId: id })
		.then(reviews => response.json(reviews))
		.catch(error => response.status(400).send('No reviews found for the given product id'));
};

module.exports = {
	productReviews: productReviews
};