import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['img', 'imagen', 'imágen'],
  help: ['*Ⓘᴍᴀɢᴇɴ <ᴛᴇxᴛᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) 
      return m.tutorial(`*[ 🔍 ] ᴇsᴄʀɪʙᴇ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀ́ɢᴇɴ ϙᴜᴇ ϙᴜɪᴇʀᴀs ʙᴜsᴄᴀʀ.* (ᴇᴊ: *${prefix + command}* _Termino de búsqueda_)`);

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
        return m.reply('*[ ❌ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɪᴍᴀ́ɢᴇɴᴇs ᴘᴀʀᴀ ᴇsᴀ ʙᴜ́sϙᴜᴇᴅᴀ.*');

      const randomImage = images[Math.floor(Math.random() * images.length)];

      await conn.sendMessage(chatId, {
        image: { url: randomImage },
        caption: '*ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ғᴏᴛɪᴄᴏ. 😉*',
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};