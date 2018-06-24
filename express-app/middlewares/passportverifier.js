function authenticatePassport(request, response, next) {
	if (request.isAuthenticated()) {
		return next();
	}
	response.status(404).send('User not found');
}

export default authenticatePassport;