const gateway = require('fast-gateway');
require("dotenv").config();
const verifyJwt = require('./middleware/auth');
const port = process.env.PORT

const server = gateway({
    routes: [
        {
            prefix: '/user',
            target: process.env.USER_SERVICE,
            middlewares: [verifyJwt]
        },
        {
            prefix:'/api',
            target: process.env.AUTH_SERVICE
        },
    ]
})


server.start(port).then(server => {
    console.log(`gateway listenng at port ${port}`)
})
