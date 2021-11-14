const { Command } = require("discord.js-commando");

module.exports = class CloseThreadCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'closethread',
      group: 'utility',
      memberName: 'closethread',
      description: 'Sets send message permission for @everyone to false after a specific time',
      guildOnly: true,
      examples: ['closethread <thread> <time in minutes>'],
      args: [
        {
          key: 'channel',
          prompt: 'Affected channel',
          type: 'channel'
        },
        {
          key: 'time',
          prompt: 'Time in minutes',
          type: 'integer'
        }
      ]
    });
  }

  async run(message, {channel, time}) {

    message.say(`Ok, will close channel in ${time} minutes`);
    message.say(`Time: ${time * 60 * 1000}`);

    setTimeout(function () {
      channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
      channel.send("Closed this channel")
    }, time * 60 * 1000);

    return;
  }
};