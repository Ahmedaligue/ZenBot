import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { tmpdir } from 'os';
import { exec } from 'child_process';

export default {
  command: ['emojimix2'],
  help: ['*Ⓔᴍᴏᴊɪᴍɪx2 <ᴇᴍᴏᴊɪ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { conn, text, prefix, command, chatId }) => {
    try {
      if (!text) return m.reply(`*[ 🔎 ] ¿ϙᴜᴇ́ ᴇᴍᴏᴊɪ ᴅᴇsᴇᴀs ᴄᴏᴍʙɪɴᴀʀ?* (ᴇᴊ: *${prefix + command}* 😎)`);

      const url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!json.results || json.results.length === 0) {
        return m.reply('*[ ❌ ] ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴏ́ ʀᴇsᴜʟᴛᴀᴅᴏ ᴘᴀʀᴀ ᴇsᴇ ᴇᴍᴏᴊɪ.*');
      }

      for (const result of json.results) {
        const imgBuffer = await (await fetch(result.url)).buffer();

        const pngPath = path.join(tmpdir(), `emoji-${Date.now()}.png`);
        const webpPath = pngPath.replace('.png', '.webp');

        fs.writeFileSync(pngPath, imgBuffer);
        
        await new Promise((resolve, reject) => {
          exec(`cwebp -q 80 "${pngPath}" -o "${webpPath}"`, (err, stdout, stderr) => {
            if (err) return reject(stderr);
            resolve(stdout);
          });
        });

        await conn.sendMessage(chatId, {
          sticker: { url: webpPath }
        }, { quoted: m });

        fs.unlinkSync(pngPath);
        fs.unlinkSync(webpPath);
      }

    } catch (e) {
      console.error(e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};