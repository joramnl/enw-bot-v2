const { Command } = require("discord.js-commando");
const { MessageAttachment } = require("discord.js");
const fs = require('fs')

module.exports = class DabCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'dab',
      group: 'fun',
      memberName: 'dab',
      description: `Memes about dab`,
      guildOnly: true
    });
  }

  async run(message) {
    fs.readdir(`./assets/dab/`, (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        let randomFile = files[Math.floor(Math.random() * files.length)]; // Picks a random file with Math.random magic.

        let file = new MessageAttachment()
          .setFile(`./assets/dab/${randomFile}`);
    
        return message.say(file);
    });
  }
};