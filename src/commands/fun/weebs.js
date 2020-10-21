const { Command } = require("discord.js-commando");
const { MessageAttachment } = require("discord.js");
const fs = require('fs')

module.exports = class WeebsCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'weebs',
      group: 'fun',
      memberName: 'weebs',
      description: `Memes about weebs`,
      guildOnly: true
    });
  }

  async run(message) {
    fs.readdir(`./assets/weebs/`, (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        let randomFile = files[Math.floor(Math.random() * files.length)]; // Picks a random file with Math.random magic.

        let file = new MessageAttachment()
          .setFile(`./assets/weebs/${randomFile}`);
    
        return message.say(file);
    });
  }
};