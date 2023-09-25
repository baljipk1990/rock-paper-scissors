const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express()
const cors = require('cors')
server.use(bodyParser.json());
server.use(cors());


// Create a MySQL database connection
const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "",
  database: "game",

});

// Connect to the MySQL database
db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

db.query('SHOW TABLES LIKE "GAME"', (error, results) => {
  if (error) {
    console.error('Error checking if table exists:', error);
  } else if (results.length === 0) {
    // Table does not exist, create it
    const createTableQuery = `
      CREATE TABLE GAME (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comp_score INT,
        status VARCHAR(255),
        name VARCHAR(255),
        user_score INT
      )
    `;

    db.query(createTableQuery, (error) => {
      if (error) {
        console.error('Error creating table:', error);
      } else {
        console.log('Table "GAME" created successfully');
      }
    });
  } else {
    console.log('Table "GAME" already exists');
  }
});

//Establish the Port
server.listen(8085, function check(error) {
  if (error) {
    console.log("Error....!!!!");
  }
  else {
    console.log("Started....!!!! 8085");
  }
});

server.post("/game/add", (req, res) => {
  let data = {
    comp_score: req.body.comp_score,
    status: req.body.status,
    name: req.body.name,
    user_score: req.body.user_score,

  };
  let sql = "INSERT INTO GAME SET ?";
  db.query(sql, data, (error) => {
    if (error) {
      res.send({ status: false, message: "table created Failed" });
    } else {
      res.send({ status: true, message: "table created successfully" });
    }
  });
});

server.get("/game", (req, res) => {
  var sql = "SELECT * FROM game";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB", error);
    } else {
      res.send(result);
    }
  });
});