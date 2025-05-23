import { stickerSearch } from '../lib/scraping/scraper.js';
import { stickerBufferFromUrl } from '../lib/sticker.js';

export default {
  command: ['stickersearch', 'buscarstickers', 'stickers', 'stickerpack'],
  help: ['*Ⓢᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ <ɴᴏᴍʙʀᴇ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, prefix, command }) => {
    if (!text) return m.tutorial(`*[ ❗ ] ᴇsᴄʀɪʙᴇ ᴀʟɢᴜ́ɴ ɴᴏᴍʙʀᴇ ᴅᴇ  ᴀʟɢᴜ́ɴ ᴘᴀᴄᴋ ᴅᴇ sᴛɪᴄᴋᴇʀ.* (ᴇᴊ: *${prefix + command}* _Termino de búsqueda_)`);

    await m.reply('*[ ⏳ ] ʙᴜsᴄᴀɴᴅᴏ ᴜɴ ᴘᴀᴄᴋ ᴅᴇ sᴛɪᴄᴋᴇʀs*\n*ᴀɢᴜᴀʀᴅᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

    try {
      const res = await stickerSearch(text);
      if (!res.status) return m.reply('*[ ⚠️ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜ́ɴ ᴘᴀᴄᴋ ᴄᴏɴ ᴇsᴇ ɴᴏᴍʙʀᴇ.*');

      let txt = `🎉 *𝐒𝐓𝐈𝐂𝐊𝐄𝐑 𝐏𝐀𝐂𝐊 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎* 🎉\n`;
      txt += `• 📛 *ɴᴏᴍʙʀᴇ:* ${res.nombre}\n`;
      txt += `• 👤 *ᴄʀᴇᴀᴅᴏʀ:* ${res.creador}\n`;
      txt += `• 📦 *ᴄᴀɴᴛɪᴅᴀᴅ:* ${res.total} stickers\n\n`;
      txt += `🚀 *ᴛᴇ ᴍᴀɴᴅᴏ ᴀʟɢᴜɴᴏs sᴛɪᴄᴋᴇʀs ᴘᴀʀᴀ ϙᴜᴇ ᴠᴇᴀs...*`;

      await m.reply(txt);

      for (let i = 0; i < Math.min(12, res.fotos.length); i++) {
        try {
          const sticker = await stickerBufferFromUrl(res.fotos[i], res.nombre, res.creador);
          await m.sendSticker(sticker);
          await new Promise(resolve => setTimeout(resolve, 1200));
        } catch (e) {
          console.error(`Error: ${i + 1}:`, e);
        }
      }
    } catch (error) {
      console.error(error);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};