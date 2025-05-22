import { execSync } from 'child_process';
import fs from 'fs';

export default {
  command: ['quote'],
  help: ['*Ⓠᴜᴏᴛᴇ <ᴛᴇxᴛᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ*'],
  run: async (m, { text, conn, chatId, prefix, command }) => {
    if (!text) return m.tutorial(`*[ ❗ ] ᴇsᴄʀɪʙᴇ ᴀʟɢᴏ ᴘᴀʀᴀ ᴄᴏɴᴠᴇʀᴛɪʀʟᴏ ᴀ ɪᴍᴀɢᴇɴ.* (ᴇᴊ: *${prefix + command}* _Texto_`);

    const folder = 'media/quote';
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const outputImg = `${folder}/quote.png`;
    const textImg = `${folder}/text.png`;
    const sanitizedText = text.replace(/"/g, '\\"');

    try {
      execSync(
        `magick -background none -fill black -font DejaVu-Sans-Bold ` +
        `-size 500x300 -gravity center caption:"${sanitizedText}" ${textImg}`
      );

      execSync(
        `magick -size 600x400 gradient:#00aaff-#800080 -gravity center ` +
        `${textImg} -composite ${outputImg}`
      );

      const buffer = fs.readFileSync(outputImg);
      await conn.sendMessage(chatId, { image: buffer, caption: '*ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ɪᴍᴀɢᴇɴ ᴄᴏɴ ғʀᴀsᴇ. ☝️😜*' }, { quoted: m });

      fs.unlinkSync(outputImg);
      fs.unlinkSync(textImg);
    } catch (e) {
      console.error(e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};