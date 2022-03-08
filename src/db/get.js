'use strict'

const path = require("path");
const nconf = require('nconf');
const pool = require(path.join(__dirname, "./conn")).pool;
let conn;

exports.anketa = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    const result =  global.conn.query("SELECT anketa.anketa_id, anketa.name_of_anketa, anketa.category FROM anketa;")
        .then((data) => {
            return data[0];
        }).catch(err => {
            console.log(err);
        })

    return result;
}

exports.children = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    const result = global.conn.query("SELECT children.children_id AS id, children.name, children.surname, children.age, children.weight, children.height FROM children WHERE parents_id = ?",
        [data.parents_id]).then((data) => {
            return data[0];
        }).catch(err => {
            console.log(err);
        })

    return result;
}