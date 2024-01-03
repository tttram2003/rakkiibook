var express = require("express");
var bodyParser = require("body-parser");
var xml2js = require("xml2js");
var fs = require("fs");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/add-order", function (req, res) {
  fs.readFile("order (copy).xml", function (err, data) {
    if (err) throw err;
    xml2js.parseString(data, function (err, result) {
      if (err) throw err;
      var json = result;
      json.root.order.push({
        cusname: req.body.cusname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(json);
      fs.writeFile("order (copy).xml", xml, function (err) {
        if (err) {
          res.send("Error writing to file");
          throw err;
        } else {
          res.send("Data saved to order (copy).xml");
        }
      });
    });
  });
});

app.listen(3000, function () {
  console.log("App listening on port 3000");
});
