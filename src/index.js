require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity(`${config.prefix}help | exteme-network.net`);
});

client.on('message', (msg) => {
  if (msg.content === 'Who is a French bitch?') {
    msg.reply('Bagout, of course');
  }
});

client.login(process.env.BOT_TOKEN);
