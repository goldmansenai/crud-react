const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: 'localhost',       //host
  user: 'vinicius',        //login
  password: '12345678vSg', //senha
  database: 'crud_db'      //nome do schema
});

app.get("/", (req, res) => {
  const sqlInsert =
    'INSERT INTO movie_reviews (movieName, movieReview) VALUES ("filme", "avaliacao");';
  db.query(sqlInsert, (err, result) => {
    res.send("Hello World")
  });
});

app.listen(3000, () => {
  console.log("Rodando na porta 3001");
});
