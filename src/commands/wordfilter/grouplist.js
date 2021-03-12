const { Command } = require("discord.js-commando");
const EnwFilter = require("../../filter");

module.exports = class UserListCommand extends Command {
  constructor(client) {
    super(client, {
        name: 'grouplist',
        group: 'wordfilter',
        memberName: 'grouplist',
        description: 'Shows a list of filtered groups',
        guildOnly: true,
        userPermissions: ['MUTE_MEMBERS']
    });
  }

  async run(message, { user }) {

    let filter = new EnwFilter();

    let groupNames = "Current groups in the filtered list:\n";

    filter.getFilteredGroups().forEach((group, index) => {
      groupNames += `${index+1}. <@&${group}>\n`;
    });

    await message.say(groupNames);

  }
};
