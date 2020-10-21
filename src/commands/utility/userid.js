const { Command } = require("discord.js-commando");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'userid',
			group: 'utility',
			memberName: 'userid',
            description: 'Returns the userid of you or the user you mentioned',
            guildOnly: true
		});
	}

	run(message) {
        const mentionedClient = message.mentions.members.first();

		if (!mentionedClient) {
			return message.say(`:1234: <@${message.member.id}>'s your userID is: ${message.member.id}`);
		}
		else {
			return message.say(`:1234: <@${mentionedClient.id}>'s userID is: ${mentionedClient.id}`);
        }
	}
};