import { spawn } from 'child_process';
import mime from 'mime-types';

export default {
  command: ['igvid', 'instagramvid', 'ig', 'instagram'],
  help: ['𝙸𝙶𝚅𝙸𝙳 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('instagram.com')) {
      return m.reply('✳️ *Pasá un link válido de Instagram.*');
    }

    m.reply('⏳ *Descargando video de Instagram...*');

    const yt = spawn('yt-dlp', [
      '-f', 'mp4',
      '-o', '-',         // salida por stdout
      '--no-playlist',
      text
    ]);

    let videoBuffer = Buffer.alloc(0);

    yt.stdout.on('data', chunk => {
      videoBuffer = Buffer.concat([videoBuffer, chunk]);
    });

    yt.stderr.on('data', err => {
      console.error('yt-dlp stderr:', err.toString());
    });

    yt.on('close', async code => {
      if (code !== 0) {
        return m.reply('❌ *No se pudo descargar el video.*');
      }

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          caption: '✅ *Aquí tienes tu vídeo de Instagram.*'
        }, { quoted: m });
      } catch (err) {
        console.error('Error al enviar video:', err);
        m.reply('❌ *Error al enviar el video.*');
      }
    });
  }
};