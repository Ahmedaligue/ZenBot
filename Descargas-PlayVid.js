import { spawn, exec } from 'child_process';
import axios from 'axios';

const cleanName = name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 150);

const bajarVideo = url => new Promise((resolve, reject) => {
  const yt = spawn("yt-dlp", [
    "-f", "best[height=360]",
    "--newline",
    "-o", "-",
    url
  ]);

  const pedazos = [];

  yt.stdout.on("data", pedazo => pedazos.push(pedazo));
  yt.stderr.on("data", data => {
    const salida = data.toString().trim();
    if (salida) console.log(salida);
  });

  yt.on("close", code => {
    if (code !== 0) return reject(new Error("yt-dlp pinchó"));
    resolve(Buffer.concat(pedazos));
  });

  yt.on("error", err => reject(err));
});

export default {
  command: ['playvid', 'ytvid', 'play2', 'ytmp4'],
  help: ['*Ⓟʟᴀʏᴠɪᴅ <ᴛᴇxᴛᴏ/ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text) return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴏ ᴛᴇxᴛᴏ ᴅᴇ ʏᴛ ᴘᴀʀᴀ ᴅᴇsᴄᴀʀɢᴀʀ ᴛᴜ ᴠɪ́ᴅᴇᴏ.* (ᴇᴊ: *${prefix + command}* _Link o texto_)`);

    const busqueda = text.startsWith('http') ? text : `ytsearch:${text}`;
    m.reply(`*[ 🔍 ] ʙᴜsᴄᴀɴᴅᴏ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ*`);

    exec(`yt-dlp --dump-json "${busqueda}"`, async (err, out) => {
      if (err) {
        return m.reply('*[ 🔄 ] ɴᴏ sᴇ ᴘᴜᴅᴏ ᴏʙᴛᴇɴᴇʀ ʟᴀ ɪɴғᴏ ᴅᴇʟ ᴠɪᴅᴇᴏ.*');
      }

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
        if (!text.startsWith('http') && info.entries?.length) info = info.entries[0];
      } catch (e) {
        return m.reply('*[ ⚠️ ] ᴇʀʀᴏʀ ʟᴇʏᴇɴᴅᴏ ʟᴀ ɪɴғᴏ.*');
      }

      const { title, duration_string, view_count, webpage_url, thumbnail, formats } = info;
      const calidad = formats?.filter(f => f.ext === 'mp4' && f.height)
        .map(f => f.height)
        .sort((a, b) => b - a)
        .find(h => h <= 360) || '¿?';

      let thumbBuffer;
      try {
        const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
        thumbBuffer = Buffer.from(res.data);
      } catch {}

      try {
        m.reply(`*[ ✅ ] ᴠɪᴅᴇᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ*\n*ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ʏ ᴇɴᴠɪᴀɴᴅᴏ...*`);

        const videoBuffer = await bajarVideo(webpage_url);
        const fileName = cleanName(title) + '.mp4';

        await conn.sendMessage(chatId, {
          document: videoBuffer,
          mimetype: 'video/mp4',
          fileName,
          caption: `🎥 *${title}*\n⏳ ᴅᴜʀᴀᴄɪᴏ́ɴ: ${duration_string}\n📏 ᴄᴀʟɪᴅᴀᴅ: ${calidad}p\n👀 ᴠɪsᴛᴀs: ${view_count?.toLocaleString?.() || 'N/A'}\n🔗 ʟɪɴᴋ: ${webpage_url}`,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title,
              body: 'ᴢᴇɴʙᴏᴛ - ᴅᴇsᴄᴀʀɢᴀs 📥',
              mediaType: 1,
              thumbnail: thumbBuffer || null,
              sourceUrl: webpage_url
            }
          }
        }, { quoted: m });

      } catch (e) {
        console.error('Error:', e);
        m.reply('*[ ❌ ] ᴏᴄᴜʀʀɪᴏ́ ᴜɴ ᴇʀʀᴏʀ ᴀʟ ᴇɴᴠɪᴀʀ ᴇʟ ᴠɪᴅᴇᴏ.*');
      }
    });
  }
};