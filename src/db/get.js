'use strict'

const path = require("path");
const pool = require(path.join(__dirname, "./connection")).pool;

exports.anketa = async (data) => {
    const conn =  await pool.promise().getConnection();

    const result =  conn.query("SELECT anketa.anketa_id, anketa.name_of_anketa, anketa.category FROM anketa;")
        .then((data) => {
            return data[0];
        }).catch(err => {
            console.log(err);
        })

    await pool.releaseConnection(conn);

    return result;
}

exports.children = async (data) => {
    const conn =  await pool.promise().getConnection();

    const result = conn.query("SELECT children.children_id AS id, children.name, children.surname, children.age, children.weight, children.height FROM children WHERE parents_id = ?",
        [data.parents_id]).then((data) => {
            return data[0];
        }).catch(err => {
            console.log(err);
        })

    await pool.releaseConnection(conn);

    return result;
}