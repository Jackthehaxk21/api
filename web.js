let methods = {
  run : function(client) {
    var express = require('express');
    var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, response) {
  try {
  response.sendFile(__dirname + '/views/index.html');
  var ip = client.getAPI(req);
  
  if(ip != '63.143.42.252' && ip != '52.70.8.194') client.sendAPISPAM("/ - " + ip);
  } catch (e) {}
});

app.get("/TEST", function (req, response) {
  response.sendFile(__dirname + '/views/TEST-API.html');
  var ip = client.getAPI(req);
  client.sendAPISPAM("/TEST - " + ip);
})
    
app.get("/dreams", function (req, response) {
  response.send(client.dreams);
  try {
  var ip = client.getAPI(req);
  client.sendAPISPAM("/dreams - " + ip);
  } catch (e) {}
});
    
/*app.get("/ADMIN/points", function (req, response) {
  response.send(client.points);
})
    
app.get("/ADMIN/settings", function (req, response) {
  response.send(client.settings);
  //console.log(request)
})*/
    
app.get("/API/quote*", async function (req, response) {
  const handler = require('./Handlers/quote.js')
  handler.run(client, req, response)
})
    
app.get("/API/joke*", async function (req, response) {
  const handler = require('./Handlers/joke.js')
  handler.run(client, req, response)
})
    
app.get("/API/fortune*", async function (req, response) {
  const handler = require('./Handlers/fortune.js')
  handler.run(client, req, response)
})
    
app.get("/API", function (req, response) {
  response.sendFile(__dirname + '/views/TEST-API.html');
  var ip = client.getAPI(req);
  client.sendAPISPAM("/API - " + ip);
});
    
app.get('*', function(req, res){
  res.status(404).send('Hi there, this page does not exist but dont worry its not your fault !\n-Jackthehack21');
});


// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", async function (request, response) {
  var MK = client.guilds.get("393114138135625749")
  //console.log(MK);
  var MK = MK.channels.find("name", "bot-log");
  MK.send("NEW TOKEN REQUEST BY **"+request.query.dream+"**");
  //prompt('If you do not hear from us in 48 hours please retry with the correct discord tag')
  //response.status(200)
});

// Simple in-memory store for now

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
  }
}

module.exports = methods;