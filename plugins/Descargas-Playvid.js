import { spawn, exec } from 'child_process';
import axios from 'axios';

const sanitizeFileName = name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 150);

export default {
  command: ['playvid', 'ytvid', 'play2'],
  help: ['𝙿𝙻𝙰𝚈𝚅𝙸𝙳 <𝚝𝚎𝚡𝚝𝚘/𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚄𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('✳️ *Poné el nombre del video o un link válido.*');

    const search = text.startsWith('http') ? text : `ytsearch:${text}`;
    m.reply('⏳ *Buscando y descargando el video...*');

    exec(`yt-dlp --dump-json "${search}"`, (err, out) => {
      if (err) return m.reply('❌ *No se pudo obtener la información del video.*');

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
        if (!text.startsWith('http') && info.entries?.length) info = info.entries[0];
      } catch {
        return m.reply('❌ *Error al interpretar la información.*');
      }

      const { title, duration_string, view_count, webpage_url, thumbnail } = info;
      const fileName = sanitizeFileName(title) + '.mp4';

      const ytdlp = spawn('yt-dlp', [
        '-f', 'bestvideo[height<=360]+bestaudio/best[height<=360]',
        '--merge-output-format', 'mp4',
        '-o', '-', // salida por stdout
        webpage_url
      ]);

      let videoBuffer = Buffer.alloc(0);
      ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
      ytdlp.stderr.on('data', chunk => console.log(chunk.toString())); // progreso visible en consola

      ytdlp.on('close', async code => {
        if (code !== 0 || !videoBuffer.length) return m.reply('❌ *Falló la descarga del video.*');

        let thumbBuffer;
        try {
          const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
          thumbBuffer = Buffer.from(res.data);
        } catch {}

        try {
          await conn.sendMessage(chatId, {
            document: videoBuffer,
            mimetype: 'video/mp4',
            fileName,
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
        } catch (error) {
          console.error('Error al enviar el video:', error);
          m.reply('❌ *No se pudo enviar el video.*');
        }
      });
    });
  }
};