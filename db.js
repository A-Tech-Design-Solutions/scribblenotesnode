const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config({ path: './.env'})

//create connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

module.exports = db;