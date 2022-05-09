const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json)

const pool = mysql.createPool({
    connectionLimit : 10,
    connectTimeout : 20,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'lottery',
})

app.get('',(req, res) => {

    pool.getConnection((error, connection) =>{
        if(error) throw error
        console.log("Done : ?", connection.threadId)

        connection.query('SELECT * FROM `lottery', (error, rows) => {
            connection.release();
            if(!error){
                console.log(rows[1])
            } else {
                console.log(error)
            }
        })
    })
})

app.listen(port, () =>
    console.log("listen on port : ?",port)
)