var City = require('../models/city');

function addCity(request, response) {
	const reqBody = request.swagger.body;
	const newCity = new City({
		_id: reqBody._id,
		name: reqBody.name,
		country: reqBody.country,
		capital: (reqBody.isCapital === 'on'),
		location: {
			lat: reqBody.lat,
			long: reqBody.long
		}
	});
	return newCity.save({})
	.then(city => response.status(201).send(city))
	.catch(error => response.status(400).send(error));
};

function allCities(request, response) {
	return City.find({}).then(cities => response.json(cities));
};

function randomCity(request, response) {
	return City.find({}).then(cities => response.json(cities[Math.floor(Math.random() * cities.length)]));
};

function updateCity(request, response) {
	const id = request.swagger.params.id;
	if (!id) {
		return response.send('You should pass a city id');
	}
	const reqBody = request.swagger.body;
	const newCity = {
		_id: reqBody._id,
		name: reqBody.name,
		country: reqBody.country,
		capital: (reqBody.isCapital === 'on'),
		location: {
			lat: reqBody.lat,
			long: reqBody.long
		},
		createdAt: new Date(),
		lastModifiedDate: new Date()
	};
	return City.findByIdAndUpdate(
		id,
		{ ...newCity },
		{ upsert: true },
		(err, numAffected) => { response.status(201).send(newCity) }
	);
};

function deleteCity(request, response) {
	const id = request.swagger.params.id;
	if (!id) response.send('You should pass a city id');
	return City.findOneAndRemove({ _id: id })
	.then(() => response.status(201).send('City deleted'))
	.catch(error => response.status(400).send(error));
};

module.exports = {
	addCity: addCity,
	allCities: allCities,
	randomCity: randomCity,
	updateCity: updateCity,
	deleteCity: deleteCity
}