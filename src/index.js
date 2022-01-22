'use strict'

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');
const nconf = require('nconf');
const AuthBearer = require('hapi-auth-bearer-token');
const routes = require(path.join(__dirname, 'routes.js'));
const jwt = require(path.join(__dirname, './db/jwt.js'));
const util = require('util');
const exec = util.promisify(require('child_process').exec);


nconf.argv().env().file({file: path.join(__dirname, '..', 'config/server.json')});

const server = Hapi.server({
    port: parseInt(process.env.PORT || nconf.get('port')),
    host: nconf.get('host'),
    routes: {
        cors: {
            // origin: ["https://dubr-irc.tk"],
            origin: ["http://localhost:3000"],
            additionalHeaders: ["Custom"]
        },
        files: {
            relativeTo: path.join(__dirname, '../public')
        }
    },
    // methods: ['DELETE', 'GET', 'POST', 'PUT']
    // routes: { cors: { origin: "ignore" } }
});

async function build() {
    const { stdout, stderr } = await exec('cd frontend && REACT_APP_PORT=$PORT npm run build && cp -a build/. ../public');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }

const init = async () => {
    await build()
    await server.register(Inert)
    await server.register(AuthBearer)

    server.auth.strategy('jwt', 'bearer-access-token', {
        validate: async (request, token, h) => {
            const decoded = await jwt.verifyToken(token);
            const { isvalid } = decoded
            const {  username, first_name, last_name, role } = decoded.user
            const isValid = isvalid;

            const credentials = { token };
            const artifacts = { username, first_name, last_name, role };

            return { isValid, credentials, artifacts };
        }
    });

    server.route(routes.routes);
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

