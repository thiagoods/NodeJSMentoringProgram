import cookie from 'cookie';

const cookieParser = (request, response, next) => {
	if(request.headers.cookie) {
		request.parsedCookies = cookie.parse(request.headers.cookie);
	}
	next();
};

export default cookieParser;