import { config } from '../config.js';

export default {
  command: ['reporte', 'bug', 'reportar'],
  help: ['*Ⓡᴇᴘᴏʀᴛᴀʀ <ᴄᴍᴅ + ᴘʙᴍ>*'],
  tags: ['*𝕀ℕ𝔽𝕆𝔹𝕆𝕋*'],
  
  run: async (m, { conn, args, text, sender, isGroup, prefix, command }) => {
    const reportText = text.trim();
    const from = m.key.remoteJid;

    if (!reportText) {
      return await m.reply(`*[ ❗ ] ᴘᴏʀ ғᴀᴠᴏʀ, ᴇsᴄʀɪʙᴇ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ϙᴜᴇ ғᴀʟʟᴀ ʏ ᴜɴᴀ ʙʀᴇᴠᴇ ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ ᴅᴇʟ ᴘʀᴏʙʟᴇᴍᴀ.* (ᴇᴊ: ${prefix + command} ᴄᴏᴍᴀɴᴅᴏ + ᴘʀᴏʙʟᴇᴍᴀ)`);
    }

    const reportMessage = `
*🌟 𝐍𝐔𝐄𝐕𝐎 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 𝐑𝐄𝐂𝐈𝐁𝐈𝐃𝐎 🌟*

*🧑‍💻 ᴅᴇ:* ${sender.split('@')[0]}
${isGroup ? `*💬 ɢʀᴜᴘᴏ:* ${from}` : ''}
*📝 ʀᴇᴘᴏʀᴛᴇ:*
${reportText}
    `.trim();

    try {
      await conn.sendMessage(config.owner + '@s.whatsapp.net', { text: reportMessage });
      await m.reply('*[ ✅ ] ᴛᴜ ʀᴇᴘᴏʀᴛᴇ ʜᴀ sɪᴅᴏ ᴇɴᴠɪᴀᴅᴏ ᴇxɪᴛᴏsᴀᴍᴇɴᴛᴇ ᴀʟ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ ʙᴏᴛ.*¡ɢʀᴀᴄɪᴀs ᴘᴏʀ ᴛᴜ ᴄᴏʟᴀʙᴏʀᴀᴄɪᴏ́ɴ*! 🙌');
    } catch (e) {
      await m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ᴄᴏɴᴛᴀᴄᴛᴀʀ ᴀʟ ᴄʀᴇᴀᴅᴏʀ. 📍*');
    }
  }
};