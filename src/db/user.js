'use strict'

const path = require("path");
const bcrypt = require("bcryptjs");
// const pool = require(path.join(__dirname, "./connection")).pool;
const conn = require(path.join(__dirname, "./connection"));


exports.findByUsername = async (username) => {
    // const conn =  await pool.promise().getConnection();

    const user = await conn.promise().query("SELECT parents_id, first_name, last_name, username, password, phone, role, token FROM parents WHERE username = ?;", [username]).then((data) => {
        if ( typeof(data[0][0]) !== "undefined" ) {
            return data[0][0];
        } else {
            return null;
        }
    })

    // await pool.releaseConnection(conn);

    return user;
}

// exports.getUser = async (username) => {
//     const password = await conn.promise().query("SELECT first_name, last_name, username, password FROM parents WHERE username = ?;", [username]).then((data) => {
//         return data[0][0];
//     });

//     return password;
// }

exports.getAll = async () => {
    // const conn =  await pool.promise().getConnection();

    const result = await await conn.promise().query("SELECT parents_id, CONCAT(last_name, ' ', first_name) AS label, phone FROM parents WHERE role = 'user'")
        .then(data => {
            return data[0]
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.create = async (data) => {
    // const conn =  await pool.promise().getConnection();
    const { first_name, last_name, username, password, phone, role } = data;

    await conn.promise().query("INSERT INTO \
                    parents (first_name, last_name, username, password, phone, role) \
                VALUES \
                    (?,?,?,?,?,?);",
        [ first_name, last_name, username, password, phone, role ]).catch(err => {
            console.log(err);
        });

    // await pool.releaseConnection(conn);

}

exports.putToken = async (data) => {
    // const conn =  await pool.promise().getConnection();
    const { username, token } = data;
    await conn.promise().query("UPDATE parents SET token = ? WHERE username = ?",
        [ token, username ]).catch(err => {
            console.log(err);
        });

    // await pool.releaseConnection(conn);

}

exports.isExists = async (data) => {
    // const conn = await pool.promise().getConnection();

    const result = await await conn.promise().query("SELECT count(1) as exist FROM parents where username = ? and parents_id != ?", 
        [data.username, data.parents_id]).then(res => {
            return {exist: res[0][0].exist}
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.edit = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const result = await await conn.promise().query("UPDATE parents SET first_name = ?, last_name = ?, username = ?, phone = ? WHERE parents_id = ?", 
        [data.first_name, data.last_name, data.username, data.phone, data.parents_id]).then((res) => {
            return {status_code: 200}
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.editPassword = async (data) => {

    // const conn =  await pool.promise().getConnection();
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const result = await await conn.promise().query("UPDATE parents SET password = ? WHERE parents_id = ?", 
    [encryptedPassword, data.parents_id]).then(() => {
        return {status_code: 200}
    }).catch(err => {
        console.log(err)
        return err
    })

    // await pool.releaseConnection(conn);

    return result;
}

exports.getAllAdmins = async () => {
    // const conn =  await pool.promise().getConnection();

    const result = await await conn.promise().query("SELECT parents_id AS id, first_name, last_name, username, password, '*****' AS pass_star FROM parents WHERE role = 'admin'")
        .then(res => {
            return res[0]
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.deleteAdmin = async (data) => {
    // const conn =  await pool.promise().getConnection();

    const children = await await conn.promise().query("SELECT children_id FROM children WHERE parents_id = ?", [data.parents_id])
        .then(res => {
            return res[0]
        }).catch(err => {
            console.log(err)
            return err
        })

    for (const key in children) {
        const element = children[key]
        await conn.promise().query("DELETE FROM children_answer WHERE children_id = ?", [element.children_id]).catch(err => {
            console.log(err)
            return err
        })
    }

    await await conn.promise().query("DELETE FROM children WHERE parents_id = ?", [data.parents_id]).catch(err => {
        console.log(err)
        return err
    })

    const result = await await conn.promise().query("DELETE FROM parents WHERE parents_id = ?", [data.parents_id])
        .then(() => {
            return {status_code: 200}
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}

exports.editAdmin = async (data) => {
    // const conn =  await pool.promise().getConnection();
    let result;

    if (data.password !== '*****') {
        const encryptedPassword = await bcrypt.hash(data.password, 10)
        result = await await conn.promise().query("UPDATE parents SET first_name = ?, last_name = ?, username = ?, password = ? WHERE parents_id = ?",
            [data.first_name, data.last_name, data.username, encryptedPassword, data.admin_id]).then(() => {
                return {status_code: 200}
            }).catch(err => {
                console.log(err)
                return err
            })
    } else {
        result = await await conn.promise().query("UPDATE parents SET first_name = ?, last_name = ?, username = ? WHERE parents_id = ?",
            [data.first_name, data.last_name, data.username, data.admin_id]).then(() => {
                return {status_code: 200}
            }).catch(err => {
                console.log(err)
                return err
            })
    }

    // await pool.releaseConnection(conn);
    
    return result;
}

exports.addAdmin = async (data) => {
    // const conn =  await pool.promise().getConnection();
    const encryptedPassword = await bcrypt.hash(data.password, 10)

    const result = await await conn.promise().query("INSERT INTO parents (first_name, last_name, username, password, role) VALUES (?,?,?,?,'admin')",
        [data.first_name, data.last_name, data.username, encryptedPassword]).then((res) => {
            return res
        }).catch(err => {
            console.log(err)
            return err
        })

    // await pool.releaseConnection(conn);

    return result;
}