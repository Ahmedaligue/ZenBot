import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['wiki', 'wikipedia'],
    help: ['𝚆𝙸𝙺𝙸𝙿𝙴𝙳𝙸𝙰 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { text, conn, prefix, command }) => {
    if (!text) return m.reply(`🔎 *Uso:* ${prefix + command} término_de_búsqueda`);

    const getWiki = async (lang) => {
      const url = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(text)}`;
      try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const title = $('h1').text().trim();
        const paragraphs = [];
        $('p').each((i, el) => {
          const text = $(el).text().trim();
          if (text && text.length > 50) {
            paragraphs.push(text);
          }
          if (paragraphs.length >= 10) return false;
        });
        let imageUrl = $('table.infobox img').first().attr('src');
        if (imageUrl) imageUrl = `https:${imageUrl}`;
        return { found: true, title, paragraphs, imageUrl };
      } catch {
        return { found: false };
      }
    };

    let result = await getWiki('es');
    if (!result.found) {
      result = await getWiki('en');
    }
    if (!result.found) {
      return m.reply('❌ No se encontró información sobre eso ni en español ni en inglés.');
    }
    if (result.imageUrl) {
      await conn.sendMessage(m.chat, {
        image: { url: result.imageUrl },
        caption: result.title,
      }, { quoted: m });
    }
    const textChunks = result.paragraphs.map(p => `• ${p}`).join('\n\n');
    await conn.sendMessage(m.chat, {
      text: `*${result.title}*\n\n${textChunks}`,
    }, { quoted: m });
  }
};