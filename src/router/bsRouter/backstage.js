const express = require('express')

// 引入单独路由模块
const loginRouter = require('./login')
const registerRouter = require('./register')

let Router = express.Router()

// 登录
Router.use('/login', loginRouter)
// 注册
Router.use('/register', registerRouter)

module.exports = Router
