import fg from '../lib/scraping/Zen-Googleimg.js';

export default {
  command: ['img', 'imagen', 'imágen'],
  help: ['𝙸𝙼𝙰𝙶𝙴𝙽 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { conn, text }) => {
    if (!text) return m.reply('Escribí algo para buscar imágenes.');
    let res = await fg.googleImage(text);
    if (!res.length) return m.reply('No encontré ninguna imagen.');

    const img = res[Math.floor(Math.random() * res.length)];
    await conn.sendMessage(m.chat, { image: { url: img }, caption: `Resultado para: ${text}` });
  }
};