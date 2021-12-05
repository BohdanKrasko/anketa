'use strict'

const mysql = require('mysql2');
const nconf = require('nconf');
const path = require("path");

// create the connection to database
nconf.argv().env().file({file: path.join(__dirname, '..', '..', 'config/server.json')});

exports.db_conn =  function() {
    try {
        return mysql.createPool({
            host: nconf.get('db:host'),
            user: nconf.get('db:username'),
            password: nconf.get('db:password'),
            database: nconf.get('db:database'),
            port:  parseInt(nconf.get('db:port')),
            waitForConnections: true,
            connectionLimit: 30,
            queueLimit: 0
        }).promise();
    } catch (error) {
        console.log(err)
    }
}

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

// mysql.createPool({
//     host: nconf.get('db:host'),
//     user: nconf.get('db:username'),
//     password: nconf.get('db:password'),
//     database: nconf.get('db:database'),
//     port:  parseInt(nconf.get('db:port')),
//     waitForConnections: true,
//     connectionLimit: 30,
//     queueLimit: 0
// })