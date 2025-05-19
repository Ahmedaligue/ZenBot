import { pinterest } from '../lib/scraping/scraper.js';
import axios from 'axios';

export default {
  command: ['pinterest2', 'pin2', 'pinterestimg', 'pinimg'],
  help: ['𝙿𝙸𝙽𝙸𝙼𝙶 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],

  run: async (m, { text, conn, chatId }) => {
    if (!text) return m.reply('✳️ *Escribí algo para buscar en Pinterest.*');

    await m.reply('🔍 *Buscando en Pinterest...*');

    try {
      const results = await pinterest(text);
      if (!results.length) return m.reply('❌ *No se encontraron resultados.*');

      const url = results[Math.floor(Math.random() * results.length)];
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = response.data;

      await conn.sendMessage(chatId, {
        image: buffer,
        caption: `🖼️ *Resultado de Pinterest:*\n${text}`
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply('⚠️ *Ocurrió un error al buscar o enviar la imagen.*');
    }
  }
};