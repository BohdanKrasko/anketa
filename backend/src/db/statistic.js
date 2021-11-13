'use strict'

const path = require("path");
const conn = require(path.join(__dirname, "./connection")).db_conn;

exports.get = async (data) => {
    const result = await conn().execute("SELECT \
                            anketa.anketa_id, \
                            anketa.name_of_anketa, \
                            section.section_id, \
                            section.name_of_section, \
                            question.question_id, \
                            question.question, \
                            list_of_answers.list_of_answers_id, \
                            list_of_answers.name_of_answer, \
                            children.name, \
                            children.surname, \
                            parents.first_name, \
                            parents.last_name, \
                            parents.phone \
                        FROM \
                            anketa.anketa \
                        INNER JOIN section ON anketa.anketa_id = section.anketa_id \
                        INNER JOIN question ON section.section_id = question.section_id \
                        INNER JOIN children_answer ON question.question_id = children_answer.question_id \
                        INNER JOIN children ON children_answer.children_id = children.children_id \
                        INNER JOIN parents ON children.parents_id = parents.parents_id \
                        INNER JOIN list_of_answers ON children_answer.list_of_answer_id = list_of_answers.list_of_answers_id \
                        WHERE \
                            anketa.anketa_id = ? AND children.children_id = ? \
                        ORDER BY \
                            section.section_id, \
                            children_answer.children_id, \
                            list_of_answers.name_of_answer desc", [data.anketa_id, data.children_id]).then(res => {
                                return res[0]
                            })
        return result;
}