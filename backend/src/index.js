'use strict'

const Hapi = require('@hapi/hapi');
const path = require('path');
const nconf = require('nconf');
const routes = require(path.join(__dirname, 'routes.js'));

nconf.argv().env().file({file: path.join(__dirname, '..', 'config/server.json')});

const server = Hapi.server({
    port: parseInt(nconf.get('port')),
    host: nconf.get('host')
});

server.route(routes.routes);

const init = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

