var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { address: /^S/ };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    uniqueCount = result;
    var  count = {};
    uniqueCount.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    console.log(count);
    db.close();
  });
});