const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PWD,
    database : process.env.DB_DATABASE,
    multipleStatements : true
})

connection.connect((err) => {
    if(err){
        console.log("Not connected")
    }else{
        console.log('Connected')
    }
})

module.exports = connection;