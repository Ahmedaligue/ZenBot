import { spawn } from 'child_process';

export default {
  command: ['fb', 'facebook'],
  help: ['𝙵𝙱 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('facebook.com')) {
      return m.reply('✳️ *Pasame un link válido de Facebook público.*');
    }

    m.reply('⏳ *Descargando video de Facebook...*');

    const ytdlp = spawn('yt-dlp', [
      '-f', 'best',
      '-o', '-', // salida en buffer
      text
    ]);

    let videoBuffer = Buffer.alloc(0);
    ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
    ytdlp.stderr.on('data', err => console.log(err.toString()));

    ytdlp.on('close', async code => {
      if (code !== 0 || !videoBuffer.length) {
        return m.reply('❌ *No se pudo descargar el video.* Asegurate que el link sea público.');
      }

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `facebook_video_${Date.now()}.mp4`,
          caption: '✅ *Acá tenés tu video de Facebook.*'
        }, { quoted: m });
      } catch (err) {
        console.error('Error al enviar el video:', err);
        m.reply('❌ *Falló el envío del video.*');
      }
    });
  }
};