import { toImg } from '../lib/sticker.js';
import { getFileBuffer } from '../lib/myfunc.js';

export default {
  command: ['toimg', 'stickerimg', 'stickertoimg'],
  help: ['*Ⓣᴏɪᴍɢ <ʀᴅᴘ ᴜɴᴀ ɪᴍᴀ́ɢᴇɴ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ*'],

  run: async (m, { conn, chatId, command, prefix }) => {
    try {
      const quoted = m.quoted?.message || m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const isSticker = quoted?.stickerMessage;

      if (!isSticker) {
        return m.reply(`*[ ❗ ] ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴜɴ sᴛɪᴄᴋᴇʀ ᴘᴀʀᴀ ᴄᴏɴᴠᴇʀᴛɪʀʟᴏ ᴇɴ ɪᴍᴀɢᴇɴ.* (ᴇᴊ: *${prefix + command}* _Rpd un sticker_`);
      }

      await m.reply('*ᴄᴏɴᴠɪʀᴛɪᴇɴᴅᴏ sᴛɪᴄᴋᴇʀ ᴀ ɪᴍᴀɢᴇɴ, ᴜɴ ᴍᴏᴍᴇɴᴛᴏ ᴘʟᴇᴀsᴇ. 🤠👍*');

      const { buffer } = await getFileBuffer({ message: { stickerMessage: quoted.stickerMessage } }, 'sticker');

      const imgBuffer = await toImg(buffer);

      await conn.sendMessage(chatId, { image: imgBuffer }, { quoted: m });

    } catch (err) {
      console.error('Error:', err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};