'use strict';

var env = process.env,
	log = console.log.bind(console),
    restify = require('restify'),
    Pool = require('pg').Pool,
    config = {
        host: env.POSTGRES_HOST,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB
    },
    pool = new Pool(config),
    server = restify.createServer();

server.get('/', function(req, res, next) {
    log(config);
    res.send(200, {hello: env.MESSAGE});
    next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

