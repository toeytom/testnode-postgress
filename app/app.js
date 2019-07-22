const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:1234@db:5432/Users";
const client = new Client(connectionString);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  await client.query('SELECT * FROM "Users"', (err, response) => {
    err ? console.log("error") : console.log(response.rows);
    res.json({ user: response.rows });
    // client.end()
  });
});
app.post("/", async (req,res)=>{
    var data= [["dd","dddd",25]];
    var sql = 'INSERT INTO Users values("dd","dddd",25)'
    await client.query(sql,(err,response,fields)=>{
        err?console.log(err):console.log("dasdsa")
    })
})

var connectDB = async () => {
  await client.connect();
};

connectDB();

app.listen(3000, console.log("open port3000"));
