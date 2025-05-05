import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import axios from 'axios';

export default {
  command: ['play', 'ytmp3', 'playaud', 'ytaud'],
  help: ['𝙿𝙻𝙰𝚈 <𝚝𝚎𝚡𝚝𝚘/𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚞𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text }) => {
    if (!text) return m.reply('✳️ *Poné el nombre de la canción o un link de YouTube válido.*');

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'audios');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const search = text.startsWith('http') ? text : `ytsearch:${text}`;
    m.reply('⏳ *Buscando y descargando el audio...*');

    exec(`yt-dlp --dump-json "${search}"`, async (e, out) => {
      if (e) return m.reply('❌ *No se pudo obtener la información del video.*');

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
      } catch {
        return m.reply('❌ *Error al interpretar la información.*');
      }

      const { title, thumbnail, webpage_url } = info;
      const safeTitle = title.replace(/[^\w\s\-]/gi, '').slice(0, 60);
      const filePath = path.join(folder, `${safeTitle}.mp3`);

      exec(`yt-dlp -x --audio-format mp3 --no-playlist -o "${filePath}" "${webpage_url}"`, async (err) => {
        if (err || !fs.existsSync(filePath)) return m.reply('❌ *Falló la descarga del audio.*');

        let thumbBuffer;
        try {
          const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
          thumbBuffer = Buffer.from(res.data);
        } catch {}

        try {
          await conn.sendMessage(m.chat, {
            document: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${safeTitle}.mp3`,
            caption: `*¡Aquí tienes tu canción!* 🎵`,
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              externalAdReply: {
                title: title,
                body: 'ZenBot - Descargas 📥',
                mediaType: 1,
                thumbnail: thumbBuffer || null,
                sourceUrl: webpage_url
              }
            }
          }, { quoted: m });

          fs.unlinkSync(filePath);
        } catch {
          m.reply('❌ *No se pudo enviar el audio.*');
        }
      });
    });
  }
};