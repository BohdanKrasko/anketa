'use strict'

const path = require("path");
const conn = require(path.join(__dirname, "./connection")).db_conn;
const bcrypt = require("bcryptjs");

exports.findByUsername = async (username) => {
    const user = conn.query("SELECT parents_id, first_name, last_name, username, password, phone, role, token FROM parents WHERE username = ?;", [username]).then((data) => {
        if ( typeof(data[0][0]) !== "undefined" ) {
            return data[0][0];
        } else {
            return null;
        }
    })
    return user;
}

// exports.getUser = async (username) => {
//     const password = conn.query("SELECT first_name, last_name, username, password FROM parents WHERE username = ?;", [username]).then((data) => {
//         return data[0][0];
//     });

//     return password;
// }

exports.getAll = async () => {
    return await conn.query("SELECT parents_id, CONCAT(last_name, ' ', first_name) AS label, phone FROM parents WHERE role = 'user'")
        .then(data => {
            return data[0]
        }).catch(err => {
            console.log(err)
            return err
        })
}

exports.create = async (data) => {
    const { first_name, last_name, username, password, phone, role } = data;
    conn.query("INSERT INTO \
                    parents (first_name, last_name, username, password, phone, role) \
                VALUES \
                    (?,?,?,?,?,?);",
        [ first_name, last_name, username, password, phone, role ]).catch(err => {
            console.log(err);
        });
}

exports.putToken = async (data) => {
    const { username, token } = data;
    conn.query("UPDATE parents SET token = ? WHERE username = ?",
        [ token, username ]).catch(err => {
            console.log(err);
        });
}

exports.isExists = (data) => {
    return conn.query("SELECT count(1) as exist FROM parents where username = ? and parents_id != ?", 
        [data.username, data.parents_id]).then(res => {
            return {exist: res[0][0].exist}
        }).catch(err => {
            console.log(err)
            return err
        })
}

exports.edit = (data) => {
    return conn.query("UPDATE parents SET first_name = ?, last_name = ?, username = ?, phone = ? WHERE parents_id = ?", 
        [data.first_name, data.last_name, data.username, data.phone, data.parents_id]).then((res) => {
            return {status_code: 200}
        }).catch(err => {
            console.log(err)
            return err
        })
}

exports.editPassword = async (data) => {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    return await conn.query("UPDATE parents SET password = ? WHERE parents_id = ?", 
    [encryptedPassword, data.parents_id]).then(() => {
        return {status_code: 200}
    }).catch(err => {
        console.log(err)
        return err
    })
}

exports.getAllAdmins = async () => {
    return await conn.query("SELECT parents_id AS id, first_name, last_name, username, password, '*****' AS pass_star FROM parents WHERE role = 'admin'")
        .then(res => {
            return res[0]
        }).catch(err => {
            console.log(err)
            return err
        })
}

exports.deleteAdmin = async (data) => {
    const children = await conn.query("SELECT children_id FROM children WHERE parents_id = ?", [data.parents_id])
        .then(res => {
            return res[0]
        }).catch(err => {
            console.log(err)
            return err
        })

    for (const key in children) {
        const element = children[key]
        conn.query("DELETE FROM children_answer WHERE children_id = ?", [element.children_id]).catch(err => {
            console.log(err)
            return err
        })
    }

    await conn.query("DELETE FROM children WHERE parents_id = ?", [data.parents_id]).catch(err => {
        console.log(err)
        return err
    })

    return await conn.query("DELETE FROM parents WHERE parents_id = ?", [data.parents_id])
        .then(() => {
            return {status_code: 200}
        }).catch(err => {
            console.log(err)
            return err
        })
}

exports.editAdmin = async (data) => {
    if (data.password !== '*****') {
        const encryptedPassword = await bcrypt.hash(data.password, 10)
        return await conn.query("UPDATE parents SET first_name = ?, last_name = ?, username = ?, password = ? WHERE parents_id = ?",
            [data.first_name, data.last_name, data.username, encryptedPassword, data.admin_id]).then(() => {
                return {status_code: 200}
            }).catch(err => {
                console.log(err)
                return err
            })
    } else {
        return await conn.query("UPDATE parents SET first_name = ?, last_name = ?, username = ? WHERE parents_id = ?",
            [data.first_name, data.last_name, data.username, data.admin_id]).then(() => {
                return {status_code: 200}
            }).catch(err => {
                console.log(err)
                return err
            })
    }
    
    
}

exports.addAdmin = async (data) => {
    const encryptedPassword = await bcrypt.hash(data.password, 10)
    return await conn.query("INSERT INTO parents (first_name, last_name, username, password, role) VALUES (?,?,?,?,'admin')",
        [data.first_name, data.last_name, data.username, encryptedPassword]).then((res) => {
            return res
        }).catch(err => {
            console.log(err)
            return err
        })
}