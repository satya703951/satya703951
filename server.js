var http = require('http');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var querystring = require('querystring');
var url = "mongodb://localhost:27017/mydb";




http.createServer(function(req, res){

    if(req.url === "/")
    {
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream("./public/index.html","UTF-8").pipe(res);
    }


    if(req.method === "POST")
    {
        var data = "";
        req.on("data", function(chunk){
            data += chunk;
        });
        req.on("end", function(chunk){

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myobj = querystring.parse(data);

                dbo.collection("satya").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });
        });
    }

}).listen(3000);

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "satya", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

