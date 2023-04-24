const server = require('./server');

const host = process.env.HOST || 'blah';
const port = process.env.PORT || 1;

console.log(host, port);

server.listen(port, host, ()=> {
  console.log(`Server now listening at http://${host}:${port}/`);
});