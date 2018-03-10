module.exports.run = async function(client, req, res){
  let args = req.query
  //console.log(args)
  const auth = req.headers.authentication
  if((auth == undefined || auth == null ) && args['token'] == undefined) {
    res.status(400).send("You provided no token in the authentication header.")
  } 
  let yes = false;
  for(let i = 0; i < parseInt(process.env.SIZE); i++){
    if(auth == client.AUTH[i] || args['token'] == client.AUTH[i]) {
      yes = true;
    }
  }
  if(yes && args['id'] == undefined) res.status(200).send(await client.getFortune());
  else{
    if(parseInt(args['id']) < 0 || parseInt(args['id']) > 254) res.status(400).send('not a valid id')
    else{
      if(yes) res.status(200).send(await client.getFortune(parseInt(args['id'])))
    }
  }
  var ip = client.getAPI(req);
  let key;
  if(auth == undefined) key = args['token']
  else key = auth
  client.sendAPISPAM("/API/fortune - " + ip +" | "+key);
  if(!yes) {
    res.status(401).send("The token provided is invalid")
  }
  return;
}