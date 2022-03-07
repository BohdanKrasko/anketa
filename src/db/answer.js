'use strict'

const path = require("path");
// const pool = require(path.join(__dirname, "./connection")).pool;
const conn = require(path.join(__dirname, "./connection"));


exports.create = async (data) => {
    // const conn =  await pool.promise().getConnection();
    const children_id = data.answers[0].children_id
    const date = new Date()

    for (const key in data.answers) {
        let element = data.answers[key]
        await await conn.promise().query('INSERT INTO children_answer (children_id, list_of_answer_id, question_id, date) VALUES (?,?,?,?)', 
            [children_id, element.list_of_answers_id, element.question_id, date]).catch(err => {
                console.log(err)
                return err;
            })
    }

    // await pool.releaseConnection(conn);
    
    return {status_code: 200}
}