import { spawn } from 'child_process';
import axios from 'axios';

export default {
  command: ['xvid', 'twittervid', 'twvid'],
  help: ['𝚇𝚅𝙸𝙳 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚇 (𝚃𝚠𝚒𝚝𝚝𝚎𝚛)>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('x.com') && !text.includes('twitter.com'))
      return m.reply('✳️ *Pasame un link válido de X (Twitter).*');

    m.reply('⏳ *Descargando video de X...*');

    const ytdlp = spawn('yt-dlp', [
      '-f', 'best',
      '-o', '-', // salida por stdout
      text.trim()
    ]);

    let videoBuffer = Buffer.alloc(0);
    ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
    ytdlp.stderr.on('data', chunk => console.log(chunk.toString()));

    ytdlp.on('close', async code => {
      if (code !== 0 || !videoBuffer.length)
        return m.reply('❌ *No se pudo descargar el video.*');

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: 'x_video.mp4',
          caption: '*Aquí tenés tu video de X (Twitter)*',
        }, { quoted: m });
      } catch (err) {
        console.error('Error al enviar video:', err);
        m.reply('❌ *Error al enviar el video.*');
      }
    });
  }
};