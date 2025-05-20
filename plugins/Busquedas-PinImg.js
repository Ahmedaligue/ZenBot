import { pinterest } from '../lib/scraping/scraper.js';
import axios from 'axios';

export default {
  command: ['pinterest2', 'pin2', 'pinterestimg', 'pinimg'],
  help: ['𝙿𝙸𝙽𝙸𝙼𝙶 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],

  run: async (m, { text, conn, chatId }) => {
    if (!text) return m.reply('✳️ *Mandame algo para buscar en Pinterest, capo.*');

    await m.reply('🔎 *Buscando imágenes piolas en Pinterest...*');

    try {
      const results = await pinterest(text);
      if (!results.length) return m.reply('❌ *No encontré nada copado con eso.*');

      const url = results[Math.floor(Math.random() * results.length)];
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = response.data;

      await conn.sendMessage(chatId, {
        image: buffer,
        caption: `🖼️ *Mirá esta imagen de Pinterest para:* "${text}"`
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply('⚠️ *Algo falló buscando o enviando la imagen.*');
    }
  }
};