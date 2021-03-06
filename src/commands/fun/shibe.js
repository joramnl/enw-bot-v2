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

        let randomNumber = Math.floor(Math.random() * files.length);
        let randomFile = files[randomNumber]; // Picks a random file with Math.random magic.

        let file = new MessageAttachment()
          .setFile(`./assets/shibe/${randomFile}`);
    
        return message.say(`Randomly picked image #${randomNumber + 1} out of a total of ${files.length} images.`, file);
    });
  }
};