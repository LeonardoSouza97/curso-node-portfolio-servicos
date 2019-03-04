const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db_portfolio'
});

module.exports = conexao;