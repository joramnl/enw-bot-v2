require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setActivity(`${config.prefix}help | exteme-network.net`);
});

client.on('message', async (message) => {

	// Ignore bots
	if (message.author.bot) return;

	// Only if it's our own prefix!
	if (!message.content.startsWith(config.prefix)) return;

	// Split into command and args
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		const m = await message.channel.send('Ping?');
		m.edit(`Pong! Took ${m.createdTimestamp - message.createdTimestamp}ms. API Latency: ${Math.round(client.ws.ping)}ms`);
	}

	if (command === 'userid') {
		const mentionedClient = message.mentions.members.first();

		if (!mentionedClient) {
			return message.channel.send(`:1234: <@${message.member.id}>'s your userID is: ${message.member.id}`);
		}
		else {
			return message.channel.send(`:1234: <@${mentionedClient.id}>'s userID is: ${mentionedClient.id}`);
    }
	}

	if (command === 'vip') {
    let embed = new Discord.MessageEmbed()
      .setColor("#0080ff")
      .setTitle("Kanker")
      .setAuthor("Extreme-Network", client.user.avatarURL(), "https://extreme-network.net")
      .addField('Step 1', "Type `enw.userid` and hit enter.", true)
      .addField('Step 2', "Copy ID and navigate to your VIP profile (https://www.extreme-network.net/vip/?viewmyprofile=1)", true)
      .addField('Step 3', "Look for the Discord section, paste your ID in the input box and hit 'Send'", true)
      .setFooter("If you've done these steps correctly, and you have an active VIP subscription. The bot will update your roles within a minute.", client.user.avatarURL());

    return message.channel.send(embed);
	}
});

client.login(process.env.BOT_TOKEN);
