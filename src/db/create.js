'use strict'

const path = require("path");
// const pool = require(path.join(__dirname, "./connection")).pool;
const conn = require(path.join(__dirname, "./connection"));


exports.user = async (data) => {
    // const conn =  await pool.promise().getConnection();

    await conn.promise().query("INSERT INTO \
                    user (username,password,name,surname,po_batkovi,age,weight,phone_number,email) \
                VALUES \
                    (?,?,?,?,?,?,?,?,?);",
        [data.username, data.password, data.name, data.surname, data.po_batkovi, data.age, data.weight, data.phone_number, data.email]).catch(err => {
            console.log(err);
        });

    // await pool.releaseConnection(conn);
}

exports.anketa = async (data) => {
    // const conn =  await pool.promise().getConnection();

    await conn.promise().query("INSERT INTO \
                    anketa (name_of_anketa) \
                VALUES \
                    (?);", [data.name_of_anketa]).catch(err => {
                        console.log(err);
                    })

    // await pool.releaseConnection(conn);
}

exports.section = async (data) => {
    // const conn =  await pool.promise().getConnection();

    for (const value of data.sections) {
        await conn.promise().query("INSERT INTO \
                        section (name_of_section, anketa_id) \
                    VALUES \
                        (?,?);", [value.name_of_section, value.anketa_id]).catch(err => {
                            console.log(err);
                        });
    }

    // await pool.releaseConnection(conn);
}

exports.question = async (data) => {
    // const conn =  await pool.promise().getConnection();

    await data.questions.reduce(async (memo, value) => {
        await memo;
        await await conn.promise().query("INSERT INTO \
            question (question, section_id) \
        VALUES \
            (?,?); \
        ", [value.question, value.section_id]).then(async () => {
            return await conn.promise().query("SELECT question_id FROM question ORDER BY question_id DESC LIMIT 1;")
        }).then(async (data) => {
            const question_id = data[0][0].question_id;
            for (const v of value.answers) {
                await conn.promise().query("INSERT INTO \
                    list_of_answers (name_of_answer, question_id) \
                VALUES \
                    (?,?)", [v.name_of_answer, question_id]).catch((err) => {
                        console.log(err);
                    })
                }
            })       
    }, undefined);

    // await pool.releaseConnection(conn);
}

exports.userAnswer = async (data) => {
    // const conn =  await pool.promise().getConnection();

    for (const value of data.user_answers) {
        await conn.promise().query("INSERT INTO \
            user_answer (user_id, list_of_answer_id) \
        VALUES (?,?)", [value.user_id, value.list_of_answer_id]).catch((err) => {
            console.log(err);
        });
    }

    // await pool.releaseConnection(conn);
}