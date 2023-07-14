// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.route('/api').get(function(req, res) {
  var date = new Date()
  unix = date.getTime()
  utc = date.toUTCString()
  res.json({"unix": unix, "utc": utc })
})

app.route('/api/:date?').get(function(req, res) {
  var date = req.params.date
  if(Number.isInteger(Number(date))) {
    unix = parseInt(date)
    utc = new Date(unix).toUTCString()
    res.json({"unix": unix, "utc": utc })
  } else if(!isNaN(new Date(date))) {
    unix = new Date(date).getTime()
    utc = new Date(date).toUTCString()
    res.json({"unix": unix, "utc": utc })
  } else {
    res.json({"error": "Invalid Date"})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
