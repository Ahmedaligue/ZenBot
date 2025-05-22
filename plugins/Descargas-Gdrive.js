import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export default {
  command: ['gdrive', 'drive'],
  help: ['*Ⓖᴅʀɪᴠᴇ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { text, conn, chatId, prefix, command }) => {
    if (!text) 
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴠᴀ́ʟɪᴅᴏ ᴅᴇ ɢᴏᴏɢʟᴇ ᴅʀɪᴠᴇ.* (ᴇᴊ: *${prefix + command}* _https://gdrive.com/ ʏ ᴇxᴛᴇɴsɪᴏ́ɴ_)`);

    const [url, ext] = text.split(' ');
    if (!url || !ext) 
      return m.reply('*[ ❗ ] ᴛᴇɴᴇ́s ϙᴜᴇ ᴘᴏɴᴇʀ ᴇʟ ʟɪɴᴋ ʏ ʟᴀ ᴇxᴛᴇɴsɪᴏ́ɴ (ᴇᴊ: ᴍᴘ4, ᴍᴘ3, ᴀᴘᴋ, ᴇᴛᴄ).*');

    const outputDir = './lib/gdrive';
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const fileName = `gdrive_${Date.now()}.${ext}`;
    const filePath = path.join(outputDir, fileName);

    await m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀᴅᴏ ᴛᴜ ᴀʀᴄʜɪᴠᴏ, ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

    const gdown = spawn('gdown', ['--fuzzy', '-O', filePath, url]);

    gdown.stderr.on('data', (data) => {
      console.error(`Error: ${data.toString().trim()}`);
    });

    gdown.on('close', async (code) => {
      if (code !== 0) return m.reply('*[ ❗ ] ᴜᴘs, ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴅᴇsᴄᴀʀɢᴀᴅᴏ ᴇʟ ᴀʀᴄʜɪᴠᴏ.*');

      if (!fs.existsSync(filePath)) 
        return m.reply('*[ 🔍 ] ɴᴏ ᴘᴜᴅᴇ ᴇɴᴄᴏɴᴛʀᴀʀ ᴇʟ ᴀʀᴄʜɪᴠᴏ ϙᴜᴇ ᴅᴇsᴄᴀʀɢᴜᴇ́.*');

      const stat = fs.statSync(filePath);
      if (stat.size === 0) {
        fs.unlinkSync(filePath);
        return m.reply('*[ ⚠️ ] ᴇʟ ᴀʀᴄʜɪᴠᴏ ϙᴜᴇ ʙᴀᴊᴇ́ ᴇsᴛᴀ́ ᴠᴀᴄɪ́ᴏ. ᴘʀᴏʙᴀ́ ᴄᴏɴ ᴏᴛʀᴏ ʟɪɴᴋ.*');
      }

      await conn.sendMessage(chatId, {
        document: { url: filePath },
        fileName,
        mimetype: ext === 'mp3' ? 'audio/mpeg' 
                : ext === 'mp4' ? 'video/mp4' 
                : ext === 'zip' ? 'application/zip' 
                : 'application/octet-stream',
      }, { quoted: m });

      fs.unlinkSync(filePath);
    });
  }
};