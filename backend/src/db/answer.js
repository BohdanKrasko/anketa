'use strict'

const path = require("path");
const conn = require(path.join(__dirname, "./connection")).db_conn;

exports.create = async (data) => {
    const children_id = data.answers[0].children_id
    const is_exists = await conn().query('SELECT COUNT(1) as exist FROM children_answer WHERE children_id = ?', [children_id])
        .then(res => {
            return res[0][0].exist
        }).catch(err => {
            console.log(err)
        })


    const date = new Date()
    for (const key in data.answers) {
        let element = data.answers[key]
        await conn().query('INSERT INTO children_answer (children_id, list_of_answer_id, question_id, date) VALUES (?,?,?,?)', 
            [children_id, element.list_of_answers_id, element.question_id, date]).catch(err => {
                console.log(err)
                return err;
            })
    }
    
    return {status_code: 200}
}