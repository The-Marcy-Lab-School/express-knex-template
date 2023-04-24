// src/db/knex.js
const env = process.env.ENVIRONMENT || 'development';
const knexConfig = require('../../../knexfile')[env];
const knex = require('knex')(knexConfig);

module.exports = knex;