module.exports.run = async function(client, req, response){
  let auth;
  let args = req.query
  if(req.headers.authentication != undefined) auth = req.headers.authentication.trim();
  else if(args['token'] != undefined) auth = args.token
  if(auth == undefined || auth == null) {
    response.status(400).send("You provided no token in the authentication header.")
    return;
  } 
  let yes = false
  for(let i = 0; i < parseInt(process.env.SIZE); i++){
    if(auth == client.AUTH[i]) {
      yes = true;
    }
  }
  if(yes) {
    let category = undefined;
    let id = undefined; 
    let d;
    if(args['category'] != undefined) category = args['category'];
    if(req.headers.category != undefined) category = req.headers.category
    if(args['id'] != undefined) id = args['id']
    if(req.headers.id != undefined) id = req.headers.id;
    
    if(id == undefined && category == undefined) d = await client.getJoke()
    if(id != undefined && category == undefined) d = await client.getJoke(id, null)
    if(id == undefined && category != undefined) d = await client.getJoke(null, category)
    if(id != undefined && category != undefined){
      response.status(400).send('Cannot have both id and category')
      return;
    }
    if(d == false){
      response.status(400).send('Not a valid ID/Category')
      return
    }
  response.status(200).send(d);
  var ip = client.getAPI(req);
  client.sendAPISPAM("/API/joke - " + ip +" | "+auth);
  } else {
    response.status(401).send("The token provided is invalid")
  }
  return;
}