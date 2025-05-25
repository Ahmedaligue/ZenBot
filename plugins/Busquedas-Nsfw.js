import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['nsfw', 'xxx', 'hentai'],
  help: ['*Ⓝsғᴡ <ᴘᴀʟᴀʙʀᴀ ᴄʟᴀᴠᴇ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('*[ ❗ ] ᴇsᴄʀɪʙɪ́ ᴜɴᴀ ᴘᴀʟᴀʙʀᴀ ᴄʟᴀᴠᴇ ᴘᴀʀᴀ ʙᴜsᴄᴀʀ ᴄᴏɴᴛᴇɴɪᴅᴏ ɴsғᴡ.*');

    try {
      const res = await axios.get(`https://rule34.xxx/index.php?page=post&s=list&tags=${encodeURIComponent(text)}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const $ = cheerio.load(res.data);
      const resultados = [];

      $('span.thumb').each((_, el) => {
        const link = $(el).find('a').attr('href');
        const thumb = $(el).find('img').attr('src');
        if (link && thumb) {
          resultados.push({
            link: 'https://rule34.xxx' + link,
            thumb: thumb.startsWith('http') ? thumb : 'https:' + thumb
          });
        }
      });

      if (!resultados.length) {
        return m.reply(`*[❌] ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀʀᴏɴ ʀᴇsᴜʟᴛᴀᴅᴏs ᴘᴀʀᴀ:* _${text}_`);
      }

      const random = resultados[Math.floor(Math.random() * resultados.length)];
      const caption = `*[ 🔞 ] ʀᴇsᴜʟᴛᴀᴅᴏ ᴘᴀʀᴀ:* _${text}_\n🔗 ${random.link}`;

      await conn.sendMessage(chatId, {
        image: { url: random.thumb },
        caption
      });

    } catch (e) {
      console.error('Error', e);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};