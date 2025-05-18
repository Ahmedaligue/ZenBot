import { instagramGetUrl } from "instagram-url-direct";

export default {
  command: ['ig', 'instagram', 'igpost', 'instagrampost', 'igvid', 'instagramvid'],
  help: ['𝙸𝙶 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes("instagram.com")) {
      return m.reply(`✳️ *Pasá un enlace válido de Instagram.*`);
    }

    try {
      await m.reply('⏳ *Descargando tu post, esperá un momento...*');

      const res = await instagramGetUrl(text);

      if (!res?.url_list?.length) {
        return m.reply("❌ No se encontró ningún contenido para descargar.");
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
          caption: i === urlsLimpias.length - 1 ? '✅ Aquí tienes tu post.' : undefined
        }, { quoted: m });
      }

    } catch (e) {
      console.error("❌ Error en comando Instagram:", e);
      m.reply("⚠️ Ocurrió un error al descargar desde Instagram.");
    }
  }
};