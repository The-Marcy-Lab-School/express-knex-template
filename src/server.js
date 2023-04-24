const express = require('express');
const path = require('path');
const logRoutes = require('./middleware/log-routes');
const routes = require('./routes');

const server = express();
const publicDir = path.join(__dirname, '..', 'public');

server.use(logRoutes);
server.use(express.json());
server.use(express.static(publicDir));

server.use(routes);

module.exports = server;