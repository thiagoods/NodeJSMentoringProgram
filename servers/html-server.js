import http from 'http';
import { readFileSync, createReadStream } from 'fs';
import through2 from 'through2';
import path from 'path';

const PORT_NUMBER = 3000;
const INDEX_FILE = path.join(__dirname, 'index.html');

const requestHandler = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });

	if (process.argv[2] === '--stream') {
		const transformer = through2(function(chunk, encode, callback) {
			this.push(chunk.toString().replace('{message}', 'Hello Stream World!'));
      callback();
    });
    createReadStream(INDEX_FILE)
		.pipe(transformer)
		.pipe(response);
  } else {
		let content = readFileSync(INDEX_FILE, 'utf8');
		const responseBody = content.toString().replace('{message}', 'Hello ReadFileSync World!');
		response.end(responseBody);
  };
}

const server = http.createServer(requestHandler)

server.listen(PORT_NUMBER, (error) => {
  if (error) {
    return console.log('Something wrong happened', error);
  }

  console.log(`Server is listening on ${PORT_NUMBER}`);
});