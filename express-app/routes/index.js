import express from 'express';
import controller from '../controllers';

const router = express.Router();

router.get('/', function(request, response) {
  response.redirect('/api/products');
});

router.get('/api/products', (request, response) => {
  controller.allProducts(request, response);
});

router.get('/api/products/:id', (request, response) => {
	controller.singleProduct(request, response);
});

router.get('/api/products/:id/reviews', (request, response) => {
	controller.productReviews(request, response);
});

router.post('/api/products', (request, response) => {
	controller.addProduct(request, response);
});

router.get('/api/users', (request, response) => {
	controller.allUsers(request, response);
});

export default router;