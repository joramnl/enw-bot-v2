require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const EnwFilter  = require("./filter");
const path = require('path');
const config = require('./config.json');

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owner,
});


client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['utility', 'Utility commands to make your life better.'],
    ['fun', 'Commands to have a laugh'],
    ['wordfilter', 'Word filter (Staff only)'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    ping: false,
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity(`${config.prefix}help | exteme-network.net`);
  let filter = new EnwFilter();

  client.on("message", (message) => {

    filter.testMessage(message);

  });

});

client.on('error', console.error);

client.login(process.env.BOT_TOKEN);
