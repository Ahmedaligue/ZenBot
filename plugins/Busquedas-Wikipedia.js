import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['wiki', 'wikipedia'],
  help: ['𝚆𝙸𝙺𝙸𝙿𝙴𝙳𝙸𝙰 <𝚝𝚎𝚇𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) return m.reply(`🔎 *Uso:* ${prefix + command} término_de_búsqueda`);

    const getWiki = async (lang) => {
      const url = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(text)}`;
      try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const title = $('h1').text().trim();
        const paragraphs = [];
        $('p').each((i, el) => {
          const paragraphText = $(el).text().trim();
          if (paragraphText && paragraphText.length > 50) {
            paragraphs.push(paragraphText);
          }
          if (paragraphs.length >= 10) return false;
        });

        let imageUrl = $('table.infobox img').first().attr('src');
        if (imageUrl) {
          imageUrl = `https:${imageUrl}`;
        }

        return { found: true, title, paragraphs, imageUrl };
      } catch (error) {
        console.error('Error al obtener la información de Wikipedia:', error);
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

    const textChunks = result.paragraphs.map(p => `• ${p}`).join('\n\n');
    let messageContent = `*${result.title}*\n\n${textChunks}`;

    if (result.imageUrl) {
      await conn.sendMessage(chatId, {
        image: { url: result.imageUrl },
        caption: messageContent,
      }, { quoted: m });
    } else {
      await conn.sendMessage(chatId, {
        text: messageContent,
      }, { quoted: m });
    }
  }
};