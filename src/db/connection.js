// 'use strict'

// const mysql = require('mysql2');
// const nconf = require('nconf');
// const path = require("path");

// // create the connection to database
// nconf.argv().env().file({file: path.join(__dirname, '..', '..', 'config/server.json')});

// // let pool = mysql.createPool({
// //     host: nconf.get('db:host'),
// //     user: nconf.get('db:username'),
// //     password: nconf.get('db:password'),
// //     database: nconf.get('db:database'),
// //     port:  parseInt(nconf.get('db:port')),
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0
// // });

// // exports.conn = pool.promise().getConnection();


// let connection = mysql.createConnection({
//     host     : nconf.get('db:host'),
//     user     : nconf.get('db:username'),
//     password : nconf.get('db:password'),
//     database : nconf.get('db:database')
// });

// exports.connection = connection.connect(function(err) {
//     if (err) {
//         // throw err
//         console.log("fffffffff");
//         console.log(err);
//     };
// });

// // module.exports = connection;