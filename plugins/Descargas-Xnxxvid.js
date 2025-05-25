import { spawn } from 'child_process';

const descargarXVideos = url => new Promise((resolve, reject) => {
  const yt = spawn("yt-dlp", [
    "-f", "bv*+ba/b",
    "--merge-output-format", "mp4",
    "-o", "-",
    url
  ]);

  const chunks = [];
  yt.stdout.on("data", chunk => chunks.push(chunk));

  yt.stderr.on("data", data => {
    process.stdout.write(data.toString());
  });

  yt.on("close", code => {
    if (code !== 0) return reject(new Error("yt-dlp falló"));
    resolve(Buffer.concat(chunks));
  });

  yt.on("error", err => reject(err));
});

export default {
  command: ['xnxxdl', 'xnxx', 'xnxxvid'],
  help: ['*Ⓧɴxxᴅʟ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('xvideos.com')) {
      return m.reply('*[ ❗ ] ᴘᴀssᴀ ᴜɴ ʟɪɴᴋ ᴅᴇ xɴxx ᴠᴀ́ʟɪᴅᴏ*');
    }

    const user = m.sender || m.key?.participant || m.participant;
    if (!user) return m.reply('*[ ❗ ] ɴᴏ sᴇ ᴘᴜᴅᴏ ɪᴅᴇɴᴛɪғɪᴄᴀʀ ᴀʟ ᴜsᴜᴀʀɪᴏ.*');

    await m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴠɪᴅᴇᴏ, ᴛᴇ ʟᴏ ᴍᴀɴᴅᴏ ᴘᴏʀ ᴘʀɪᴠᴀᴅᴏ...*');

    try {
      const buffer = await descargarXVideos(text);

      await conn.sendMessage(chatId, {
        text: `*[ 🥵 ] ᴛᴇ ᴍᴀɴᴅᴇ́ ᴜɴ ᴠɪᴅᴇᴏ ᴅᴇ xɴxx ᴀ ᴛᴜ ᴅᴍ... @${user.split('@')[0]}*`,
        mentions: [user]
      }, { quoted: m });

      await conn.sendMessage(user, {
        document: buffer,
        fileName: 'video.mp4',
        mimetype: 'video/mp4',
        caption: '*[ ✅ ] ᴀᴄᴀ́ ᴛᴇ ᴅᴇᴊᴏ ᴛᴜ ᴠɪᴅᴇᴏ ᴅᴇ xɴxx*'
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('*[ ❌ ] ɴᴏ sᴇ ᴘᴜᴅᴏ ᴅᴇsᴄᴀʀɢᴀʀ ᴇʟ ᴠɪᴅᴇᴏ.*');
    }
  }
};