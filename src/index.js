require('dotenv').config();
console.log('TOKEN:', process.env.BOT_TOKEN);

const { Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`✅${c.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'meow :3') {
        message.reply('meow :3');
    }
});

client.login(process.env.BOT_TOKEN);