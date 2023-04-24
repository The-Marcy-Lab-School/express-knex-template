const server = require('./server');
require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

server.listen(port, host, ()=> {
  console.log(`Server now listening at http://${host}:${port}/`);
});