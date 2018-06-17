import http from 'http';
import { readFileSync, createReadStream } from 'fs';

const PORT_NUMBER = 3000;

const requestHandler = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	request.pipe(response);
}

const server = http.createServer(requestHandler)

server.listen(PORT_NUMBER, (error) => {
  if (error) {
    return console.log('Something wrong happened', error);
  }

  console.log(`Server is listening on ${PORT_NUMBER}`);
});