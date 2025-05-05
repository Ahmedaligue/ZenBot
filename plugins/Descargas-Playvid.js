import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';

const sanitizeFileName = name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 150);

export default {
  command: ['playvid', 'ytvid', 'play2', 'ytmp4'],
  help: ['𝙿𝙻𝙰𝚈𝚅𝙸𝙳 <𝚝𝚎𝚡𝚝𝚘/𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚞𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text }) => {
    if (!text) return m.reply('✳️ *Poné el nombre del video o un link válido.*');

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'videos');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const search = text.startsWith('http') ? text : `ytsearch:${text}`;
    m.reply('⏳ *Buscando y descargando el video...*');

    exec(`yt-dlp --dump-json "${search}"`, (e, out) => {
      if (e) return m.reply('❌ *No se pudo obtener la información del video.*');

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
        if (!text.startsWith('http') && info.entries?.length) info = info.entries[0];
      } catch {
        return m.reply('❌ *Error al interpretar la información.*');
      }

      const { title, duration_string, view_count, webpage_url, thumbnail } = info;
      const filename = sanitizeFileName(title) + '.mp4';
      const filePath = path.join(folder, filename);

      exec(`yt-dlp -f "bestvideo[height<=360]+bestaudio/best[height<=360]" --merge-output-format mp4 -o "${filePath}" "${webpage_url}"`, async err => {
        if (err || !fs.existsSync(filePath)) return m.reply('❌ *Falló la descarga del video.*');

        let thumbBuffer;
        try {
          const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
          thumbBuffer = Buffer.from(res.data);
        } catch {}

        try {
          await conn.sendMessage(m.chat, {
            document: fs.readFileSync(filePath),
            mimetype: 'video/mp4',
            fileName: filename,
            caption: `INFORMACIÓN DEL VÍDEO:
├ ⏱️ *Duración:* ${duration_string}
├ 👁️‍🗨️ *Vistas:* ${view_count.toLocaleString()}
├ 🔗 *Enlace:* ${webpage_url}`,
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

          fs.unlinkSync(filePath);
        } catch {
          m.reply('❌ *No se pudo enviar el video.*');
        }
      });
    });
  }
};