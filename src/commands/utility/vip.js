const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class VipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'vip',
      group: 'utility',
      memberName: 'vip',
      description: 'Helps you setting up your Discord link with the VIP System',
      guildOnly: true
    });
  }

  run(message) {
    let embed = new MessageEmbed()
      .setColor("#0080ff")
      .setTitle("Kanker")
      .setAuthor("Extreme-Network", this.client.user.avatarURL(), "https://extreme-network.net")
      .addField('Step 1', "Type `enw.userid` and hit enter.", true)
      .addField('Step 2', "Copy ID and navigate to your VIP profile (https://www.extreme-network.net/vip/?viewmyprofile=1)", true)
      .addField('Step 3', "Look for the Discord section, paste your ID in the input box and hit 'Send'", true)
      .setFooter("If you've done these steps correctly, and you have an active VIP subscription. The bot will update your roles within a minute.", this.client.user.avatarURL());

    return message.say(embed);
  }
};