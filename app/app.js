const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:1234@db:5432/Users";
const pool = new Pool({
  connectionString:connectionString
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  await pool.query('SELECT * FROM "Users"', (err, response) => {
    err ? console.log("error") : console.log(response);
    res.json({ user: response });
    // client.end()
  });
});
app.post("/", async (req,res)=>{
    var sql = 'INSERT INTO "Users"(name, surname, age) VALUES($1,$2,$3)'
    var values = [req.body.name,req.body.surname,req.body.age]
    await pool.query(sql,values,(err,response,fields)=>{
        err?console.log(err):console.log("dasdsa")
        res.json(response)
    })
})
app.put("/", async(req,res)=>{
  var sql = 'UPDATE "Users" SET name=20'
  await pool.query(sql,(err,response)=>{
    err?console.log(err):console.log(response)
    res.json(response)
  })
})
app.delete("/", async(req,res)=>{
  var sql = 'DELETE FROM "Users" WHERE name=$1'
  var values = [20] 
  await pool.query(sql,values,(err,response)=>{
    err?console.log(err):console.log(response)
    res.json(response)
  }) 
})

var connectDB = async () => {
  await pool.connect();
};

connectDB();

app.listen(3000, console.log("open port3000"));
