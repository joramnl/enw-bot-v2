const { Command } = require("discord.js-commando");
const { MessageAttachment } = require("discord.js");
const fs = require('fs')

module.exports = class ShibeCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'shibe',
      group: 'fun',
      memberName: 'shibe',
      description: `Memes about shibe`,
      guildOnly: true
    });
  }

  async run(message) {
    fs.readdir(`./assets/shibe/`, (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        let randomFile = files[Math.floor(Math.random() * files.length)]; // Picks a random file with Math.random magic.

        let file = new MessageAttachment()
          .setFile(`./assets/shibe/${randomFile}`);
    
        return message.say(file);
    });
  }
};