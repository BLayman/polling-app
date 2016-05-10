var bodyParser = require('body-parser');
var express = require('express');
var mongoUtil = require('./mongoUtil');
var app = express();
var dbFunc = require('./dbFunc');
mongoUtil.connect();


//MIDDLEWEAR

app.use(express.static("../client"));

app.use(bodyParser.urlencoded({extended: true}));

//POST

app.post("/results", function(req,res){
console.log(req.body);
//retrieve from db
dbFunc.retrieveStats(dbFunc.postIt, req, res);
});

//GET

app.get("/results", function(req,res){

dbFunc.retrieveStats(dbFunc.sendData,res);

});

//LISTEN
app.listen(3000, function () {
  console.log("listening on port 3000");
})
