var mongoUtil = require('./mongoUtil');

//CANDIDATES OBJECT
var candidates = {
  hill : 0,
  bern : 0,
  trump : 0,
  cruz : 0,
  total: function() {
  return this.hill + this.bern + this.trump + this.cruz;
},
  perHill: function () {
  return this.hill / this.total() * 100 || 0;
},
  perBern: function () {
return this.bern / this.total() * 100 || 0;
},
  perTrump: function () {
return this.trump / this.total() * 100 || 0;
},
  perCruz: function () {
return this.cruz / this.total() * 100 || 0;
}
};



exports.retrieveStats = function (callback, arg, arg2) {

  var statColl = mongoUtil.stats();
  statColl.find().toArray(function (err,docs) {

  candidates.hill = docs[0].hillStat;
  candidates.bern = docs[0].bernStat;
  candidates.trump = docs[0].trumpStat;
  candidates.cruz = docs[0].cruzStat;

if (callback){
  callback(arg, arg2);
}

  });
};



exports.sendData = function(res) {
    var stats = {
    hillStat: Math.round(candidates.perHill()),
    bernStat: Math.round(candidates.perBern()),
    trumpStat: Math.round(candidates.perTrump()),
    cruzStat: Math.round(candidates.perCruz())
    }
      console.log(stats);
      res.json(stats);
};


exports.postIt = function(req,res) {
  //update object with form selection
  switch (req.body.vote) {
    case 'Hillary':
      candidates.hill += 1;
      break;
      case 'Bernie':
        candidates.bern += 1;
        break;
        case 'Trump':
          candidates.trump += 1;
          break;
          case 'Cruz':
            candidates.cruz += 1;
            break;
  };
  //update db
  var updated =
    {
       "hillStat" : candidates.hill,
        "bernStat" : candidates.bern,
         "trumpStat" : candidates.trump,
          "cruzStat" : candidates.cruz,
          "updated":true
        };
  console.log(updated);

  var statColl = mongoUtil.stats();
  statColl.updateOne({updated:true}, updated,
   function (err,result) {
    if(err){
      res.sendStatus(400);
    }
  });
  //send updated data
  exports.sendData(res);
}
