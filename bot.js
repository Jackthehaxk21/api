
const Discord = require('discord.js');
const client = new Discord.Client();

const webHandler = require('./web.js');
//KEEP BOT WEBSITE RUNNING
/////////////////////////////
webHandler.run(client); ////////  
////////////////////////////
const ready = require('./Data/Functions/clientOn/ready.js');
client.on('ready', async function(message) {
  ready.run(client)
  //console.log(client.AUTH)
  //if(message.content == 'mkb!test') {
  const snek = require('snekfetch')
  let d = snek.get('http://www.fmylife.com/random')
  console.log(d.text)
    /*const fortune1 = await snekfetch.get("https://mk-web.glitch.me/API/fortune").set("Authentication", "M.kytwdhaorb.HHjssjU.jaodjem");
    const fortune2 = await snekfetch.get("https://mk-web.glitch.me/API/fortune").set("Authentication", "M.kytwdhaorb.HHjssjU.jaodjem");
    
  console.log("1- "+fortune1.text)
  console.log("2- "+fortune2.text)*/
  /*
    content = joke.body
    title = joke.title
    category = joke.category
    id = joke.id
    */
    return;
  //}
})
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN)