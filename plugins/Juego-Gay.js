export default {
  help: ['𝙲𝚄𝙰𝙽𝚃𝙾𝙶𝙰𝚈 @𝚝𝚊𝚐'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['cuantogay', 'gay'],

  run: async (m, { conn }) => {
    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] *𝐓𝐞𝐧𝐞́𝐬 𝐪𝐮𝐞 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐚𝐥𝐠𝐮𝐢𝐞𝐧 𝐩𝐚𝐫𝐚 𝐜𝐚𝐥𝐜𝐮𝐥𝐚𝐫 𝐪𝐮𝐞́ 𝐭𝐚𝐧 𝐠𝐚𝐲 𝐞𝐬.* 😜💯');

    const porcentaje = Math.floor(Math.random() * 101);
    let mensaje = '';

    switch (true) {
      case (porcentaje === 0):
        mensaje = '💀 ɴᴏ ᴛɪᴇɴᴇ ɴɪ ᴜɴ ʙʀɪʟʟᴏ ɢᴀʏ... ¿sᴇɢᴜʀᴏ ϙᴜᴇ ᴇsᴛᴀ́ ᴠɪᴠᴏ?';
        break;
      case (porcentaje <= 10):
        mensaje = '😐 ᴀʟɢᴏ sᴇ sᴏsᴘᴇᴄʜᴀ, ᴘᴇʀᴏ ᴛᴏᴅᴀᴠɪ́ᴀ sᴇ ʜᴀᴄᴇ ᴇʟ ᴅᴜʀᴏ.';
        break;
      case (porcentaje <= 20):
        mensaje = '🤔 ᴛɪᴇɴᴇ ᴍᴀ́s ᴘʟᴜᴍᴀ ᴜɴ ʟᴀᴅʀɪʟʟᴏ, ᴘᴇʀᴏ ᴀʟɢᴏ ʜᴀʏ.';
        break;
      case (porcentaje <= 30):
        mensaje = '🎤 ɴᴏ ᴇs ɢᴀʏ, sᴏʟᴏ ᴄᴀɴᴛᴀ ᴅᴜᴀ ʟɪᴘᴀ ᴇɴ ʟᴀ ᴅᴜᴄʜᴀ.';
        break;
      case (porcentaje <= 40):
        mensaje = '👀 ᴜɴ ᴘɪᴇ ᴀᴅᴇɴᴛʀᴏ, ᴏᴛʀᴏ ᴀғᴜᴇʀᴀ... sᴏsᴘᴇᴄʜᴏsᴏ.';
        break;
      case (porcentaje <= 50):
        mensaje = '⚧️ ʙɪsᴇxᴜᴀʟ ᴠɪʙᴇs ᴀᴄᴛɪᴠᴀᴅᴀs, ᴘᴇʀᴏ ᴍᴇᴅɪᴏ ᴀᴘᴀɢᴀᴅᴀs.';
        break;
      case (porcentaje <= 60):
        mensaje = '🌈 ᴛɪᴇɴᴇ ᴍᴀ́s ᴀʀᴄᴏɪ́ʀɪs ᴇɴ ᴇʟ ᴀʟᴍᴀ ϙᴜᴇ ʟᴀ ʙᴀɴᴅᴇʀᴀ LGBT.';
        break;
      case (porcentaje <= 70):
        mensaje = '💅 ᴇsᴇ ʏᴀ sᴇ ᴅᴇᴄʟᴀʀᴀ ғᴀɴ ᴅᴇ ʀᴜᴘᴀᴜʟ sɪɴ ᴠᴇʀɢᴜ̈ᴇɴᴢᴀ.';
        break;
      case (porcentaje <= 90):
        mensaje = '🦄 sᴀʟᴇ ᴀ ʟᴀ ᴄᴀʟʟᴇ ʏ ʟᴏs ᴜɴɪᴄᴏʀɴɪᴏs ʟᴏ sᴀʟᴜᴅᴀɴ.';
        break;
      case (porcentaje < 100):
        mensaje = '👛 ʀᴇᴠᴏʟᴇᴀ ʟᴀ ᴄᴀʀᴛᴇʀᴀ ᴄᴏᴍᴏ sɪ ғᴜᴇʀᴀ sᴜᴘᴇʀᴘᴏᴅᴇʀ.';
        break;
      case (porcentaje === 100):
        mensaje = '👑 ¡ᴄᴏɴғɪʀᴍᴀᴅɪ́sɪᴍᴏ! ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ ᴇs ᴇʟ ᴘʀᴇsɪᴅᴇɴᴛᴇ ᴅᴇʟ ᴄʟᴜʙ ɢᴀʏ ᴏғɪᴄɪᴀʟ.';
        break;
    }

    m.reply(`🌈 *𝙉𝙞𝙫𝙚𝙡 𝙙𝙚 𝙜𝙖𝙮 𝙙𝙚 @${target.split('@')[0]}: ${porcentaje}%*\n\n${mensaje}`, null, { mentions: [target] });
  }
};