import { stickerSearch } from '../lib/scraping/scraper.js';
import { stickerBuffer } from '../lib/sticker.js';

export default {
  command: ['stickersearch', 'buscarstickers', 'stickers', 'stickerpack'],
  help: ['𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂𝙴𝙰𝚁𝙲𝙷 <𝚗𝚘𝚖𝚋𝚛𝚎>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],

  run: async (m, { text }) => {
    if (!text) return m.reply('✳️ *Pasá un nombre para buscar stickers.*');

    await m.reply('🔍 *Buscando sticker pack...*');

    try {
      const res = await stickerSearch(text);
      if (!res.status) return m.reply('❌ *No se encontraron packs con ese nombre.*');

      let txt = `*🔖 Sticker Pack Encontrado*\n`;
      txt += `• *Nombre:* ${res.nome}\n`;
      txt += `• *Creador:* ${res.criador}\n`;
      txt += `• *Cantidad:* ${res.total} stickers\n\n`;
      txt += `*Enviando algunos stickers...*`;

      await m.reply(txt);

      for (let i = 0; i < Math.min(10, res.fotos.length); i++) {
        try {
          const sticker = await stickerBuffer(res.fotos[i], res.nome, res.criador);
          await m.sendSticker(sticker);
          await new Promise(resolve => setTimeout(resolve, 1200));
        } catch (e) {
          console.error(`Error al enviar sticker ${i}:`, e);
        }
      }
    } catch (error) {
      console.error(error);
      m.reply('⚠️ *Ocurrió un error al buscar los stickers.*');
    }
  }
};
