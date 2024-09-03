require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');


const commands = [
    {
        name: 'meow',
        description: 'meow :3',
    },
    {
        name: 'ive-been-sad-lately-cat-bot',
        description: 'meow :(',
    },
    {
        name: 'meow-meow-meow',
        description: 'ask cat bot to meow a certain amount of times',
        options: [
            {
                name: 'meow-request',
                description: 'how many times you want cat bot to meow',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
    {
        name: 'cat-pic',
        description: 'generates a random cat image'
    },
];

const rest = new REST ({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commmands were registered correctly!')
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();