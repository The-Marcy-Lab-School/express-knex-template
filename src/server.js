const express = require('express');
const path = require('path');
const logRoutes = require('./middleware/log-routes');
const routes = require('./routes');

const app = express();
const publicDir = path.join(__dirname, '..', 'public');

// Remember, order matters when registering middleware and routes!
app.use(logRoutes);
app.use(express.json());
app.use(express.static(publicDir));

app.use(routes);

module.exports = app;
