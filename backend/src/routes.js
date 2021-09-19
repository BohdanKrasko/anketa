'use strict'

const path = require('path');
const handlers = require(path.join(__dirname, 'handlers.js')).handlers;

let routes = [
    {
        method: "GET",
        path: '/api/v1/test',
        config: handlers.v1.get
    },
    {
        method: "POST",
        path: '/api/v1/create/user',
        config: handlers.v1.create.user
    },
    {
        method: "POST",
        path: '/api/v1/create/anketa',
        config: handlers.v1.create.anketa
    },
    {
        method: "POST",
        path: '/api/v1/create/section',
        config: handlers.v1.create.section
    },
    {
        method: "POST",
        path: '/api/v1/create/question',
        config: handlers.v1.create.question
    },
    {
        method: "POST",
        path: '/api/v1/create/user_answer',
        config: handlers.v1.create.user_answer
    }
]

exports.routes = routes;