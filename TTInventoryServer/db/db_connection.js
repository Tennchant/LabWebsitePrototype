const mysql = require('mysql2')
const dotenv = require('dotenv')

// JSON
// const dbConfig = {
//     host: "<hostname>",
//     port:3306,
//     user: "<username>",
//     password: "<password>",
//     database: "<schema>",
//     connectTimeout: 10000
// }

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000")
}

// boilerplate code
const connection = mysql.
createConnection(dbConfig);

module.exports = connection;