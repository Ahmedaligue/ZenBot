import { instagramGetUrl } from "instagram-url-direct";

export default {
  command: ['ig', 'instagram', 'igpost', 'instagrampost', 'igvid', 'instagramvid'],
  help: ['𝙸𝙶 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes("instagram.com")) {
      return m.reply('✳️ *Pasame un link válido de Instagram, maestro.*');
    }

    try {
      await m.reply('⏳ *Bancá un toque que bajo el post...*');

      const res = await instagramGetUrl(text);

      if (!res?.url_list?.length) {
        return m.reply("❌ *No encontré nada para bajar. Fijate el link.*");
      }

      const urlsLimpias = [];
      const urlsBase = new Set();

      for (const url of res.url_list) {
        const baseUrl = url.split('?')[0];
        if (!urlsBase.has(baseUrl)) {
          urlsBase.add(baseUrl);
          urlsLimpias.push(url);
        }
      }

      for (let i = 0; i < urlsLimpias.length; i++) {
        const url = urlsLimpias[i];
        const tipo = url.includes('.mp4') ? 'video' : 'image';

        await conn.sendMessage(chatId, {
          [tipo]: { url },
          caption: i === urlsLimpias.length - 1 ? '✅ *Acá tenés tu post, papá.*' : undefined
        }, { quoted: m });
      }

    } catch (e) {
      console.error("❌ Error en comando Instagram:", e);
      m.reply("⚠️ *Algo falló al bajar desde Instagram. Probá más tarde o revisá el link.*");
    }
  }
};