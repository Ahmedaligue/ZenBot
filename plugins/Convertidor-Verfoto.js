import fs from 'fs';
import path from 'path';
import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
  command: ['verfoto', 'verview'],
  help: ['*Ⓥᴇʀғᴏᴛᴏ <ʀᴘᴅ ᴀ ᴜɴᴀ ɪᴍɢ/ᴠɪᴅ ᴅᴇ ᴠᴇʀ sᴏʟᴏ ᴜɴᴀ ᴠᴇᴢ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { conn, chatId }) => {
    try {
      let quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted) return m.tutorial('*[ ⚠️ ] ᴅᴇʙᴇ́s ʀᴇsᴘᴏɴᴅᴇʀ ᴀ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴏ ᴠɪᴅᴇᴏ ᴅᴇ "ᴠᴇʀ ᴜɴᴀ ᴠᴇᴢ".*');

      if (quoted?.ephemeralMessage) quoted = quoted.ephemeralMessage.message;
      if (quoted?.viewOnceMessage) quoted = quoted.viewOnceMessage.message;
      if (quoted?.viewOnceMessageV2) quoted = quoted.viewOnceMessageV2.message;

      const type = quoted?.imageMessage ? 'imageMessage' :
                   quoted?.videoMessage ? 'videoMessage' : null;

      if (!type) return m.reply('*[ ⚠️ ] ᴇʟ ᴍᴇɴsᴀᴊᴇ ɴᴏ ᴄᴏɴᴛɪᴇɴᴇ ᴜɴᴀ ɪᴍᴀɢᴇɴ ɴɪ ᴜɴ ᴠɪᴅᴇᴏ.*');
      const mediaBuffer = await downloadMediaMessage(
        { message: { [type]: quoted[type] } },
        'buffer',
        {},
        { logger: conn.logger, reuploadRequest: conn.updateMediaMessage }
      );

      const extension = type === 'imageMessage' ? '.jpg' : '.mp4';
      const filename = path.join('./temp', `verfoto${Date.now()}${extension}`);
      fs.writeFileSync(filename, mediaBuffer);

      await conn.sendMessage(chatId, {
        [type === 'videoMessage' ? 'video' : 'image']: { url: filename },
        caption: '*📸 ᴀϙᴜɪ́ ᴇsᴛᴀ́ ʟᴀ ɪᴍᴀɢᴇɴ/ᴠɪᴅᴇᴏ ϙᴜᴇ ᴇʀᴀ ᴅᴇ "ᴠᴇʀ ᴜɴᴀ sᴏʟᴀ ᴠᴇᴢ".*'
      }, { quoted: m });

      fs.unlinkSync(filename);

    } catch (e) {
      console.error('Error:', e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  },
};