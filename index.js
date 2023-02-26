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

// unix time API endpoint
app.get("/api/:unix([0-9]+)", (req, res) => {
  resObj = {unix: parseInt(req.params.unix), utc: null}
  // convert unix time to utc
  let date = new Date(parseInt(req.params.unix));
  resObj.utc = date.toUTCString();
  res.json(resObj)
});

// utc time api endpoint
app.get("/api/:date", (req, res) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if(!dateRegex.test(req.params.date) && isNaN(Date.parse(req.params.date))){
    res.status(400).json({error: 'Invalid Date'});
  } else {
    let resObj = {unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString()}
    res.json(resObj)
  }
});

// empty api endpoint
app.get("/api/", (req, res) => {
  currentDate = new Date();
  res.json({unix: currentDate.getTime(), utc: currentDate.toUTCString()});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
