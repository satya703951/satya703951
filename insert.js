var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //Find the first document in the customers collection:
  dbo.collection("satya").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.dbname);
    db.close();
  });
});