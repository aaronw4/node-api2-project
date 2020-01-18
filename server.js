const express = require('express');
//const blogRouter = require()

const server = express();

server.use(express.json());
server.use('/api/posts', blogRouter);

module.exports = server