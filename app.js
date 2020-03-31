const express = require('express')
const app = express()
const mysql = require('mysql');

const con = mysql.createConnection({
    
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select * from Contacts",(er, res)=>{
        console.log(er);
        console.log(res);
    })
  });

app.get('/', (req, res) => res.send({key:'Hello World!'}));

// app.listen(3000, () => console.log('Example app listening on port 3000!'));