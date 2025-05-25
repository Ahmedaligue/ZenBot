import { spawn } from 'child_process';

const descargarVideo = url => new Promise((resolve, reject) => {
  const yt = spawn("yt-dlp", [
    "-f", "bv*+ba/b",
    "--merge-output-format", "mp4",
    "-o", "-",
    url
  ]);

  const chunks = [];
  yt.stdout.on("data", chunk => chunks.push(chunk));
  yt.stderr.on("data", err => process.stdout.write(err.toString()));

  yt.on("close", code => {
    if (code !== 0) return reject(new Error("yt-dlp falló"));
    resolve(Buffer.concat(chunks));
  });

  yt.on("error", err => reject(err));
});

export default {
  command: ['ytdlp', 'ytvideo', 'descargar', 'yt-dlp'],
  help: ['*Ⓨᴛᴅʟᴘ <ᴄᴜᴀʟϙᴜɪᴇʀ ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { text, conn }) => {
    if (!text || !text.startsWith('http')) {
      return m.reply('*[ ❗ ] ᴍᴀ́ɴᴅᴀᴍᴇ ᴄᴜᴀʟϙᴜɪᴇʀ ʟɪɴᴋ ᴠᴀ́ʟɪᴅᴏ ᴘᴀʀᴀ ᴅᴇsᴄᴀʀɢᴀʀ.*');
    }

    m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴠɪᴅᴇᴏ...*');

    try {
      const buffer = await descargarVideo(text);

      await conn.sendMessage(m.chat, {
        document: buffer,
        fileName: 'video.mp4',
        mimetype: 'video/mp4',
        caption: '*[ ✅ ] ᴀᴄᴀ́ ᴛᴇɴᴇ́s ᴛᴜ ᴠɪᴅᴇᴏ ᴅᴇsᴄᴀʀɢᴀᴅᴏ ᴄᴏɴ ʏᴛ-ᴅʟᴘ.*'
      }, { quoted: m });

    } catch (e) {
      console.error('Error', e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};