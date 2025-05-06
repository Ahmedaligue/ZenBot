import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['img', 'imagen', 'imágen'],
  help: ['𝙸𝙼𝙰𝙶𝙴𝙽 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  
  run: async (m, { text, conn, prefix, command }) => {
    if (!text) return m.reply(`📷 *Uso:* ${prefix + command} gato kawaii`);

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
          if (metadata && metadata.murl) {
            images.push(metadata.murl);
          }
        } catch {}
      });

      if (!images.length) return m.reply('❌ No se encontraron imágenes.');

      const randomImage = images[Math.floor(Math.random() * images.length)];

      await conn.sendMessage(m.chat, {
        image: { url: randomImage },
        caption: `🔍 Resultado para: *${text}*`,
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('❌ Error al buscar la imagen.');
    }
  }
};