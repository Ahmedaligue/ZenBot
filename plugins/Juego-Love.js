export default {
  help: ['𝙲𝚄𝙰𝙽𝚃𝙾𝚃𝙴𝚀𝚄𝙸𝙴𝚁𝙴 @𝚝𝚊𝚐'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['cuantotequiere', 'love'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, botNumber, owner, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] *𝐓𝐞𝐧𝐞́𝐬 𝐪𝐮𝐞 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐚𝐥𝐠𝐮𝐢𝐞𝐧 𝐩𝐚𝐫𝐚 𝐬𝐚𝐛𝐞𝐫 𝐜𝐮𝐚́𝐧𝐭𝐨 𝐭𝐞 𝐪𝐮𝐢𝐞𝐫𝐞.*');

    const porcentaje = Math.floor(Math.random() * 101);

    let mensajeHumor = '';

    // Mensajes según el porcentaje
    if (porcentaje === 0) {
      mensajeHumor = '😂 ¡ᴘᴀʀᴇᴄᴇ ϙᴜᴇ ʜᴀʏ ᴄᴇʀᴏ ɪɴᴛᴇʀᴇ́s! ᴍᴇᴊᴏʀ ʙᴜsϙᴜᴇɴ ᴏᴛʀᴀs ᴏᴘᴄɪᴏɴᴇs. 😂';
    } else if (porcentaje <= 10) {
      mensajeHumor = '😅 ᴜɴ ᴘᴏϙᴜɪᴛᴏ... ᴍᴜʏ ᴘᴏϙᴜɪᴛᴏ, ᴘᴇʀᴏ ᴀʟɢᴏ ᴇs ᴀʟɢᴏ. ¡ᴀ sᴇɢᴜɪʀ ʙᴜsᴄᴀɴᴅᴏ! 😅';
    } else if (porcentaje <= 20) {
      mensajeHumor = '😬 ʜᴍᴍ, ʟᴀ ᴄᴏsᴀ ᴇsᴛᴀ́ ғʀɪ́ᴀ. ¡ᴛᴀʟ ᴠᴇᴢ ᴘᴀʀᴀ ᴏᴛʀᴏ ᴅɪ́ᴀ! 😬';
    } else if (porcentaje <= 30) {
      mensajeHumor = '🙄 ʜᴀʏ ᴀʟɢᴏ, ᴘᴇʀᴏ ɴᴏ ᴇs sᴜғɪᴄɪᴇɴᴛᴇ. ¡ᴍᴀ́s ᴀᴄᴄɪᴏ́ɴ! 🙄';
    } else if (porcentaje <= 40) {
      mensajeHumor = '🤔 ɴᴏ ᴇsᴛᴀ́ ᴍᴀʟ... ᴘᴇʀᴏ ʜᴀʏ ᴍᴜᴄʜᴏ ᴄᴀᴍɪɴᴏ ᴘᴏʀ ʀᴇᴄᴏʀʀᴇʀ. 🤔';
    } else if (porcentaje <= 50) {
      mensajeHumor = '😏 ¡ʏᴀ ᴇᴍᴘɪᴇᴢᴀɴ ᴀ ɢᴜsᴛᴀʀsᴇ! ¡ϙᴜɪᴢᴀ́s ᴜɴ ᴘᴏᴄᴏ ᴍᴀ́s ᴅᴇ ᴛɪᴇᴍᴘᴏ ᴊᴜɴᴛᴏs! 😏';
    } else if (porcentaje <= 60) {
      mensajeHumor = '😊 ¡ᴇsᴛᴀ́ ᴛᴏᴍᴀɴᴅᴏ ғᴏʀᴍᴀ! ᴜɴ ᴘᴏϙᴜɪᴛᴏ ᴍᴀ́s ʏ sᴇʀᴀ́ ᴀʟɢᴏ sᴇʀɪᴏ. 😊';
    } else if (porcentaje <= 70) {
      mensajeHumor = '💖 ¡ᴇsᴛᴏ ᴇsᴛᴀ́ ᴄᴀsɪ ʟɪsᴛᴏ ᴘᴀʀᴀ ᴜɴ ʀᴏᴍᴀɴᴄᴇ! ¿ϙᴜᴇ́ ᴛᴀʟ ᴜɴᴀ ᴄɪᴛᴀ? 💖';
    } else if (porcentaje <= 90) {
      mensajeHumor = '😍 ¡ᴇʟ ᴀᴍᴏʀ ᴇsᴛᴀ́ ᴀʟ ᴍᴀ́xɪᴍᴏ! ¿ᴛᴇ ᴠᴀs ᴀ ᴅᴇᴄʟᴀʀᴀʀ ᴏ ϙᴜᴇ́? 😍';
    } else {
      mensajeHumor = '✨ ¡ᴇsᴛᴀ́ɴ ʜᴇᴄʜᴏs ᴇʟ ᴜɴᴏ ᴘᴀʀᴀ ᴇʟ ᴏᴛʀᴏ! ✨';
    }

    const resultado = `❤️ 𝙀𝙡 𝙖𝙢𝙤𝙧 𝙚𝙣𝙩𝙧𝙚 𝙫𝙤𝙨 𝙮 *@${target.split('@')[0]}* 𝙚𝙨 𝙙𝙚 *${porcentaje}%*\n\n${mensajeHumor}`;

    try {
      m.reply(resultado, null, { mentions: [target] });
    } catch (e) {
      console.error('❌ Error al intentar calcular el amor:', e);
      return m.reply('[ ⚠️ ] *𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐜𝐚𝐥𝐜𝐮𝐥𝐚𝐫 𝐞𝐥 𝐚𝐦𝐨𝐫.*');
    }
  }
};