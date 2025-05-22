import { pinterest } from '../lib/scraping/scraper.js';
import axios from 'axios';

export default {
  command: ['pinterestimg', 'pinimg'],
  help: ['*Ⓟɪɴɪᴍɢ <ᴛᴇxᴛᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, conn, chatId, prefix, command }) => {
    if (!text) return m.tutorial(`*[ 🔍 ] ᴇsᴄʀɪʙᴇ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀ́ɢᴇɴ ϙᴜᴇ ϙᴜɪᴇʀᴀs ʙᴜsᴄᴀʀ.* (ᴇᴊ: *${prefix + command}* _Termino de búsqueda_)`);

    await m.reply('*[ 🔍 ] ᴏᴋᴀʏ, ᴅᴀᴍᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ ϙᴜᴇ ᴇsᴛᴏʏ ʙᴜsᴄᴀɴᴅᴏ...*');

    try {
      const results = await pinterest(text);
      if (!results.length) return m.reply('*[ ❌ ] ʟᴏ sɪᴇɴᴛᴏ, ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜ́ɴ ʀᴇsᴜʟᴛᴀᴅᴏ*');

      const url = results[Math.floor(Math.random() * results.length)];
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = response.data;

      await conn.sendMessage(chatId, {
        image: buffer,
        caption: '*ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ғᴏᴛɪᴄᴏ. 😉*'
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};