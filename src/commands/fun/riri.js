const { Command } = require("discord.js-commando");
const { MessageAttachment } = require("discord.js");
const fs = require('fs')

module.exports = class RiriCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'riri',
      group: 'fun',
      memberName: 'riri',
      description: `Memes about riri`,
      guildOnly: true
    });
  }

  async run(message) {
    fs.readdir(`./assets/riri/`, (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        let randomFile = files[Math.floor(Math.random() * files.length)]; // Picks a random file with Math.random magic.

        let file = new MessageAttachment()
          .setFile(`./assets/riri/${randomFile}`);
    
        return message.say(file);
    });
  }
};