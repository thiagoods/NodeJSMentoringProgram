import express from 'express';
import setRouter from './routes';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { SECRET } from './config';
import strategy from './config/strategy';
import facebookStrategy from './config/facebookStrategy';
import twitterStrategy from './config/twitterStrategy';
import googleStrategy from './config/googleStrategy';
import cookieParser from './middlewares/cookieparser';
import queryParser from './middlewares/queryparser';
import pug from 'pug';

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(queryParser);
app.use(session({ secret: SECRET }));
if(process.argv[2] === '--jwt') {
	app.use(setRouter({}));
} else {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(strategy);
	passport.use(facebookStrategy);
	passport.use(twitterStrategy);
	passport.use(googleStrategy);
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
	app.use(setRouter(passport));
}

export default app;