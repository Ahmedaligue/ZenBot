import { spawn } from 'child_process';

const bajarTikTok = url => new Promise((resolve, reject) => {
  const yt = spawn('yt-dlp', [
    '-f', 'mp4',
    '-o', '-',
    url
  ]);

  const pedazos = [];

  yt.stdout.on('data', pedazo => pedazos.push(pedazo));
  yt.stderr.on('data', data => console.log(`📥 yt-dlp: ${data.toString().trim()}`));

  yt.on('close', code => {
    if (code !== 0) {
      console.log(`❌ yt-dlp terminó con código ${code}`);
      return reject(new Error('yt-dlp falló'));
    }
    console.log('✅ Video de TikTok descargado correctamente.');
    resolve(Buffer.concat(pedazos));
  });

  yt.on('error', err => {
    console.log('❌ Error al ejecutar yt-dlp:', err);
    reject(err);
  });
});

export default {
  command: ['tiktok', 'ttk', 'tt', 'tiktokdl'],
  help: ['𝚃𝚃𝙺 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚃𝚒𝚔 𝚃𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('tiktok.com')) {
      return m.reply('⚠️ Che, pasame un link válido de TikTok, ¿dale?');
    }

    try {
      await m.reply('⏬ Bajando video de TikTok... tranqui que ya está.');

      const videoBuffer = await bajarTikTok(text);

      await conn.sendMessage(chatId, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `tiktok_video_${Date.now()}.mp4`,
        caption: '✅ Acá tenés tu TikTok, disfrutalo tranqui.'
      }, { quoted: m });

      console.log('🎉 TikTok enviado sin drama.');
    } catch (e) {
      console.error('❌ Error bajando TikTok:', e);
      m.reply('❌ Ups, hubo un problema descargando el TikTok. Probá de nuevo.');
    }
  }
};