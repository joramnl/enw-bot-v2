const { Command } = require("discord.js-commando");
const { MessageAttachment } = require("discord.js");
const fs = require('fs')

module.exports = class SchwarzCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'schwarz',
      group: 'fun',
      memberName: 'schwarz',
      description: 'Memes about schwarz',
      guildOnly: true
    });
  }

  async run(message) {
    fs.readdir('./assets/schwarz/', (err, files) => {

        if (err) {
            console.error(err);
            return;
        }

        let randomNumber = Math.floor(Math.random() * files.length);
        let randomFile = files[randomNumber]; // Picks a random file with Math.random magic.

        let file = new MessageAttachment()
            .setFile(`./assets/schwarz/${randomFile}`)
    
        return message.say(`Randomly picked image #${randomNumber + 1} out of a total of ${files.length} images.`, file);
    });
  }
};