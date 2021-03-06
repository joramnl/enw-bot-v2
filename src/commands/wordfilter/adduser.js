const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class VipCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'adduser',
        group: 'wordfilter',
        memberName: 'adduser',
        description: 'Adds a user to the filtered users list',
        guildOnly: true,
        args: [
            {
                key: 'user',
                prompt: 'Please tag an user',
                type: 'member',
            },
        ],
        userPermissions: ['MUTE_MEMBERS']
    });
  }

  async run(message, { user }) {

    let filter = new EnwFilter();

    filter.addFilteredUser(user.user.id)
        .then(response => {
            return message.reply(response);
        })
        .catch(reason => {
            return message.reply(reason);
        });

  }
};
