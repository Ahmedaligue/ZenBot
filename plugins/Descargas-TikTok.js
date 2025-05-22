import { spawn } from 'child_process';

const bajarTikTok = url => new Promise((resolve, reject) => {
  const yt = spawn('yt-dlp', [
    '-f', 'mp4',
    '-o', '-',
    url
  ]);

  const pedazos = [];

  yt.stdout.on('data', pedazo => pedazos.push(pedazo));
  yt.stderr.on('data', data => console.log(`📥 yt-dlp: ${data.toString().trim()}`));

  yt.on('close', code => {
    if (code !== 0) {
      return reject(new Error('yt-dlp falló'));
    }
    console.log('[ ✅ ] Video de TikTok descargado correctamente.');
    resolve(Buffer.concat(pedazos));
  });

  yt.on('error', err => {
    console.log('Error:', err);
    reject(err);
  });
});

export default {
  command: ['tiktok', 'ttk', 'tt', 'tiktokdl'],
  help: ['*Ⓣɪᴋᴛᴏᴋ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text || !text.includes('tiktok.com')) {
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴠᴀ́ʟɪᴅᴏ ᴅᴇ ᴛɪᴋᴛᴏᴋ.* (ᴇᴊ: *${prefix + command}* _https://tiktok.com/_`);
    }

    try {
      await m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴛᴜ ᴠɪ́ᴅᴇᴏ, ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

      const videoBuffer = await bajarTikTok(text);

      await conn.sendMessage(chatId, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `tiktok_video_${Date.now()}.mp4`,
        caption: '*[ ✅ ] ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ᴠɪ́ᴅᴇᴏ.*'
      }, { quoted: m });

    } catch (e) {
      console.error('Error:', e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};