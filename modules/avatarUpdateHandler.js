import fetch from 'node-fetch';
import { colors } from 'console-log.js';
async function updateAvatar(token, newAvatarUrl) {
  try {
    const response = await fetch(newAvatarUrl);
    const newAvatarBuffer = await response.buffer();
    const responsePatch = await fetch('https://discord.com/api/v9/users/@me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `data:image/gif;base64,${newAvatarBuffer.toString('base64')}`
      })
    });

    if (responsePatch.ok) {
      console.log(colors.yellow('[NODE:FETCH] Avatar updated successfully!'));
    } else {
      console.error('Failed to update avatar:', responsePatch.statusText);
      const responseBody = await responsePatch.text();
      console.error('Response body:', responseBody);
    }
  } catch (error) {
    console.error('Error updating avatar:', error);
  }
}

export { updateAvatar };
