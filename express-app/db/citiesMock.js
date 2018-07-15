const cities = [
	{
		_id: 1,
		name: 'Brest',
		country: 'Belarus',
		capital: false,
		location: {
				lat: 52.0976,
				long: 23.7340
		},
		createdAt: new Date,
	  lastModifiedDate: new Date
	},
	{
		_id: 2,
		name: 'Krakow',
		country: 'Poland',
		capital: false,
		location: {
			lat: 50.0647,
			long: 19.9450
		},
		createdAt: new Date,
	  lastModifiedDate: new Date
	},
	{
		_id: 3,
		name: 'Berlin',
		country: 'Germany',
		capital: true,
		location: {
			lat: 52.5200,
			long: 13.4050
		},
		createdAt: new Date,
	  lastModifiedDate: new Date
	}
];

export default cities;