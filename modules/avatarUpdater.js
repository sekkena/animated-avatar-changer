import { ModalBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import { updateAvatar } from './avatarUpdateHandler.js';

async function handleGifStart(interaction) {
  const giftranser = new ModalBuilder()
    .setCustomId('gifavt')
    .setTitle('Change Bot Avt To Gif');

  const AccTokenuser = new TextInputBuilder()
    .setCustomId('accTokengif')
    .setLabel('Bot Token')
    .setRequired(true)
    .setPlaceholder('Your Bot Token')
    .setStyle(TextInputStyle.Short);

  const gigURL = new TextInputBuilder()
    .setCustomId('gifurl')
    .setLabel('Bot Gif Avatar')
    .setRequired(true)
    .setPlaceholder('https://example.com/path/to/your/new/avatar.gif')
    .setStyle(TextInputStyle.Short);

  const tokengitchange = new ActionRowBuilder().addComponents(AccTokenuser);
  const avatargifURL = new ActionRowBuilder().addComponents(gigURL);

  giftranser.addComponents(tokengitchange, avatargifURL);

  await interaction.showModal(giftranser);
}
function handleGifCommand(message) {
    const gifbut = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel('Change Bot Avt To GIF')
      .setCustomId(`gifstart`);
    const actionrow = new ActionRowBuilder().addComponents([gifbut]);
    message.channel.send({ components: [actionrow] });
  }

async function handleGifAvt(interaction) {
  await interaction.deferReply({ ephemeral: true });
  interaction.editReply({
    content: 'Wait 1m And Your Bot Avt Will Be Changed To GIF.',
    ephemeral: true,
  });

  setTimeout(async () => {
    interaction.editReply({ content: `**Done Send Request To Discord API**` });
  }, 16000);

  const token = interaction.fields.getTextInputValue('accTokengif');
  const gif = interaction.fields.getTextInputValue('gifurl');
  const user = interaction.user.id;

  let botToken = token;
  let newAvatarUrl = gif;
  updateAvatar(botToken, newAvatarUrl);
}

export { handleGifStart, handleGifCommand, handleGifAvt };