const server = require('./server');
require('dotenv').config();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;

server.listen(port, host, () => {
  console.log(`Server now listening at http://${host}:${port}/`);
});
