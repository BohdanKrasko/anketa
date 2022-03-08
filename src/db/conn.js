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
    connectionLimit: nconf.get('db:connection_limit'),
    queueLimit: 0
});

// exports.conn = async () =>  { 
//     const result = await pool.promise().getConnection();
//     console.log("result")
//     console.log(pool._allConnections.length);
//     console.log("result")
//     return result;
// };