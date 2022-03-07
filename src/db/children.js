'use strict'

const path = require("path");
// const pool = require(path.join(__dirname, "./connection")).pool;
const conn = require(path.join(__dirname, "./connection"));



exports.get = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("SELECT children.children_id AS id, children.name, children.surname, DATE_FORMAT(children.birthday, '%d/%m/%Y') AS birthday, children.weight, children.height FROM children WHERE parents_id = ?",
        [data.parents_id]).then((data) => {
            return data[0]
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.getAll = async () => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("SELECT children.children_id, CONCAT(children.name, ' ', children.surname) AS fullname, DATE_FORMAT(children.birthday, '%d/%m/%Y') AS birthday, children.weight, children.height FROM children")
        .then((data) => {
            return data[0]
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.getByAnketa = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("SELECT \
                            children.children_id, \
                            children.name, \
                            children.surname, \
                            children.birthday, \
                            children.weight, \
                            children.height, \
                            children.parents_id, \
                            parents.first_name, \
                            parents.last_name \
                        FROM \
                            anketa \
                        LEFT JOIN section ON anketa.anketa_id = section.anketa_id \
                        INNER JOIN question ON section.section_id = question.section_id \
                        INNER JOIN children_answer ON question.question_id = children_answer.question_id \
                        INNER JOIN children ON children_answer.children_id = children.children_id \
                        INNER JOIN parents ON parents.parents_id = children.parents_id \
                        INNER JOIN list_of_answers ON children_answer.list_of_answer_id = list_of_answers.list_of_answers_id \
                        WHERE \
                            anketa.anketa_id = ? \
                        GROUP BY children.children_id \
                        ORDER BY children.children_id", [data.anketa_id]).then(res => {
                            return res[0]
                        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.getByAnketaAndParents = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("SELECT \
                        children.children_id, \
                        children.name, \
                        children.surname, \
                        children.birthday, \
                        children.weight, \
                        children.height, \
                        children.parents_id \
                    FROM \
                        anketa \
                    LEFT JOIN section ON anketa.anketa_id = section.anketa_id \
                    INNER JOIN question ON section.section_id = question.section_id \
                    INNER JOIN children_answer ON question.question_id = children_answer.question_id \
                    INNER JOIN children ON children_answer.children_id = children.children_id \
                    INNER JOIN parents ON parents.parents_id = children.parents_id \
                    INNER JOIN list_of_answers ON children_answer.list_of_answer_id = list_of_answers.list_of_answers_id \
                    WHERE \
                        anketa.anketa_id = ? AND children.parents_id = ? \
                    GROUP BY children.children_id \
                    ORDER BY children.children_id", [data.anketa_id, data.parents_id]).then(res => {
                        return res[0]
                    })

    // await pool.releaseConnection(conn);

    return result;
}

exports.create = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("INSERT INTO children (parents_id, name, surname, birthday, weight, height) VALUES (?,?,?,?,?,?)",
        [ data.parents_id, data.name, data.surname, data.birthday, data.weight, data.height ]).then(data => {
            return data
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.edit = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("UPDATE children SET name = ?, surname = ?, birthday = ?, weight = ?, height = ? WHERE children_id = ?",
        [data.name, data.surname, data.birthday, data.weight, data.height, data.children_id]).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.delete = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await conn.promise().query("DELETE FROM children WHERE children_id = ?", [data.children_id]).catch(err => {
        console.log(err)
        return err
    })

    // await pool.releaseConnection(conn);

    return result;
}