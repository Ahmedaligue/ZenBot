import { spawn } from 'child_process';

const getFacebookVideoBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn('yt-dlp', [
      '-f', 'best',
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
      console.log('✅ Descarga finalizada, enviando video...');
      resolve(Buffer.concat(chunks));
    });

    ytdlp.on('error', err => {
      console.log('❌ Error al ejecutar yt-dlp:', err);
      reject(err);
    });
  });
};

export default {
  command: ['fb', 'facebook'],
  help: ['𝙵𝙱 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('facebook.com')) {
      return m.reply('✳️ *Pasame un link válido de Facebook público.*');
    }

    m.reply('⏳ *Descargando video de Facebook...*');

    try {
      const videoBuffer = await getFacebookVideoBuffer(text);

      await conn.sendMessage(chatId, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `facebook_video_${Date.now()}.mp4`,
        caption: '✅ *Acá tenés tu video de Facebook.*'
      }, { quoted: m });

      console.log('✅ Video enviado correctamente.');

    } catch (err) {
      console.error('❌ Error al descargar o enviar video:', err);
      m.reply('❌ *No se pudo descargar o enviar el video. Probá con otro enlace.*');
    }
  }
};