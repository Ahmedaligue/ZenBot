import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { execSync } from 'child_process';
import fetch from 'node-fetch';

export default {
  command: ['emojimix'],
  help: ['*Ⓔᴍᴏᴊɪᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { conn, text, prefix, command, chatId }) => {
    try {
      if (!text || !text.includes('+')) return m.reply(`*[ 🔎 ] ¿ϙᴜᴇ́ ᴇᴍᴏᴊɪ ᴅᴇsᴇᴀs ᴄᴏᴍʙɪɴᴀʀ?* (ᴇᴊ: *${prefix + command}* 😎+😅)`);

      let [emoji1, emoji2] = text.split('+');
      if (!emoji1 || !emoji2) return m.reply('*[ ❗ ] ᴅᴇʙᴇs ᴘᴏɴᴇʀ ᴅᴏs ᴇᴍᴏᴊɪs sᴇᴘᴀʀᴀᴅᴏs ᴘᴏʀ "+"*');

      const toUnicode = (emoji) => {
        return [...emoji].map(c => c.codePointAt(0).toString(16)).join('-');
      };

      const unicode1 = toUnicode(emoji1);
      const unicode2 = toUnicode(emoji2);
      const url = `https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u${unicode1}/u${unicode1}_u${unicode2}.png`;

      const res = await fetch(url);
      if (!res.ok) return m.reply('*[ ❌ ] ᴇsᴀ ᴄᴏᴍʙɪɴᴀᴄɪᴏ́ɴ ᴅᴇ ᴇᴍᴏᴊɪs ɴᴏ ᴇxɪsᴛᴇ.*');

      const buffer = await res.buffer();

      const pngPath = path.join(tmpdir(), `emoji-${Date.now()}.png`);
      const webpPath = path.join(tmpdir(), `emoji-${Date.now()}.webp`);

      fs.writeFileSync(pngPath, buffer);

      try {
        execSync(`magick "${pngPath}" -resize 512x512 -quality 100 "${webpPath}"`);
      } catch (err) {
        return m.reply('*[ ⚠️ ] ᴇʀʀᴏʀ ᴀʟ ɪɴᴛᴇɴᴛᴀʀ ᴀʟ ɪɴᴛᴇɴᴛᴀʀ ᴄᴏᴍʙɪɴᴀʀ, ɪɴᴛᴇ́ɴᴛᴀʟᴏ ᴍᴀ́s ᴛᴀʀᴅᴇ*');
      }

      await conn.sendMessage(chatId, {
        sticker: { url: webpPath }
      }, { quoted: m });

      fs.unlinkSync(pngPath);
      fs.unlinkSync(webpPath);

    } catch (e) {
      console.error(e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};