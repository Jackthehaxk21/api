let methods = {
  run : async function(client) {
    //console.log(process.memoryUsage())
    client.AUTH = process.env.AUTH.split('|')
    const fs = require('fs')
    client.getAPI = function(req) {
      var ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
      } else {
        ip = req.ip;
      }
      return ip;
    }
    client.sendAPISPAM = async function(txt){
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('LOG | '+txt);
    }
    client.getQuote = async function(id=null){
      let random;
      const data = require('../../Quotes.json');
      if(id == null){random = await Math.floor(Math.random()*266)}
      else random = id
      let respond = await data[random]
      let dat = respond
      return dat;
    }
    client.getJoke = async function(id=null, cat=null){
      const data = require('../../Jokes.json');
      let num = await Math.floor(Math.random()*10019)
      let random;
      if(id == null && cat == null) random= data[num]
      if(id > 10019) return false
      if(id != null) random = data[id]
      if(cat != undefined){
        let num;
        let i =0;
        while(true){
          num = await Math.floor(Math.random()*10019)
          if(data[num].category == cat) break;
          if(i > 10019) return false;
          i += 1
        }
        random = data[num]
      }
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/joke - '+ num);
      return random;
      
    }
    client.getFortune = async function(id=null){
      const data = require('../../fortune-cookie.json');
      let num;
      if(id==null) num = await Math.floor(Math.random()*254)
      else num = id;
      let random = await data[num]
      return random;
    }
    console.log('[SYS] | 💻 | I am ready!');
  

    const http = require('http')
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 250000); 
  }
}

module.exports = methods;