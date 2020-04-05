var mysql = require('mysql')
require('dotenv').config()
const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:3306,
}
var pool = mysql.createPool(dbconfig)
pool.getConnection((err:any, connection:any) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.', dbconfig)
        }
    }
    if (connection) connection.release()
    return
})
export default pool;