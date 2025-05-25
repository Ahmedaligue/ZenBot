import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['xnxxsearch', 'xxxsearch', 'buscarxnxx'],
  help: ['*🅇ɴxxsᴇᴀʀᴄʜ <ᴛᴇʀᴍɪɴᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, conn }) => {
    if (!text) return m.reply('*[ ❗ ] ᴇsᴄʀɪʙɪ́ ᴜɴᴀ ᴘᴀʟᴀʙʀᴀ ᴄʟᴀᴠᴇ ᴘᴀʀᴀ ʙᴜsᴄᴀʀ.*');

    const searchUrl = `https://www.xvideos.com/?k=${encodeURIComponent(text)}`;

    try {
      const res = await axios.get(searchUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const $ = cheerio.load(res.data);
      const results = [];

      $('div.mozaique > div').each((i, el) => {
        if (results.length >= 12) return;

        const title = $(el).find('p.title a').text().trim();
        const href = $(el).find('p.title a').attr('href');
        const duration = $(el).find('span.duration').first().text().trim();
        const thumb = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');

        if (title && href && duration) {
          results.push({
            title,
            duration,
            link: `https://www.xvideos.com${href}`,
            thumb
          });
        }
      });

      if (results.length === 0) return m.reply('*[ ❌ ] ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀʀᴏɴ ʀᴇsᴜʟᴛᴀᴅᴏs.*');

      let message = '';
      results.forEach((r, i) => {
        message += `*${i + 1}.* ${r.title}\n*⏱️ ᴅᴜʀᴀᴄɪᴏ́ɴ:* ${r.duration}\n${r.link}\n\n`;
      });

      const firstThumb = results[0].thumb;
      if (firstThumb?.startsWith('http')) {
        await conn.sendMessage(m.chat, {
          image: { url: firstThumb },
          caption: message.trim()
        }, { quoted: m });
      } else {
        await m.reply(message.trim());
      }

    } catch (err) {
      console.error('Error', err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};