const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");



// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "sql209.epizy.com",
  user: "	epiz_34263038",
  password: "VrtVwMZoLm",
  database: "epiz_34263038_loginsys"
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// Express app
const app = express();
app.use(cors());// idk 
app.use(express.json());


app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  pool.query(
    'INSERT INTO userData (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error inserting user data');
        return;
      }

      res.send('User added');
    }
  );
});

app.get('/users', (req, res)=>{

  pool.query('Select * from userData', (err, result)=>{
    if (err) {
      console.log(err);
    }else{
      res.send(result);
    }
  })
})



// Listen for requests
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001");
});
