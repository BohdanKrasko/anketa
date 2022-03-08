'use strict'

const path = require("path");
const nconf = require('nconf');
const pool = require(path.join(__dirname, "./conn")).pool;
let conn;

exports.user = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    global.conn.query("INSERT INTO \
                    user (username,password,name,surname,po_batkovi,age,weight,phone_number,email) \
                VALUES \
                    (?,?,?,?,?,?,?,?,?);",
        [data.username, data.password, data.name, data.surname, data.po_batkovi, data.age, data.weight, data.phone_number, data.email]).catch(err => {
            console.log(err);
        });
}

exports.anketa = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    global.conn.query("INSERT INTO \
                    anketa (name_of_anketa) \
                VALUES \
                    (?);", [data.name_of_anketa]).catch(err => {
                        console.log(err);
                    })
}

exports.section = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    for (const value of data.sections) {
        global.conn.query("INSERT INTO \
                        section (name_of_section, anketa_id) \
                    VALUES \
                        (?,?);", [value.name_of_section, value.anketa_id]).catch(err => {
                            console.log(err);
                        });
    }
}

exports.question = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    await data.questions.reduce(async (memo, value) => {
        await memo;
        await global.conn.query("INSERT INTO \
            question (question, section_id) \
        VALUES \
            (?,?); \
        ", [value.question, value.section_id]).then(() => {
            return global.conn.query("SELECT question_id FROM question ORDER BY question_id DESC LIMIT 1;")
        }).then((data) => {
            const question_id = data[0][0].question_id;
            for (const v of value.answers) {
                global.conn.query("INSERT INTO \
                    list_of_answers (name_of_answer, question_id) \
                VALUES \
                    (?,?)", [v.name_of_answer, question_id]).catch((err) => {
                        console.log(err);
                    })
                }
            })       
    }, undefined);
}

exports.userAnswer = async (data) => {
    if (pool._allConnections.length < nconf.get('db:connection_limit')) {
        conn =  await pool.promise().getConnection();
        global.conn = conn
    }

    for (const value of data.user_answers) {
        global.conn.query("INSERT INTO \
            user_answer (user_id, list_of_answer_id) \
        VALUES (?,?)", [value.user_id, value.list_of_answer_id]).catch((err) => {
            console.log(err);
        });
    }
}