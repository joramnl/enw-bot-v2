const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class VipCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'addregex',
        group: 'wordfilter',
        memberName: 'addregex',
        description: 'Adds a regex pattern to the filtered words list',
        guildOnly: true,
        args: [
            {
                key: 'pattern',
                prompt: 'Please specify a word',
                type: 'string',
            },
        ],
        userPermissions: ['MANAGE_GUILD']
    });
  }

  async run(message, { pattern }) {

    let filter = new EnwFilter();

    filter.addPattern(pattern, false)
        .then(response => {
            return message.reply(response);
        })
        .catch(reason => {
            return message.reply(reason);
        });

  }
};
