import express from 'express';
import controller from '../controllers';
import authController from '../controllers/authentication';
import tokenVerifier from '../middlewares/tokenverifier';
import passportVerifier from '../middlewares/passportverifier';

const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');

function setRouter(passport) {

	const router = express.Router();

	router.get('/', function(request, response) {
		var token = (request.body && request.body.token) || (request.query && request.query.token) || request.headers['x-access-token'];
		const query = token ? `?token=${token}` : '';
		response.redirect(`/api/products${query}`);
	});

	router.get('/login', function(request, response) {
		response.render('index');
	});

	router.get('/add-product', function(request, response) {
		response.render('addProduct');
	});

	router.get('/add-city', function(request, response) {
		response.render('addCity');
	});

	router.get('/add-user', function(request, response) {
		response.render('addUser');
	});

	if (process.argv[2] === '--jwt') {

		router.post('/auth', function(request, response) {
			authController.authenticateJWT(request, response);
		});

		router.use('/api', tokenVerifier);

	} else if (passport.hasOwnProperty()){
		router.post('/auth',
			passport.authenticate('local', { successRedirect: '/api/products', failureRedirect: '/login' })
		);

		router.get('/auth/facebook',
			passport.authenticate('facebook', { scope: [ 'email' ] })
		);

		router.get('/auth/facebook/cb',
			passport.authenticate('facebook', { successRedirect: '/api/products', failureRedirect: '/login' })
		);

		router.get('/auth/twitter',
			passport.authenticate('twitter')
		);

		router.get('/auth/twitter/cb',
			passport.authenticate('twitter', { successRedirect: '/api/products', failureRedirect: '/login' })
		);

		router.get('/auth/google',
			passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
		);

		router.get('/auth/google/cb',
			passport.authenticate('google', { failureRedirect: '/login' }),
			function(request, response) {
				response.redirect('/');
			}
		);

		router.use('/api', passportVerifier);
	}

	router.get('/api/products', (request, response) => {
		controller.allProducts(request, response);
	});

	router.get('/api/products/:id', (request, response) => {
		controller.singleProduct(request, response);
	});

	router.delete('/api/products/:id', (request, response) => {
		controller.removeProduct(request, response);
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

	router.post('/api/users', (request, response) => {
		controller.addUser(request, response);
	});

	router.delete('/api/users/:id', (request, response) => {
		controller.removeUser(request, response);
	});

	router.get('/api/city', (request, response) => {
		controller.getRandomCity(request, response);
	});

	router.get('/api/cities', (request, response) => {
		controller.allCities(request, response);
	});

	router.post('/api/cities', (request, response) => {
		controller.addCity(request, response);
	});

	router.put('/api/cities/:id', (request, response) => {
		controller.updateCity(request, response);
	});

	router.delete('/api/cities/:id', (request, response) => {
		controller.removeCity(request, response);
	});

	return router;

}

export default setRouter;