const FacebookStrategy = require('passport-facebook').Strategy;

const strategy = new FacebookStrategy({
	clientID: 'CLIENT_ID',
	clientSecret: 'CLIENT_SECRET',
	callbackURL: "https://nodejsmentoring.herokuapp.com/auth/facebook/cb"
}, (accessToken, refreshToken, profile, done) => {
	process.nextTick( function() {
		return done(null, profile);
	});
});

export default strategy;