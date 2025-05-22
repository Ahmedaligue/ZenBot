import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export default {
  command: ['pinterest', 'pindl', 'pin', 'pinvid'],
  help: ['*Ⓟɪɴᴠɪᴅ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('pinterest.com')) {
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴠᴀ́ʟɪᴅᴏ ᴅᴇ ᴘɪɴᴛᴇʀᴇsᴛ.* (ᴇᴊ: *${prefix + command}* _https://pinterest.com/_)`);
    }

    const folder = path.join(process.cwd(), 'lib', 'pinterest');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    await m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴛᴜ ᴠɪ́ᴅᴇᴏ ᴅᴇ ᴘɪɴᴛᴇʀᴇsᴛ, ᴅᴀᴍᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

    const cmd = `yt-dlp -f best --merge-output-format mp4 -o "${folder}/pin_%(id)s.%(ext)s" "${text}"`;

    exec(cmd, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', stderr || error);
        return m.reply(`*[ ⚠️ ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴀʟ ᴅᴇsᴄᴀʀɢᴀʀ ᴇʟ ᴀʀᴄʜɪᴠᴏ, ᴠᴇʀɪғɪᴄᴀ ϙᴜᴇ ᴇʟ ᴀʀᴄʜɪᴠᴏ sᴇᴀ ᴠᴀʟɪᴅᴏ ᴏ ɪɴᴛᴇɴᴛᴀ ᴍᴀ́s ᴛᴀʀᴅᴇ.*`);
      }

      const files = fs.readdirSync(folder).filter(f => f.includes('pin_'));
      if (!files.length) return m.reply('*[ ❌ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜ́ɴ ᴠɪᴅᴇᴏ ᴘᴀʀᴀ ᴍᴀɴᴅᴀʀ.*');

      for (const file of files) {
        const filePath = path.join(folder, file);
        try {
          await conn.sendMessage(chatId, {
            video: fs.readFileSync(filePath),
            mimetype: 'video/mp4',
            caption: '*[ ✅ ] ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ᴠɪ́ᴅᴇᴏ.*'
          }, { quoted: m });
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error:', err);
          m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
        }
      }
    });
  }
};