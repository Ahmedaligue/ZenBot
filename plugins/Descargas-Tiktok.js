import { spawn } from 'child_process';

const getTiktokVideoBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn('yt-dlp', [
      '-f', 'mp4',
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
        console.log(`❌ yt-dlp terminó con código ${code}`);
        return reject(new Error('yt-dlp falló'));
      }
      console.log('✅ Video de TikTok descargado correctamente.');
      resolve(Buffer.concat(chunks));
    });

    ytdlp.on('error', err => {
      console.log('❌ Error al ejecutar yt-dlp:', err);
      reject(err);
    });
  });
};

export default {
  command: ['tiktok', 'ttk', 'tt', 'tiktokdl'],
  help: ['𝚃𝚃𝙺 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚃𝚒𝚔 𝚃𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('tiktok.com')) {
      return m.reply('*✳️ Tenés que pasar un enlace válido de TikTok.*');
    }

    try {
      await m.reply('⏬ Descargando video de TikTok...');

      const videoBuffer = await getTiktokVideoBuffer(text);

      await conn.sendMessage(chatId, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `tiktok_video_${Date.now()}.mp4`,
        caption: '✅ Video enviado correctamente.'
      }, { quoted: m });

    } catch (e) {
      console.error('❌ Error en comando ttk:', e);
      m.reply('⚠️ Hubo un error al descargar el video de TikTok.');
    }
  }
};