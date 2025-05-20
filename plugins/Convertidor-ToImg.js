import { toImg } from '../lib/sticker.js';
import { getFileBuffer } from '../lib/myfunc.js';

export default {
  help: ['𝚃𝙾𝙸𝙼𝙶 (𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛 𝚊 𝚜𝚝𝚒𝚌𝚔𝚎𝚛)'],
  tags: ['⚙️ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗗𝗢𝗥'],
  command: ['toimg', 'sticker2img', 'stickertoimg'],

  run: async (m, { conn, command, prefix, chatId }) => {
    try {
      const quoted = m.quoted?.message || m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const isSticker = quoted?.stickerMessage;

      if (!isSticker) {
        return m.reply(`⚠️ *Usá bien el comando:* Respondé a un sticker con *${prefix}${command}* para convertirlo en imagen.`);
      }

      const buffer = await getFileBuffer(quoted.stickerMessage, 'sticker');

      await m.reply('⏳ *Convirtiendo sticker a imagen...*');

      const imgBuffer = await toImg(buffer);

      await conn.sendMessage(chatId, { image: imgBuffer }, { quoted: m });

    } catch (err) {
      console.error('[❌ ERROR toImg]:', err);
      m.reply('❌ *Error:* No se pudo convertir el sticker a imagen. Asegurate de que sea un sticker válido.');
    }
  }
};