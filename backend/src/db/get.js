'use strict'

const path = require("path");
const conn = require(path.join(__dirname, "./connection")).db_conn;

exports.anketa = async (data) => {
    return conn().execute("SELECT anketa.anketa_id, anketa.name_of_anketa, anketa.category FROM anketa;")
        .then((data) => {
            return data[0];
        }).catch(err => {
            console.log(err);
        })
}

exports.children = async (data) => {
    return conn().execute("SELECT children.children_id AS id, children.name, children.surname, children.age, children.weight, children.height FROM children WHERE parents_id = ?",
        [data.parents_id]).then((data) => {
            return data[0];
        }).catch(err => {
            console.log(err);
        })
}