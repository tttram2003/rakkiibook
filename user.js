// var express = require('express');
// var bodyParser = require('body-parser');
// var xml2js = require('xml2js');
// var fs = require('fs');
// var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var xml2js = require('xml2js');
var fs = require('fs');
var app = express();

app.use(cors({
  origin: 'https://rakkiibookstore.vercel.app',
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/sign-up', function(req, res) {
    fs.readFile('user_data.xml', function(err, data) {
        if (err) throw err;
        xml2js.parseString(data, function(err, result) {
            if (err) throw err;
            var json = result;
            json.root.user.push({username: req.body.username, password: req.body.password});
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(json);
            fs.writeFile('user_data.xml', xml, function(err) {
                if (err) {
                    res.send('Error writing to file');
                    throw err;
                } else {
                    res.send('Sign up successful!');
                }
            });
        });
    });
});

app.post('/update-password', function(req, res) {
    fs.readFile('user_data.xml', function(err, data) {
        if (err) throw err;
        xml2js.parseString(data, function(err, result) {
            if (err) throw err;
            var json = result;
            for (var i = 0; i < json.root.user.length; i++) {
                if (json.root.user[i].username[0] === req.body.username) {
                    json.root.user[i].password[0] = req.body.password;
                    break;
                }
            }
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(json);
            fs.writeFile('user_data.xml', xml, function(err) {
                if (err) {
                    res.send('Error writing to file');
                    throw err;
                } else {
                    res.send('Password updated successfully!');
                }
            });
        });
    });
});

// app.listen(3000, function() {
//     console.log('App listening on port 3000');
// });
