'use strict'

const path = require("path");
// const pool = require(path.join(__dirname, "./connection")).pool;
const conn = require(path.join(__dirname, "./connection"));


exports.get = async (data) => {
    let response = {
        name_of_anketa: '',
        category: '',
        sections: []
    }

    // const conn =  await pool.promise().getConnection();

    await await conn.promise().query("SELECT name_of_anketa, category FROM anketa WHERE anketa_id = ?", 
        [data.anketa_id]).then(data => {
            response.name_of_anketa = data[0][0].name_of_anketa
            response.category = data[0][0].category
            return data[0][0]
        }).catch(err => {
            console.log(err)
            return err;
        })
     await await conn.promise().query("SELECT section_id, name_of_section FROM section WHERE anketa_id = ?",
        [data.anketa_id]).then( async data => {
            for (const section_k in data[0]) {
                let section_e = data[0][section_k]
                let section = {
                    section_id: section_e.section_id,
                    name_of_section: section_e.name_of_section,
                    questions: []
                }
                await await conn.promise().query("SELECT question_id, question FROM question WHERE section_id = ?", 
                    [section_e.section_id]).then(async data => {
                        for (const question_k in data[0]) {
                            let question_e = data[0][question_k]
                            let question = {
                                section_id: section_e.section_id,
                                question_id: question_e.question_id,
                                question: question_e.question,
                                answers: []
                            }
                            await await conn.promise().query("SELECT list_of_answers_id, name_of_answer FROM list_of_answers WHERE question_id = ?",
                                [question_e.question_id]).then(data => {
                                    for (const answer_k in data[0]) {
                                        let answer_e = data[0][answer_k]
                                        let answer = {
                                            question_id: question_e.question_id,
                                            list_of_answers_id: answer_e.list_of_answers_id,
                                            name_of_answer: answer_e.name_of_answer
                                        }
                                        question.answers.push(answer)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    return err;
                                })    
                            section.questions.push(question)
                        }
                    }).catch(err => {
                        console.log(err)
                        return err;
                    })
                response.sections.push(section)
            }
        }).catch(err => {
            console.log(err)
            return err;
        })

    // await pool.releaseConnection(conn);

    return response
}

exports.create = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const anketa_id = await await conn.promise().query("INSERT INTO \
                    anketa (name_of_anketa, category) \
                VALUES \
                    (?,?);", [data.name_of_anketa, data.category]).then(async (res) => {
                        return res[0].insertId    
                    }).catch(err => {
                        console.log(err)
                        return err
                    })

    await data.sections.reduce(async (memo, value) => {
        await memo
        const section_id = await await conn.promise().query("INSERT INTO \
                        section (name_of_section, anketa_id) \
                    VALUES \
                        (?,?);", [value.name_of_section, anketa_id]).then(sectionRes => {
                            return sectionRes[0].insertId
                        }).catch(err => {
                            console.log(err)
                            return err
                        })

        await value.questions.reduce(async (memo, value) => {
            await memo;
            await await conn.promise().query("INSERT INTO \
                question (question, section_id) \
            VALUES \
                (?,?); \
            ", [value.question, section_id]).then(async (questionRes) => {
                const question_id = questionRes[0].insertId;
                for (const v of value.answers) {
                    await conn.promise().query("INSERT INTO \
                        list_of_answers (name_of_answer, question_id) \
                    VALUES \
                        (?,?)", [v.name_of_answer, question_id]).catch((err) => {
                            console.log(err);
                            return err
                        })
                    }
                })       
        }, undefined);
    }, undefined)

    // await pool.releaseConnection(conn);

    return {anketa_id: anketa_id}
}

exports.edit = async (data) => {
    // const conn =  await pool.promise().getConnection();
    console.log(data)
    for (const key in data.delete) {
        for (const i in data.delete[key]) {
            let id;
            if ( key === 'children_answer') {
                id = 'list_of_answer_id'
            } else {
                id = key + '_id'
            }
            await await conn.promise().query(`DELETE FROM ${key} WHERE ${id} = ${data.delete[key][i]}`).catch(err => {
                    console.log(err)
                    return err
                }
            )
        }
    }

    const anketa = data

    if (anketa.anketa_id) {
        await await conn.promise().query(`UPDATE anketa SET name_of_anketa='${anketa.name_of_anketa}', category='${anketa.category}' WHERE anketa_id = ${anketa.anketa_id}`)
            .catch(err => {
                console.log(err)
                return err
            }
        )
    }
    for (const k_s in anketa.sections) {
        const section = anketa.sections[k_s]
        let addedSectionId
        if (section.section_id) {
            await await conn.promise().query(`UPDATE section SET name_of_section = '${section.name_of_section}' WHERE section_id = ${section.section_id}`)
                .catch(err => {
                    console.log(err)
                    return err
                }
            )
        } else {
            await await conn.promise().query(`INSERT INTO section (name_of_section, anketa_id) VALUES ('${section.name_of_section}', '${anketa.anketa_id}')`)
                .then(data => {
                    addedSectionId = data[0].insertId
                })
                .catch(err => {
                    console.log(err)
                    return err
                }
            )
        }

        for (const k_q in section.questions) {
            const question = section.questions[k_q]
            let addedQuestionId
            if (question.question_id) {
                await await conn.promise().query(`UPDATE question SET question = '${question.question}' WHERE question_id = ${question.question_id}`)
                    .catch(err => {
                        console.log(err)
                        return err
                    }
                )
            } else {
                await await conn.promise().query(`INSERT INTO question (question, section_id) VALUES ('${question.question}', '${section.section_id || addedSectionId}')`)
                    .then(data => {
                        addedQuestionId = data[0].insertId
                    })
                    .catch(err => {
                        console.log(err)
                        return err
                    }
                )
            }
            for (const k_a in question.answers) {
                const answer = question.answers[k_a]
                if (answer.list_of_answers_id) {
                    await await conn.promise().query(`UPDATE list_of_answers SET name_of_answer = '${answer.name_of_answer}' WHERE list_of_answers_id = '${answer.list_of_answers_id}'`)
                        .catch(err => {
                            console.log(err)
                            return err
                        }
                    )
                } else {
                    await await conn.promise().query(`INSERT INTO list_of_answers (name_of_answer, question_id) VALUES ('${answer.name_of_answer}', '${question.question_id || addedQuestionId}')`)
                        .catch(err => {
                            console.log(err)
                            return err
                        }
                    )
                }
            }
        }
    }

    // await pool.releaseConnection(conn);

    return {status_code: 200}
}

exports.delete = async (data) => {
    // const conn =  await pool.promise().getConnection();

    console.log(data)

    for (const key in data.delete) {
        for (const i in data.delete[key]) {
            let id;
            if ( key === 'children_answer') {
                id = 'list_of_answer_id'
            } else {
                id = key + '_id'
            }
            await await conn.promise().query(`DELETE FROM ${key} WHERE ${id} = ${data.delete[key][i]}`).catch(err => {
                    console.log(err)
                    return err
                }
            )
        }
    }

    // await pool.releaseConnection(conn);
    
    return data
}

exports.hasAnswers = async (data) => {
    // const conn =  await pool.promise().getConnection();

    let hasAnswers = false

    for (const key in data.check) {
        await await conn.promise().query('SELECT COUNT(1) as exist FROM children_answer WHERE list_of_answer_id = ?',
            [data.check[key]]).then(res => {
                if (res[0][0].exist) {
                    hasAnswers = true
                }
            }).catch(err => {
                console.log(err)
                return err
            })
    }

    // await pool.releaseConnection(conn);
    
    return {has_answers: hasAnswers}
}

                     