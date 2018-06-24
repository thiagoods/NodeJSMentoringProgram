import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

const tokenVerifier = (request, response, next) => {
	var token = (request.body && request.body.token) || (request.query && request.query.token) || request.headers['x-access-token'];
	if (token) {
		jwt.verify(token, SECRET, (error, decoded) => {
			if (error) {
				response.status(403).send('Wrong Token');
			}
			else{
				request.decoded = decoded;
				next();
			}
		});
	} else {
		response.status(403).json('No token sent');
	}
};

export default tokenVerifier;