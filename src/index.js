require("dotenv").config();
const axios = require("axios");
const Commando = require("discord.js-commando");

const { Client, IntentsBitField } = require("discord.js");

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

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "meow") {
    interaction.reply("meow :3");
  }
  if (interaction.commandName === "ive-been-sad-lately-cat-bot") {
    interaction.reply("meow :(");
  }
  if (interaction.commandName === "meow-meow-meow") {
    const num = interaction.options.get("meow-request").value;
    const maxMeows = 200;

    if (num > maxMeows) {
      const gifUrl =
        "https://media.tenor.com/Mow3BwJQLc8AAAAi/cat-cat-meme.gif";
      interaction.reply({ files: [gifUrl] });
    } else {
      const response = "meow ".repeat(num).trim();
      interaction.reply(response);
    }
  }
});

module.exports = class CatImageCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "cat-image",
      group: "misc",
      memberName: "cat",
      description: "Displays a random image of a cat",
    });
  }
  run = async((message) => {
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((res) => {
        message.reply(res.data[0].url);
      })
      .catch((err) => {
        console.error("ERR:", err);
      });
  });
};

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "meow :3") {
    message.reply("meow :3");
  }

  if (message.content === "what do you think about this cat bot") {
    const gifUrl = "https://media1.tenor.com/m/DtD4LZbctTIAAAAC/tamm-cat.gif";
    message.reply({ files: [gifUrl] });
  }
});

client.login(process.env.BOT_TOKEN);
