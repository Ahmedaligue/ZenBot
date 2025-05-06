import { spawn, exec } from 'child_process';
import axios from 'axios';

export default {
  command: ['play', 'playaud', 'ytaud'],
  help: ['𝙿𝙻𝙰𝚈 <𝚝𝚎𝚡𝚝𝚘/𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚄𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('✳️ *Poné el nombre de la canción o un link de YouTube válido.*');

    const search = text.startsWith('http') ? text : `ytsearch:${text}`;
    m.reply('⏳ *Buscando y descargando el audio...*');

    exec(`yt-dlp --dump-json "${search}"`, async (err, out) => {
      if (err) return m.reply('❌ *No se pudo obtener la información del video.*');

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
      } catch {
        return m.reply('❌ *Error al interpretar la información.*');
      }

      const { title, thumbnail, webpage_url } = info;
      const fileName = `${title.replace(/[^\w\s\-]/gi, '').slice(0, 60)}.mp3`;

      const ytdlp = spawn('yt-dlp', [
        '-x', '--audio-format', 'mp3',
        '--no-playlist',
        '-o', '-', // salida por stdout
        webpage_url
      ]);

      let audioBuffer = Buffer.alloc(0);
      ytdlp.stdout.on('data', chunk => audioBuffer = Buffer.concat([audioBuffer, chunk]));
      ytdlp.stderr.on('data', chunk => console.log(chunk.toString()));

      ytdlp.on('close', async code => {
        if (code !== 0 || !audioBuffer.length) return m.reply('❌ *No se pudo descargar el audio.*');

        let thumbBuffer;
        try {
          const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
          thumbBuffer = Buffer.from(res.data);
        } catch {}

        try {
          await conn.sendMessage(chatId, {
            document: audioBuffer,
            mimetype: 'audio/mpeg',
            fileName,
            caption: `*¡Aquí tenés tu canción!* 🎵`,
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
          console.error('Error al enviar audio:', error);
          m.reply('❌ *No se pudo enviar el audio.*');
        }
      });
    });
  }
};