"use strict";
var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;

module.exports = {
connect: function() {
  client.connect(/*YOUR MONGO DB*/, function (err, db) {
    if(err) {
      console.log("Error connecting to Mongo.");
      process.exit(1);
    }
    _db = db
    console.log("Connected to Mongo.");
  });
},
stats: function () {
  return _db.collection('pollStats');
}

}
