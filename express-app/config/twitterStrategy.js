const TwitterStrategy = require('passport-twitter').Strategy;

const strategy = new TwitterStrategy({
	consumerKey: 'CONSUMER_KEY',
	consumerSecret: 'CONSUMER_SECRET',
	callbackURL: "https://nodejsmentoring.herokuapp.com/auth/twitter/cb"
}, (token, tokenSecret, profile, done) => {
	process.nextTick( function() {
		return done(null, profile);
	});
});

export default strategy;