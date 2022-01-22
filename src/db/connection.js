'use strict'

const mysql = require('mysql2');
const nconf = require('nconf');
const path = require("path");

// create the connection to database
nconf.argv().env().file({file: path.join(__dirname, '..', '..', 'config/server.json')});

exports.pool = mysql.createPool({
    host: nconf.get('db:host'),
    user: nconf.get('db:username'),
    password: nconf.get('db:password'),
    database: nconf.get('db:database'),
    port:  parseInt(nconf.get('db:port')),
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});