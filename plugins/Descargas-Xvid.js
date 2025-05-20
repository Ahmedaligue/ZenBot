import { spawn } from 'child_process';
import axios from 'axios';

export default {
  command: ['xvid', 'twittervid', 'twvid'],
  help: ['𝚇𝚅𝙸𝙳 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚇 (𝚃𝚠𝚒𝚝𝚝𝚎𝚛)>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || (!text.includes('x.com') && !text.includes('twitter.com')))
      return m.reply('⚠️ Pasame un link válido de X (Twitter), capo.');

    m.reply('⏳ Bajando tu video de X... aguanta un toque.');

    const ytdlp = spawn('yt-dlp', [
      '-f', 'best[height<=480]', // media calidad copada
      '-o', '-',
      text.trim()
    ]);

    let videoBuffer = Buffer.alloc(0);

    ytdlp.stdout.on('data', chunk => videoBuffer = Buffer.concat([videoBuffer, chunk]));
    ytdlp.stderr.on('data', chunk => console.log(`📥 yt-dlp: ${chunk.toString().trim()}`));

    ytdlp.on('close', async code => {
      if (code !== 0 || !videoBuffer.length)
        return m.reply('❌ No pude bajarte el video, fijate el link y probá de nuevo.');

      try {
        await conn.sendMessage(chatId, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: 'x_video.mp4',
          caption: '🎬 Acá está tu video de X, disfrutalo.',
        }, { quoted: m });

        console.log('✅ Video de X enviado sin drama.');
      } catch (err) {
        console.error('❌ Error al mandar el video:', err);
        m.reply('⚠️ Hubo un problema al enviar el video.');
      }
    });
  }
};