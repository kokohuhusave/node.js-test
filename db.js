const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'ict22',
    database: 'student',
});

module.exports = pool;