'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql');
const password = require('./password');

app.use(cors());
app.use(bodyParser.json());

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'Baseball'
});
connection.connect();

app.get('/teams', (req, res) => {
  connection.query(`SELECT * FROM Baseball.mlbTeams`, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results)
  })
})

app.put('/update', (req, res) => {
  let updateList = '';
  // let newList = '';
  // if(req.body.playerId != 'null') {
  //   updateList += " playerId" + " = " + `"${Number(req.body.playerId)}"` + ",";
  // }
  if(req.body.teamName != 'null') {
    updateList += " teamName" + " = " + `"${req.body.teamName}"` + ",";
  }
  if(req.body.City != 'null') {
    updateList += " City" + " = " + `"${req.body.City}"` + "," ;
  }
  if(req.body.State != 'null') {
    updateList +=  " State" + " = " + `"${req.body.State}"` + ",";
  }
  if(req.body.League != 'null') {
    updateList += " League" + " = " + `"${req.body.League}"` + ",";
  }
  if(req.body.worldSeriesTitles != 'null') {
    updateList += " worldSeriesTitles" + " = " + `"${req.body.worldSeriesTitles}"` + ",";
  }
  updateList = updateList.slice(0, -1);
  connection.query(`UPDATE Baseball.mlbTeams SET ${updateList} WHERE teamId = ${Number(req.body.teamId)} ` , function (error, results, fields) {

    if (error) throw error;

    res.send(results)
  })
})

app.delete('/delete/:teamId', (req, res) => {
  console.log(req.params);
  connection.query(`DELETE FROM Baseball.mlbTeams WHERE teamId = ${Number(req.params.teamId)}`, function (error, results, fields) {
    if (error) throw error;
    // console.log(req.params);
    res.send("got a delete request")
  })
// console.log(req.params.employeeNumber);
// res.send('POST recieved')
})

app.post('/new', (req, res) => {
  connection.query(`INSERT INTO Baseball.mlbTeams (teamName, City, State, League, worldSeriesTitles) VALUES ('${req.body.teamName}', '${req.body.City}', '${req.body.State}', '${req.body.League}', '${req.body.worldSeriesTitles}')`, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
})
app.listen(3000);
