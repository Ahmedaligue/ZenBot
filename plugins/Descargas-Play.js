import { spawn } from 'child_process';
import ytSearch from 'yt-search';

const yts = ytSearch;

const getYoutubeAudioBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn('yt-dlp', [
      '-f', 'bestaudio[ext=m4a]',
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
      console.log('✅ Audio de YouTube descargado correctamente.');
      resolve(Buffer.concat(chunks));
    });

    ytdlp.on('error', err => {
      console.log('❌ Error al ejecutar yt-dlp:', err);
      reject(err);
    });
  });
};

export default {
  command: ['play', 'playaud', 'ytaud', 'ytmp3'],
  help: ['𝙿𝙻𝙰𝚈 <𝚝𝚎𝚡𝚝𝚘/𝚕𝚒𝚗𝚔 𝚍𝚎 𝚈𝚘𝚄𝚃𝚞𝚋𝚎>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text) {
      return m.reply(`✳️ *Falta el nombre de la canción o link válido.*\n\nEjemplo: ${m.prefix}play Courage To Change - Sia`);
    }

    try {
      const resultados = await yts(text);
      const video = resultados.all.find(v => v.type === 'video');

      if (!video) return m.reply('❌ No encontré ningún video con ese nombre.');
      
     await m.reply('🔍 *Buscando audio, espera un momento...*');
     
      await conn.sendMessage(chatId, {
        image: { url: video.thumbnail },
        caption:
          `*AUDIO ENCONTRADO ✔️*\n\n🎵 *${video.title}*\n` +
          `⏱️ *Duración:* ${video.timestamp}\n` +
          `📺 *Canal:* ${video.author.name}\n` +
          `📅 *Publicado:* ${video.ago}\n` +
          `🔗 *Link:* ${video.url}
          *ENVIANDO AUDIO ⏬*`
      }, { quoted: m });

      const audioBuffer = await getYoutubeAudioBuffer(video.url);

      await conn.sendMessage(chatId, {
        audio: audioBuffer,
        mimetype: 'audio/mp4',
        fileName: `${video.title.replace(/[\\/:*?"<>|]/g, '')}.m4a`
      }, { quoted: m });

      console.log('✅ Audio enviado correctamente.');
    } catch (e) {
      console.error('❌ Error en comando play:', e);
      m.reply('⚠️ Ocurrió un error al procesar el audio. Intentá más tarde o con otro nombre.');
    }
  }
};