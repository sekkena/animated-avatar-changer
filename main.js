import { client } from './modules/bot.js';
import { colors } from 'console-log.js';
client.on('ready', () => {
  console.log(colors.random(`[API] ${client.user.tag} Is Online, Running In ${client.guilds.cache.size}`));
});