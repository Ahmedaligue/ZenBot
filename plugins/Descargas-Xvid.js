import { spawn } from 'child_process';
import axios from 'axios';

export default {
  command: ['xvid', 'twittervid', 'twvid', 'x', 'twitter'],
  help: ['*Ⓧᴠɪᴅᴇᴏ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || (!text.includes('x.com') && !text.includes('twitter.com')))
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴠᴀ́ʟɪᴅᴏ ᴅᴇ x (ᴛᴡɪᴛᴛᴇʀ)* (ᴇᴊ: *${prefix + command}* _https://x.com/_`);

    m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴠɪᴅᴇᴏ ᴅᴇ x, ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

    const ytdlp = spawn('yt-dlp', [
      '-f', 'best[height<=480]',
      '-o', '-',
      text.trim()
    ]);

    let videoBuffer = Buffer.alloc(0);

    ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
    ytdlp.stderr.on('data', chunk => console.log(`📥 yt-dlp: ${chunk.toString().trim()}`));

    ytdlp.on('close', async code => {
      if (code !== 0 || !videoBuffer.length)
        return m.reply('*[ ❌ ] ɴᴏ ᴘᴜᴅᴇ ʙᴀᴊᴀʀᴛᴇ ᴇʟ ᴠɪᴅᴇᴏ, ғɪᴊᴀᴛᴇ ᴇʟ ʟɪɴᴋ ʏ ᴘʀᴏʙᴀ́ ᴅᴇ ɴᴜᴇᴠᴏ.*');

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: 'x_video.mp4',
          caption: '*[ ✅ ] ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ᴠɪ́ᴅᴇᴏ.*',
        }, { quoted: m });

      } catch (err) {
        console.error('Error:', err);
        m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
      }
    });
  }
};