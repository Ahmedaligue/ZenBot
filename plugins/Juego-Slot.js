export default {
  command: ['slot', 'casino'],
  help: ['*Ⓢʟᴏᴛ*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m) => {
    const emojis = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎'];
    const getRandom = () => emojis[Math.floor(Math.random() * emojis.length)];

    const slot1 = getRandom();
    const slot2 = getRandom();
    const slot3 = getRandom();

    let resultado;
    if (slot1 === slot2 && slot2 === slot3) {
      resultado = '*🎉 ¡𝐉𝐀𝐂𝐊𝐏𝐎𝐓! ¡𝐆𝐚𝐧𝐚𝐬𝐭𝐞!*';
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      resultado = '*✨ ¡ᴄᴀsɪ! ᴛᴇ ʟʟᴇᴠᴀ́s ᴜɴ ᴘʀᴇᴍɪᴏ ᴘᴇϙᴜᴇɴ̃ᴏ.*';
    } else {
      resultado = '*💔 ᴍᴀʟᴀ sᴜᴇʀᴛᴇ... ¡ɪɴᴛᴇɴᴛᴀ́ ᴅᴇ ɴᴜᴇᴠᴏ!*';
    }

    const mensaje = `
🎰 *𝐒𝐋𝐎𝐓 𝐌𝐀𝐂𝐇𝐈𝐍𝐄* 🎰

| ${slot1} | ${slot2} | ${slot3} |

${resultado}
    `.trim();

    await m.reply(mensaje);
  }
};