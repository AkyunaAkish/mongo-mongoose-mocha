const express = require('express');
const server = express();

const routes = require('./routes/routes');

routes(server);

module.exports = server;