import { spawn } from 'child_process';

const getFacebookVideoBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn('yt-dlp', [
      '-f', 'best',
      '-o', '-',
      url
    ]);

    const chunks = [];

    ytdlp.stdout.on('data', chunk => chunks.push(chunk));
    ytdlp.stderr.on('data', data => {
      console.log(`📥 yt-dlp: ${data.toString().trim()}`);
    });

    ytdlp.on('close', code => {
      if (code !== 0) {
        return reject(new Error('yt-dlp falló'));
      }
      console.log('[ ✅ ] Descarga finalizada, enviando video...');
      resolve(Buffer.concat(chunks));
    });

    ytdlp.on('error', err => {
      console.log('Error:', err);
      reject(err);
    });
  });
};

export default {
  command: ['fb', 'facebook', 'fbdl'],
  help: ['*Ⓕᴀᴄᴇʙᴏᴏᴋ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text || !text.includes('facebook.com')) {
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴘᴜ́ʙʟɪᴄᴏ ᴅᴇ ғᴀᴄᴇʙᴏᴏᴋ* (ᴇᴊ: *${prefix + command}* _https://facebook/_)`);
    }

    m.reply('*[ ⏳ ] ᴛᴜ ᴠɪ́ᴅᴇᴏ ᴇsᴛᴀ́ sɪᴇɴᴅᴏ ʙᴜsᴄᴀᴅᴏ ʏ ᴅᴇsᴄᴀʀɢᴀᴅᴏ, ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

    try {
      const videoBuffer = await getFacebookVideoBuffer(text);

      await conn.sendMessage(chatId, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `facebook_video_${Date.now()}.mp4`,
        caption: '*[ ✅ ] ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ᴠɪ́ᴅᴇᴏ.*'
      }, { quoted: m });

    } catch (err) {
      console.error('Error:', err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};