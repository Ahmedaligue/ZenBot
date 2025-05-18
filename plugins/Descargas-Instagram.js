import { instagramGetUrl } from "instagram-url-direct";

export default {
  command: ['ig', 'instagram', 'igpost', 'instagrampost', 'igvid'],
  help: ['𝙸𝙶 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes("instagram.com")) {
      return m.reply(`✳️ *Pasá un enlace válido de Instagram.\n\nEjemplo:\n*${m.prefix + m.command} https://www.instagram.com/reel/xxxx/*`);
    }

    try {
      const res = await instagramGetUrl(text);

      if (!res || !res.url_list || res.url_list.length === 0) {
        return m.reply("❌ No se encontró ningún contenido para descargar.");
      }

      for (const url of res.url_list) {
        const tipo = res.type === "video" ? "video" : "image";
        await conn.sendMessage(chatId, {
          [tipo]: { url }
        }, { quoted: m });
      }

    } catch (e) {
      console.error("❌ Error en comando Instagram:", e);
      m.reply("⚠️ Ocurrió un error al descargar desde Instagram.");
    }
  }
};