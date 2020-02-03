const Discord = require('discord.js');
var WebSocketServer = require('websocket').server;
var http = require('http');
const bot = new Discord.Client();
const fs = require("fs");
const mongoose = require("mongoose");

// New engine
mongoose.set('useUnifiedTopology', true);

// commands collection init
bot.commands = new Discord.Collection();

bot.on('ready', () => {
  console.log("Port is online - built by Vortx")
  console.log("token: "+TOKEN)

  // search for commands & init command handler
  fs.readdir("./commands", (err, files) => {

    if(err) console.log(err); // log all errors

    let jsfile = files.filter(f => f.split('.').pop() === 'js') // search for all 'js' files
    if(jsfile.length <= 0){ // if there is no content on the file
      console.log("commands not found");
      return;
    }

    jsfile.forEach((f, i) =>{ // f = file, i = number of files
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded`); // log which commands have been initialized
      bot.commands.set(props.help.name, props); // set the help message to what is on the command file
    });
  });
});
// bot config
const { prefix, TOKEN, mongousr, mongopwd } = require('./config.json');

mongoose.connect('mongodb+srv://'+mongousr+':'+mongopwd+'@cluster0-hlnlb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}).catch(err => console.log(err));

const user = mongoose.model('users', { username: String, password: String, salt: String, guilds: [String] });

bot.on('message', (message) => {
  // stuff to pass to commands
  let message_array = message.content.split(" ");
  let cmd = message_array[0];
  let args = message_array.slice(1);

  // For testing only
  if (message.embed) {
    console.log("Embed");
  } else {
    console.log(`${message.author}: ${message.content}`);
  }
  // ===============


  // run handler
  if (message.author.bot) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot,message,args), console.log(`${message.guild.name}: ${commandfile.help.name}`);

});

// run the bot
bot.login(TOKEN)
