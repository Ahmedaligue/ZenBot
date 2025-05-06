import { spawn } from 'child_process';

export default {
  command: ['tiktok', 'ttk', 'tt', 'tiktokdl'],
  help: ['𝚃𝚃𝙺 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚃𝚒𝚔 𝚃𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('tiktok.com')) {
      return m.reply('✳️ *Pasá un link válido de TikTok.*');
    }

    m.reply('⏳ *Descargando video de TikTok...*');

    const ytdlp = spawn('yt-dlp', [
      '-f', 'mp4',
      '-o', '-', // salida por stdout
      text
    ]);

    let videoBuffer = Buffer.alloc(0);
    ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
    ytdlp.stderr.on('data', chunk => console.log(chunk.toString())); // progreso

    ytdlp.on('close', async code => {
      if (code !== 0 || !videoBuffer.length) {
        return m.reply('❌ *No se pudo descargar el video.*');
      }

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `TikTok_${Date.now()}.mp4`,
          caption: '✅ *Aquí tenés tu TikTok*'
        }, { quoted: m });
      } catch (err) {
        console.error('Error al enviar el video:', err);
        m.reply('❌ *Ocurrió un error al enviar el video.*');
      }
    });
  }
};