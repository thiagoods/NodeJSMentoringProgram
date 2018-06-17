import url from 'url';

const queryParser = (request, response, next) => {
	request.parsedQuery = url.parse(request.url, true).query;
	next();
};

export default queryParser;