const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const strategy = new GoogleStrategy({
	clientID: 'CLIENT_ID',
	clientSecret: 'CLIENT_SECRET',
	callbackURL: "https://nodejsmentoring.herokuapp.com/api/products"
}, (token, tokenSecret, profile, done) => {
	process.nextTick( function() {
		return done(null, profile);
	});
});

export default strategy;