import { pinterestSearch } from '../lib/scraping/Zen-Pinterestimg.js';

export default {
  command: ['pinimg2'],
  help: ['𝙿𝙸𝙽𝙸𝙼𝙶2 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('✳️ *Che, decime qué querés buscar en Pinterest.*');

    const res = await pinterestSearch(text);
    if (!res.length) return m.reply('❌ *No encontré imágenes copadas con eso.*');

    const img = res[Math.floor(Math.random() * res.length)];

    await conn.sendMessage(
      chatId,
      {
        image: { url: img },
        caption: `✅ *Pinterest dice presente con esta para:* "${text}"`
      },
      { quoted: m }
    );
  }
};