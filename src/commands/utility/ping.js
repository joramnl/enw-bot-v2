const { Command } = require("discord.js-commando");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'utility',
			memberName: 'ping',
			description: 'Returns the ping of the BOT and API',
            guildOnly: true
		});
	}

	async run(message) {
        const m = await message.say('Ping?');
        m.edit(`Pong! Took ${m.createdTimestamp - message.createdTimestamp}ms. API Latency: ${Math.round(this.client.ws.ping)}ms`);
        
		return;
	}
};