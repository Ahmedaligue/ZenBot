import { pinterestSearch } from '../lib/scraping/Zen-Pinterestimg.js';

export default {
  command: ['pinterestimg2', 'pinimg2'],
  help: ['*Ⓟɪɴɪᴍɢ2 <ᴛᴇxᴛᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],
  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text) return m.tutorial(`*[ 🔍 ] ᴇsᴄʀɪʙᴇ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀ́ɢᴇɴ ϙᴜᴇ ϙᴜɪᴇʀᴀs ʙᴜsᴄᴀʀ.* (ᴇᴊ: *${prefix + command}* _Termino de búsqueda_)`);

    const res = await pinterestSearch(text);
    if (!res.length) return m.reply('*[ ❌ ] ʟᴏ sɪᴇɴᴛᴏ, ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜ́ɴ ʀᴇsᴜʟᴛᴀᴅᴏ*');

    const img = res[Math.floor(Math.random() * res.length)];

    await conn.sendMessage(
      chatId,
      {
        image: { url: img },
        caption: '*ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ғᴏᴛɪᴄᴏ. 😉*'
      },
      { quoted: m }
    );
  }
};