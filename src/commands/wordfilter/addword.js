const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class VipCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'addword',
        group: 'wordfilter',
        memberName: 'addword',
        description: 'Adds a word to the filtered words list',
        guildOnly: true,
        args: [
            {
                key: 'pattern',
                prompt: 'Please specify a word',
                type: 'string',
            },
        ],
        userPermissions: ['MUTE_MEMBERS']
    });
  }

  async run(message, { pattern }) {

    let filter = new EnwFilter();

    filter.addPattern(pattern, true)
        .then(response => {
            return message.reply(response);
        })
        .catch(reason => {
            return message.reply(reason);
        });

  }
};
