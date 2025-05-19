import { pinterestSearch } from '../lib/scraping/Zen-Pinterestimg.js';

export default {
  command: ['pinterestimg2','pinimg2'],
  help: ['𝙿𝙸𝙽𝙸𝙼𝙶2 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('✳️ Escribí algo para buscar en Pinterest.');

    const res = await pinterestSearch(text);
    if (!res.length) return m.reply('❌ No se encontraron imágenes de calidad.');

    const img = res[Math.floor(Math.random() * res.length)];

    await conn.sendMessage(
      chatId,
      {
        image: { url: img },
        caption: `✅ Resultado de Pinterest para: ${text}`
      },
      { quoted: m }
    );
  }
};