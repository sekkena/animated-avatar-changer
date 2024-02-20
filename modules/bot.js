import { Client, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';
import { handleGifStart, handleGifAvt, handleGifCommand } from './avatarUpdater.js';
import 'dotenv/config';
const client = new Client({
    intents: 3276543,
    ws: { properties: { browser: "Discord iOS" } },
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('sendgif')) {
        handleGifCommand(message);
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.customId === 'gifstart') {
        handleGifStart(interaction);
    }
    if (interaction.customId === 'gifavt') {
        handleGifAvt(interaction);
    }
});

client.login(process.env.TOKEN);

export { client };