const mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'vue_nrg'
})

exports.select = sql => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log(err)
        return
      }
      conn.query(sql, (err, rows) => {
        let data
        if (err) {
          data = {
            code: 0,
            data: err
          }
          reject(data)
          return
        }
        if (rows.length <= 0) {
          data = {
            code: 0,
            data: 'none',
            rows
          }
        } else {
          data = {
            code: 1,
            data: rows
          }
        }
        resolve(data)
        conn.release()
      })
    })
  })
}
