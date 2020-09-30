const { text } = require('express')
const { Pool } = require('pg')

// const pool = new Pool(
//     {
//         host: 'host',
//         user: 'user',
//         database: 'db',
//         password: "password",
//         port: port
//     }
// )

// pg will detect all this config value from .env
const pool = new Pool()
module.exports = {
    query: (text, params) => pool.query(text, params),
}