import { stickerSearch } from '../lib/scraping/scraper.js';
import { stickerBufferFromUrl } from '../lib/sticker.js';

export default {
  command: ['stickersearch', 'buscarstickers', 'stickers', 'stickerpack'],
  help: ['𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂𝙴𝙰𝚁𝙲𝙷 <𝚗𝚘𝚖𝚋𝚛𝚎>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],

  run: async (m, { text }) => {
    if (!text) return m.reply('✳️ *Pasame un nombre para buscar stickers, dale.*');

    await m.reply('🔍 *Buscando pack de stickers copado...*');

    try {
      const res = await stickerSearch(text);
      if (!res.status) return m.reply('❌ *No encontré ningún pack con ese nombre.*');

      let txt = `🎉 *Sticker Pack Encontrado* 🎉\n`;
      txt += `• 📛 *Nombre:* ${res.nome}\n`;
      txt += `• 👤 *Creador:* ${res.criador}\n`;
      txt += `• 📦 *Cantidad:* ${res.total} stickers\n\n`;
      txt += `🚀 *Te mando algunos stickers para que veas...*`;

      await m.reply(txt);

      for (let i = 0; i < Math.min(10, res.fotos.length); i++) {
        try {
          const sticker = await stickerBufferFromUrl(res.fotos[i], res.nome, res.criador);
          await m.sendSticker(sticker);
          await new Promise(resolve => setTimeout(resolve, 1200));
        } catch (e) {
          console.error(`Error al enviar sticker #${i + 1}:`, e);
        }
      }
    } catch (error) {
      console.error(error);
      m.reply('⚠️ *Hubo un problema buscando los stickers.*');
    }
  }
};