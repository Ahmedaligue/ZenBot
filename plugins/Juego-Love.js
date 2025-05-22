export default {
  command: ['cuantotequiere', 'love'],
  help: ['*Ⓛᴏᴠᴇ <ᴇᴛɪϙᴜᴇᴛᴀʀ>*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { conn, isGroup }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('*[ ⚠️ ] ᴛᴇɴᴇ́s ϙᴜᴇ ᴍᴇɴᴄɪᴏɴᴀʀ ᴏ ʀᴇsᴘᴏɴᴅᴇʀ ᴀ ᴀʟɢᴜɪᴇɴ ᴘᴀʀᴀ sᴀʙᴇʀ ᴄᴜᴀ́ɴᴛᴏ ᴛᴇ ϙᴜɪᴇʀᴇ.*');

    const porcentaje = Math.floor(Math.random() * 101);

    let mensajeHumor = '';

    if (porcentaje === 0) {
      mensajeHumor = '😂 ᴘᴀʀᴇᴄᴇ ϙᴜᴇ ʜᴀʏ ᴄᴇʀᴏ ɪɴᴛᴇʀᴇ́s. ᴍᴇᴊᴏʀ ʙᴜsϙᴜᴇɴ ᴏᴛʀᴀs ᴏᴘᴄɪᴏɴᴇs.';
    } else if (porcentaje <= 10) {
      mensajeHumor = '😅 ᴜɴ ᴘᴏϙᴜɪᴛᴏ... ᴍᴜʏ ᴘᴏϙᴜɪᴛᴏ, ᴘᴇʀᴏ ᴀʟɢᴏ ᴇs ᴀʟɢᴏ. ᴀ sᴇɢᴜɪʀ ʙᴜsᴄᴀɴᴅᴏ.';
    } else if (porcentaje <= 20) {
      mensajeHumor = '😬 ʜᴍᴍ, ʟᴀ ᴄᴏsᴀ ɴᴏ ᴘɪɴᴛᴀ ᴍᴜʏ ʙɪᴇɴ, ᴘᴇʀᴏ ᴀʟ ᴍᴇɴᴏs ʜᴀʏ ᴀʟɢᴏ ᴅᴇ ᴇsᴘᴇʀᴀɴᴢᴀ.';
    } else if (porcentaje <= 30) {
      mensajeHumor = '🙄 ʜᴀʏ ᴀʟɢᴏ, ᴘᴇʀᴏ ɴᴏ ᴇs sᴜғɪᴄɪᴇɴᴛᴇ. ¡ᴍᴀ́s ᴀᴄᴄɪᴏ́ɴ!';
    } else if (porcentaje <= 40) {
      mensajeHumor = '🤔 ɴᴏ ᴇsᴛᴀ́ ᴍᴀʟ... ᴘᴇʀᴏ ʜᴀʏ ᴍᴜᴄʜᴏ ᴄᴀᴍɪɴᴏ ᴘᴏʀ ʀᴇᴄᴏʀʀᴇʀ.';
    } else if (porcentaje <= 50) {
      mensajeHumor = '😏 ʏᴀ ᴇᴍᴘɪᴇᴢᴀɴ ᴀ ɢᴜsᴛᴀʀsᴇ. ϙᴜɪᴢᴀ́s ᴜɴ ᴘᴏᴄᴏ ᴍᴀ́s ᴅᴇ ᴛɪᴇᴍᴘᴏ ᴊᴜɴᴛᴏs';
    } else if (porcentaje <= 60) {
      mensajeHumor = '😊 ᴇsᴛᴀ́ ᴛᴏᴍᴀɴᴅᴏ ғᴏʀᴍᴀ. ᴜɴ ᴘᴏϙᴜɪᴛᴏ ᴍᴀ́s ʏ sᴇʀᴀ́ ᴀʟɢᴏ sᴇʀɪᴏ.';
    } else if (porcentaje <= 70) {
      mensajeHumor = '💖 ᴇsᴛᴏ ᴇsᴛᴀ́ ᴄᴀsɪ ʟɪsᴛᴏ ᴘᴀʀᴀ ᴜɴ ʀᴏᴍᴀɴᴄᴇ. ¿ϙᴜᴇ́ ᴛᴀʟ ᴜɴᴀ ᴄɪᴛᴀ?';
    } else if (porcentaje <= 90) {
      mensajeHumor = '😍 ᴇʟ ᴀᴍᴏʀ ᴇsᴛᴀ́ ᴀʟ ᴍᴀ́xɪᴍᴏ. ¿ᴛᴇ ᴠᴀs ᴀ ᴅᴇᴄʟᴀʀᴀʀ ᴏ ϙᴜᴇ́?';
    } else {
      mensajeHumor = '✨ ¡ᴇsᴛᴀ́ɴ ʜᴇᴄʜᴏs ᴇʟ ᴜɴᴏ ᴘᴀʀᴀ ᴇʟ ᴏᴛʀᴏ!';
    }

    m.reply(`❤️ ᴇʟ ᴀᴍᴏʀ ᴇɴᴛʀᴇ ᴠᴏs ʏ *@${target.split('@')[0]}* ᴇs ᴅᴇ *${porcentaje}%*\n\n*${mensajeHumor}*`, null, {
      mentions: [target]
    });
  },
};