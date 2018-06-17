import products from '../models/products';
import reviews from '../models/reviews';
import users from '../models/users';

function allProducts(request, response) {
	response.send(JSON.stringify(products));
};

function singleProduct(request, response) {
	const id = Number(request.params.id);
	if (!id) response.send('You should pass a product id');
	const searchedProduct = products.filter((product) => product.id === id);
	if (!searchedProduct.length) response.send('No products found with the given id');
	response.send(JSON.stringify(searchedProduct));
};

function productReviews(request, response) {
	const id = Number(request.params.id);
	if (!id) response.send('You should pass a product id');
	const searchedReviews = reviews.filter((review) => review.productId === id);
	if (!searchedReviews.length) response.send('No reviews found with for the given product id');
	response.send(JSON.stringify(searchedReviews));
};

function addProduct(request, response) {
	products.push(request.body);
	response.send(request.body);
};

function allUsers(request, response) {
	response.send(JSON.stringify(users));
};

export default { allProducts, singleProduct, productReviews, addProduct, allUsers };