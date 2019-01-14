const express = require('express')
const bodyParser = require('body-parser')
const _sql = require('./connectSql')

let Router = express.Router()

Router.post('/', bodyParser.urlencoded({
  extended: false
}), async (req, res) => {
  let {
    username,
    password
  } = req.body
  let sql = `select * from administrator where username = '${username}' 
  and password = '${password}'`
  let data, json
  try {
    data = await _sql.select(sql)
    if (data.code === '1') {
      json = {
        'code': data.code,
        'superAdmin': data.data[0].isSuperAdmin
      }
    } else {
      json = {
        'code': data.code
      }
    }
  } catch (err) {
    json = err
  }
  res.send(json)
})

module.exports = Router
