import { spawn } from 'child_process';

export default {
  command: ['ytvideo', 'ytv', 'ytmp4'],
  help: ['𝚈𝚃𝚅𝙸𝙳𝙴𝙾 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚞𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || (!text.includes('youtube.com') && !text.includes('youtu.be'))) {
      return m.reply('✳️ *Pasá un link válido de YouTube.*');
    }

    m.reply('⏳ *Descargando video...*');

    const ytdlp = spawn('yt-dlp', [
      '-f', 'best[ext=mp4]/best',
      '-o', '-',
      text
    ]);

    let videoBuffer = Buffer.alloc(0);
    ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
    ytdlp.stderr.on('data', err => console.log(err.toString()));

    ytdlp.on('close', async code => {
      if (code !== 0 || !videoBuffer.length) {
        return m.reply('❌ *No se pudo descargar el video.*');
      }

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `youtube_video_${Date.now()}.mp4`,
          caption: '✅ *Acá tenés tu video de YouTube.*'
        }, { quoted: m });
      } catch (err) {
        console.error('Error al enviar el video:', err);
        m.reply('❌ *Falló el envío del video.*');
      }
    });
  }
};