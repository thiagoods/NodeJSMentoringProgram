import http from 'http';

const PORT_NUMBER = 3000;

const product = {
	id: 1,
	name: 'Supreme T-Shirt',
	brand: 'Supreme',
	price: 99.99,
	options: [
			{ color: 'blue' },
			{ size: 'XL' }
	]
};

const requestHandler = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(product));
}

const server = http.createServer(requestHandler)

server.listen(PORT_NUMBER, (error) => {
  if (error) {
    return console.log('Something wrong happened', error);
  }

  console.log(`Server is listening on ${PORT_NUMBER}`);
});
