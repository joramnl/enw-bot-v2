const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class UserListCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'userlist',
        group: 'wordfilter',
        memberName: 'userlist',
        description: 'Shows a list of filtered users',
        guildOnly: true,
        userPermissions: ['MUTE_MEMBERS']
    });
  }

  async run(message, { user }) {

    let filter = new EnwFilter();

    filter.getFilteredUsers()
        .then(users => {

          let memberNames = "Current users in the filtered list:\n";

          users.forEach((user, index) => {
            memberNames += `${index+1}. <@${user}>\n`;
          });

          message.say(memberNames);

        })
        .catch(reason => {
            return message.reply(reason);
        });

  }
};
