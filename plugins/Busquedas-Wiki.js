import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['wiki', 'wikipedia'],
  help: ['*Ⓦɪᴋɪᴘᴇᴅɪᴀ <ᴛᴇʀᴍɪɴᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],
  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) return m.tutorial(`*[ ❗ ] ᴇsᴄʀɪʙᴇ ᴀʟɢᴏ ᴘᴀʀᴀ ʙᴜsᴄᴀʀ ᴇɴ ᴡɪᴋɪᴘᴇᴅɪᴀ.* (ᴇᴊ: *${prefix + command}* _Termino de búsqueda_`);

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
      return m.reply('[ ❌ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴᴀᴅᴀ ᴄᴏᴘᴀᴅᴏ ᴇɴ ᴡɪᴋɪᴘᴇᴅɪᴀ ɴɪ ᴇɴ ᴇsᴘᴀɴ̃ᴏʟ ɴɪ ᴇɴ ɪɴɢʟᴇ́s.*');
    }

    const textChunks = result.paragraphs.map(p => `• ${p}`).join('\n\n');
    const messageContent = `*${result.title}*\n\n${textChunks}`;

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