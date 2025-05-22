import { execSync } from 'child_process';
import fs from 'fs';

function wrapText(text, maxLen) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    if ((line + word).length > maxLen) {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line += word + ' ';
    }
  }
  if (line.length) lines.push(line.trim());
  return lines;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

export default {
  command: ['attp'],
  help: ['*Ⓐᴛᴛᴘ <ᴛᴇxᴛᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ*'],
  run: async (m, { text, conn, chatId, prefix, command }) => {
    if (!text) return m.tutorial(`*[ ❗ ] ᴇsᴄʀɪʙᴇ ᴀʟɢᴏ ᴘᴀʀᴀ ᴄᴏɴᴠᴇʀᴛɪʀʟᴏ ᴀ sᴛɪᴄᴋᴇʀ.* (ᴇᴊ: *${prefix + command}* _Texto_`);

    const dir = './media/attp';
    const outputImg = `${dir}/attp-text.png`;
    const outputWebp = `${dir}/attp-text.webp`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
      const maxCharsPerLine = 15;
      const lines = wrapText(text, maxCharsPerLine);

      let pointSize = Math.floor(512 / (lines.length * 1.5));
      if (pointSize > 64) pointSize = 64;
      if (pointSize < 24) pointSize = 24;

      const lineHeight = pointSize * 1.2;
      const imageWidth = 512;
      const imageHeight = 512;
      const paddingX = 20;

      const totalHeight = lines.length * lineHeight;
      let yStart = (imageHeight - totalHeight) / 2 + pointSize;

      const fillColor = randomColor();

      let drawTextCmd = lines.map((lineText, i) => {
        const textWidth = lineText.length * pointSize * 0.6;
        const x = Math.max(paddingX, (imageWidth - textWidth) / 2);
        const y = yStart + i * lineHeight;
        return `text ${x},${y} '${lineText.replace(/'/g, "\\'")}'`;
      }).join(' ');

      const cmd = `magick -size ${imageWidth}x${imageHeight} xc:none -font DejaVu-Sans -pointsize ${pointSize} -fill "${fillColor}" -stroke black -strokewidth 2 -draw "${drawTextCmd}" ${outputImg}`;

      execSync(cmd);

      execSync(`ffmpeg -i ${outputImg} -vcodec libwebp -lossless 1 -qscale 100 -preset default -loop 0 -an -vsync 0 -s ${imageWidth}x${imageHeight} ${outputWebp}`);

      const buffer = fs.readFileSync(outputWebp);
      await conn.sendMessage(chatId, { sticker: buffer }, { quoted: m });

      fs.unlinkSync(outputImg);
      fs.unlinkSync(outputWebp);
    } catch (err) {
      console.error(err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};