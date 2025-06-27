import fs from 'fs';
import path from 'path';
import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
  command: ['veraudio', 'voaudio'],
  help: ['*Ⓥᴇʀᴀᴜᴅɪᴏ <ʀᴘᴅ ᴀ ᴜɴ ᴀᴜᴅɪᴏ ᴅᴇ ᴠᴇʀ ᴜɴᴀ sᴏʟᴀ ᴠᴇᴢ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { conn, chatId }) => {
    try {
      let quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted) return m.tutorial('*[ ⚠️ ] ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴜɴ ᴀᴜᴅɪᴏ ᴅᴇ "ᴠᴇʀ ᴜɴᴀ sᴏʟᴀ ᴠᴇᴢ".*');

      if (quoted?.ephemeralMessage) quoted = quoted.ephemeralMessage.message;
      if (quoted?.viewOnceMessage) quoted = quoted.viewOnceMessage.message;
      if (quoted?.viewOnceMessageV2) quoted = quoted.viewOnceMessageV2.message;

      const type = quoted?.audioMessage ? 'audioMessage' : null;
      if (!type) return m.reply('*[ ⚠️ ] ᴇʟ ᴍᴇɴsᴀᴊᴇ ɴᴏ ᴄᴏɴᴛɪᴇɴᴇ ᴜɴ ᴀᴜᴅɪᴏ.*');

      const audioBuffer = await downloadMediaMessage(
        { message: { [type]: quoted[type] } },
        'buffer',
        {},
        { logger: conn.logger, reuploadRequest: conn.updateMediaMessage }
      );

      const filename = path.join('./temp', `veraudio_${Date.now()}.mp3`);
      fs.writeFileSync(filename, audioBuffer);

      await conn.sendMessage(chatId, {
        audio: { url: filename },
        mimetype: 'audio/mpeg',
        ptt: true
      }, { quoted: m });

      fs.unlinkSync(filename);

    } catch (e) {
      console.error('Error:', e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  },
};