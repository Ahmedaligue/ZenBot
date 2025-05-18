import { mediafireDl } from '../lib/scraping/scraper.js';

export default {
  command: ['mediafire', 'mf', 'mfire', 'mediafiredl'],
  help: ['𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴 <𝚕𝚒𝚗𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes("mediafire.com")) {
      return m.reply('✳️ *Pasá un enlace válido de Mediafire.*');
    }

    await m.reply('⏳ *Descargando tu archivo, esperá un momento...*');

    try {
      const data = await mediafireDl(text);
      if (!data || !data.link) {
        return m.reply('❌ No se encontró ningún archivo para descargar.');
      }

      await conn.sendMessage(chatId, {
        document: { url: data.link },
        mimetype: data.mime || 'application/octet-stream',
        fileName: data.name || 'archivo',
        caption: `✅ Aquí tienes tu archivo\nNombre: ${data.name}\nTamaño: ${data.size}`
      }, { quoted: m });

    } catch (error) {
      console.error('❌ Error en comando Mediafire:', error);
      m.reply('⚠️ Ocurrió un error al descargar desde Mediafire.');
    }
  }
};