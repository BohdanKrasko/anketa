'use strict'

const path = require("path");
const conn = require(path.join(__dirname, "./connection")).db_conn;

exports.create = async (data) => {
    const children_id = data.answers[0].children_id
    const is_exists = await conn().execute('SELECT COUNT(1) as exist FROM children_answer WHERE children_id = ?', [children_id])
        .then(res => {
            return res[0][0].exist
        }).catch(err => {
            console.log(err)
        })

    // if (is_exists) {
    //     await conn().execute('DELETE FROM children_answer WHERE children_id = ?', [children_id])
    //             .catch(err => {console.log(err)})
    // }
    for (const key in data.answers) {
        let element = data.answers[key]
            await conn().execute('DELETE FROM children_answer WHERE children_id = ? AND question_id = ?', 
                [children_id,element.question_id]).catch(err => {
                    console.log(err)
                    return err;
                })
            await conn().execute('INSERT INTO children_answer (children_id, list_of_answer_id, question_id) VALUES (?,?,?)', 
                [children_id, element.list_of_answers_id, element.question_id]).catch(err => {
                    console.log(err)
                    return err;
                })
    }
    return {status_code: 200}
}