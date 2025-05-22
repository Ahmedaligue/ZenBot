import { instagramGetUrl } from "instagram-url-direct";

export default {
  command: ['ig', 'instagram', 'igpost', 'instagrampost', 'igvid', 'instagramvid'],
  help: ['*Ⓘɴsᴛᴀɢʀᴀᴍ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text || !text.includes("instagram.com")) {
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴅᴇ ɪɴsᴛᴀɢʀᴀᴍ ᴠᴀ́ʟɪᴅᴏ.* (ᴇᴊ: *${prefix + command}* _https://instagram.com/)`);
    }

    try {
      await m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴛᴜ ᴠɪ́ᴅᴇᴏ/ᴘᴏsᴛ ᴅᴇ ɪɴsᴛᴀɢʀᴀᴍ.*');

      const res = await instagramGetUrl(text);

      if (!res?.url_list?.length) {
        return m.reply("*[ ❗ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴᴀᴅᴀ, ᴠᴇʀɪғɪᴄᴀ ᴇʟ ʟɪɴᴋ.*");
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
          caption: i === urlsLimpias.length - 1 ? '*[ ✅ ] ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ᴘᴏsᴛ/ᴠɪ́ᴅᴇᴏ.*' : undefined
        }, { quoted: m });
      }

    } catch (e) {
      console.error("Error:", e);
      m.reply("*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*");
    }
  }
};