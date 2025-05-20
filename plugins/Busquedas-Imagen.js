import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['img', 'imagen', 'imágen'],
  help: ['𝙸𝙼𝙰𝙶𝙴𝙽 <𝚝𝚎𝚇𝚝𝚘>'],
  tags: ['🔎 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],

  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) 
      return m.reply(`🚫 *¡Oops!* Usá así: *${prefix + command}* _gato kawaii_`);

    try {
      const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(text)}&form=HDRSC2`;
      const res = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
        },
      });

      const $ = cheerio.load(res.data);
      const images = [];

      $('a.iusc').each((_, el) => {
        try {
          const metadata = JSON.parse($(el).attr('m'));
          if (metadata && metadata.murl) images.push(metadata.murl);
        } catch {}
      });

      if (!images.length) 
        return m.reply('❌ *No encontré imágenes para esa búsqueda.*');

      const randomImage = images[Math.floor(Math.random() * images.length)];

      await conn.sendMessage(chatId, {
        image: { url: randomImage },
        caption: `✨ *Resultado para:* _${text}_ ✨`,
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('⚠️ *Error inesperado* al buscar la imagen. Probá de nuevo.');
    }
  }
};