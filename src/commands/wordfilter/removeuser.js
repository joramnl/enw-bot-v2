const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class VipCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'removeuser',
        group: 'wordfilter',
        memberName: 'removeuser',
        description: 'Remove an user from the filtered users list',
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

    filter.removeFilteredUser(user.user.id)
        .then(response => {
            return message.reply(response);
        })
        .catch(reason => {
            return message.reply(reason);
        });

  }
};
