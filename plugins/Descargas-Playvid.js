import { spawn, exec } from 'child_process';
import axios from 'axios';

const sanitizeFileName = name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 150);

const getVideoBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn("yt-dlp", [
      "-f", "best[ext=mp4][height<=720]", // MP4 hasta 720p
      "-o", "-", // salida directa por stdout
      url
    ]);

    const chunks = [];

    ytdlp.stdout.on("data", chunk => chunks.push(chunk));
    ytdlp.stderr.on("data", data => {
      console.log(`📥 yt-dlp: ${data.toString().trim()}`);
    });

    ytdlp.on("close", code => {
      if (code !== 0) {
        console.log(`❌ yt-dlp terminó con código ${code}`);
        return reject(new Error("yt-dlp falló"));
      }
      console.log("✅ Descarga de video finalizada, enviando...");
      resolve(Buffer.concat(chunks));
    });

    ytdlp.on("error", err => {
      console.log("❌ Error al ejecutar yt-dlp:", err);
      reject(err);
    });
  });
};

export default {
  command: ['playvid', 'ytvid', 'play2', 'ytmp4'],
  help: ['𝙿𝙻𝙰𝚈𝚅𝙸𝙳 <𝚝𝚎𝚡𝚝𝚘/𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚄𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('✳️ *Poné el nombre del video o un link válido.*');

    const search = text.startsWith('http') ? text : `ytsearch:${text}`;

    m.reply(`⏳ *Buscando video: ${text}*`);

    exec(`yt-dlp --dump-json "${search}"`, async (err, out) => {
      if (err) {
        console.error('❌ Error al obtener info del video:', err);
        return m.reply('❌ *No se pudo obtener la información del video.*');
      }

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
        if (!text.startsWith('http') && info.entries?.length) info = info.entries[0];
      } catch (e) {
        console.error('❌ Error al interpretar la información:', e);
        return m.reply('❌ *Error al interpretar la información.*');
      }

      const { title, duration_string, view_count, webpage_url, thumbnail } = info;

      console.log(`🎬 Video encontrado: ${title}`);
      console.log(`⏱️ Duración: ${duration_string}, 👁️ Vistas: ${view_count}, 🔗 URL: ${webpage_url}`);

      try {
        const thumbRes = await axios.get(thumbnail, { responseType: 'arraybuffer' });
        var thumbBuffer = Buffer.from(thumbRes.data);
      } catch (e) {
        console.warn('⚠️ No se pudo descargar la miniatura:', e.message);
      }

      try {
        m.reply('*VIDEO ENCONTRADO. ✔️*\n⏬ *Tu vídeo está siendo descargado...*');

        const videoBuffer = await getVideoBuffer(webpage_url);
        const fileName = sanitizeFileName(title) + '.mp4';

        await conn.sendMessage(chatId, {
          document: videoBuffer,
          mimetype: 'video/mp4',
          fileName,
          caption: `🎬 *${title}*\n\n⏱️ *Duración:* ${duration_string}\n👁️ *Vistas:* ${view_count.toLocaleString()}\n🔗 *Enlace:* ${webpage_url}`,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title,
              body: 'ZenBot - Descargas 📥',
              mediaType: 1,
              thumbnail: thumbBuffer || null,
              sourceUrl: webpage_url
            }
          }
        }, { quoted: m });

        console.log("✅ Video enviado correctamente.");
      } catch (e) {
        console.error("❌ Error al procesar el video:", e);
        m.reply("⚠️ Ocurrió un error al enviar el video.");
      }
    });
  }
};