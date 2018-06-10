import http from 'http';

const PORT_NUMBER = 3000;

const requestHandler = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

const server = http.createServer(requestHandler)

server.listen(PORT_NUMBER, (error) => {
  if (error) {
    return console.log('Something wrong happened', error);
  }

  console.log(`Server is listening on ${PORT_NUMBER}`);
});