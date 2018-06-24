const LocalStrategy = require('passport-local').Strategy;
import { LOGIN, PASSWORD, EMAIL, SECRET } from '../config';

const strategy = new LocalStrategy({
	usernameField : 'login',
	passwordField : 'password'
}, (username, password, done) => {
	if (!username || username !== LOGIN) {
		console.log('wrong login');
		return done(null, false);
	}
	if (!password || password !== PASSWORD) {
		console.log('wrong password');
		return done(null, false);
	}
	return done(null, username);
});

export default strategy;