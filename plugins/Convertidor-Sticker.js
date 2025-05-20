import { getFileBuffer } from '../lib/myfunc.js';
import { sendImageAsSticker, sendVideoAsSticker } from '../lib/sticker.js';

export default {
  help: ['𝚂𝚃𝙸𝙲𝙺𝙴𝚁 (𝚒𝚖𝚊𝚐𝚎𝚗 / 𝚟𝚒𝚍𝚎𝚘))'],
  tags: ['⚙️ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗗𝗢𝗥'],
  command: ['sticker', 'stik', 's', 'st'],

  run: async (m, { conn, command, prefix, pushName, chatId }) => {
    try {
      const quoted = m.quoted?.msg || m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const img = quoted?.imageMessage || m.message?.imageMessage || quoted?.viewOnceMessage?.message?.imageMessage;
      const vid = quoted?.videoMessage || m.message?.videoMessage || quoted?.viewOnceMessage?.message?.videoMessage;

      const watermarkText = `ZenBot - AxelDev09`;
      const packname = '✨ Stickers by ZenBot ✨';
      const author = '👨‍💻 Creado por AxelDev09';

      if (img) {
        await m.reply('🛠️ *Generando tu sticker de imagen...* 🖼️');
        const buffer = await getFileBuffer(img, 'image');
        await sendImageAsSticker2(conn, chatId, buffer, m, watermarkText, packname, author);
      } else if (vid && vid.seconds < 11) {
        await m.reply('🛠️ *Generando tu sticker de video...* 🎬');
        const buffer = await getFileBuffer(vid, 'video');
        await sendVideoAsSticker2(conn, chatId, buffer, m, watermarkText, packname, author);
      } else {
        return m.reply(`⚠️ *¡Oops!* Envía una imagen o video de menos de 10 segundos, o respondé a uno, con el comando *${prefix}${command}* 🧩`);
      }
    } catch (err) {
      console.error('[❌ ERROR STICKER]:', err);
      return m.reply('🚨 *Error:* No se pudo generar el sticker. Asegurate de enviar un archivo válido y tener *ffmpeg* instalado. 🔧');
    }
  }
};