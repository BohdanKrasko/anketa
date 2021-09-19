'use strict'
const path = require("path");
const create = require(path.join(__dirname, "./db/create"));

let handlers = {
    v1: {
        get: {
            handler: async (request, reply) => {
                return "anketa";
            }
        },
        create: {
            user: {
                payload: {
                    multipart: true
                },
                handler: async (request, reply) => {
                    const data = {
                        "name"        : request.payload.name,
                        "surname"     : request.payload.surname,
                        "po_batkovi"  : request.payload.po_batkovi,
                        "age"         : request.payload.age,
                        "weight"      : request.payload.weight,
                        "phone_number": request.payload.phone_number,
                        "email"       : request.payload.email
                    }
                    console.log("create user: ", JSON.stringify(request.payload));
                    return create.user(data).then(() => {
                        return reply.response({status_code: 200});
                    })
                }
            },
            anketa: {
                payload: {
                    multipart: true
                },
                handler: async (request, reply) => {
                    let data = {
                        "name_of_anketa": request.payload.name_of_anketa
                    }
                    // console.log("create anketa: ", typeof(request.payload));
                    return create.anketa(data).then(() => {
                        return reply.response({status_code: 200});
                    })
                }
            },
            section: {
                payload: {
                    multipart: true
                },
                handler: async (request, reply) => {
                    const data = {
                        "sections": request.payload.sections
                    }
                    // console.log("create section: ", JSON.stringify(request.payload));
                    return create.section(data).then(() => {
                        return reply.response({status_code: 200});
                    })
                }
            },
            question: {
                payload: {
                    multipart: true
                },
                handler: async (request, reply) => {
                    const data = {
                        "questions": request.payload.questions
                    }
                    // console.log("create section: ", JSON.stringify(request.payload));
                    return create.question(data).then(() => {
                        return reply.response({status_code: 200});
                    })
                }
            },
            user_answer: {
                payload: {
                    multipart: true
                },
                handler: async (request, reply) => {
                    const data = {
                        "user_answers": request.payload.user_answers
                    }
                    return create.userAnswer(data).then(() => {
                        return reply.response({status_code: 200});
                    })
                }
            }
        }
    }
}

exports.handlers = handlers;