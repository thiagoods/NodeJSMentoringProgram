import jwt from 'jsonwebtoken';
import { LOGIN, PASSWORD, EMAIL, SECRET } from '../config';

function authenticateJWT(request, response) {
	const { login, password } = request.body;
	if( LOGIN === login && PASSWORD === password) {
		const user = { email: EMAIL, username: login };
		const token = jwt.sign(user, SECRET, {
			expiresIn: 1440
		});
		response.redirect(`/api/products?token=${token}`);
	} else {
		response.status(404).send('User not found');
	}
}

export default { authenticateJWT };