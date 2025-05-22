import { getFileBuffer } from '../lib/myfunc.js';
import { sendImageAsSticker, sendVideoAsSticker } from '../lib/sticker.js';

export default {
  command: ['sticker', 'stik', 's', 'st'],
  help: ['*Ⓢᴛɪᴄᴋᴇʀ<ɪᴍᴀɢᴇɴ/ᴠɪᴅᴇᴏ 8s>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ*'],

  run: async (m, { conn, chatId, command, prefix }) => {
    try {
      const quoted = m.quoted?.msg || m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const img = quoted?.imageMessage || m.message?.imageMessage || quoted?.viewOnceMessage?.message?.imageMessage;
      const vid = quoted?.videoMessage || m.message?.videoMessage || quoted?.viewOnceMessage?.message?.videoMessage;

      const watermarkText = `ZenBot - AxelDev09`;

      if (img) {
        await m.reply('*ᴄʀᴇᴀɴᴅᴏ sᴛɪᴄᴋᴇʀ sᴏʟᴏ ᴘᴀʀᴀ ʏᴏᴜᴜ. 🫡*');
        const { buffer } = await getFileBuffer({ message: { imageMessage: img } }, 'image');
        await sendImageAsSticker(conn, chatId, buffer, m, watermarkText);
      } else if (vid && vid.seconds < 11) {
        await m.reply('*ᴄʀᴇᴀɴᴅᴏ sᴛɪᴄᴋᴇʀ sᴏʟᴏ ᴘᴀʀᴀ ʏᴏᴜᴜ. 🫡*');
        const { buffer } = await getFileBuffer({ message: { videoMessage: vid } }, 'video');
        await sendVideoAsSticker(conn, chatId, buffer, m, watermarkText);
      } else {
        return m.tutorial(`*[ ❗ ] ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴏ ᴠɪ́ᴅᴇᴏ ᴘᴀʀᴀ ᴄᴏɴᴠᴇʀᴛɪʀʟᴏ ᴀ sᴛɪᴄᴋᴇʀ.* (ᴇᴊ: *${prefix + command}* _Imagen/video 8s_`);
      }
    } catch (err) {
      console.error('Error:', err);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};