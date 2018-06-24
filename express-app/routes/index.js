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

	if (process.argv[2] === '--jwt') {

		router.post('/auth', function(request, response) {
			authController.authenticateJWT(request, response);
		});

		router.use('/api', tokenVerifier);

	} else {
		router.post('/auth', function(request, response, next) {
			passport.authenticate('local', function(error, user, info) {
				if (error) { return next(error); }
				if (!user) { return response.redirect('/login'); }
				request.logIn(user, function(error) {
					if (error) { return next(error); }
					return response.redirect('/api/products');
				});
			})(request, response, next)
		});

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

	router.get('/api/products/:id/reviews', (request, response) => {
		controller.productReviews(request, response);
	});

	router.post('/api/products', (request, response) => {
		controller.addProduct(request, response);
	});

	router.get('/api/users', (request, response) => {
		controller.allUsers(request, response);
	});

	return router;

}

export default setRouter;