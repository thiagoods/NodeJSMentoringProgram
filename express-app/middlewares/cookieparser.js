import cookie from 'cookie';

const cookieParser = (request, response, next) => {
	request.parsedCookies = cookie.parse(request.headers.cookie);
	next();
};

export default cookieParser;