const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class VipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'wordlist',
      group: 'wordfilter',
      memberName: 'wordlist',
      description: 'Shows a list of filtered words',
      guildOnly: true,
      userPermissions: ['MUTE_MEMBERS']
    });
  }

  async run(message) {

    let filter = new EnwFilter();
    filter.getPatterns()
        .then(patterns => {

          let words = "Current patterns: \n";

          patterns.forEach((value, index) => {
            words += (index+1) + ". `" + value + "`\n";
          })

          return message.say(words);
        })
        .catch(_ => {
          return message.say("Failed getting word list.");
        })
  }
};
