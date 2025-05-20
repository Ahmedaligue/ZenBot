import { spawn, exec } from 'child_process';
import axios from 'axios';

const cleanName = name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 150);

const bajarVideo = url => new Promise((resolve, reject) => {
  const yt = spawn("yt-dlp", [
    "-f", "best[ext=mp4][height<=720]/best[ext=mp4][height<=480]/best[ext=mp4][height<=360]",
    "-o", "-",
    url
  ]);

  const pedazos = [];

  yt.stdout.on("data", pedazo => pedazos.push(pedazo));
  yt.stderr.on("data", data => console.log(`yt-dlp dice: ${data.toString().trim()}`));

  yt.on("close", code => {
    if (code !== 0) return reject(new Error("yt-dlp pinchó"));
    resolve(Buffer.concat(pedazos));
  });

  yt.on("error", err => reject(err));
});

export default {
  command: ['playvid', 'ytvid', 'play2', 'ytmp4'],
  help: ['🎬 𝙿𝙻𝙰𝚈𝚅𝙸𝙳 <nombre o link de YouTube>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('✳️ *Tenés que pasarme el nombre de un vídeo o un link de YouTube.*');

    const busqueda = text.startsWith('http') ? text : `ytsearch:${text}`;
    m.reply(`🔎 Buscando el video: *${text}*... tranqui.`);

    exec(`yt-dlp --dump-json "${busqueda}"`, async (err, out) => {
      if (err) {
        console.error('❌ No se pudo sacar la data del video:', err);
        return m.reply('🚫 Uh, no pude conseguir la info del video. Probá de nuevo.');
      }

      let info;
      try {
        info = JSON.parse(out.trim().split('\n')[0]);
        if (!text.startsWith('http') && info.entries?.length) info = info.entries[0];
      } catch (e) {
        console.error('⚠️ Se rompió la data del video:', e);
        return m.reply('❌ Error leyendo la info del video, capo.');
      }

      const { title, duration_string, view_count, webpage_url, thumbnail, formats } = info;
      const calidad = formats?.filter(f => f.ext === 'mp4' && f.height)
        .map(f => f.height)
        .sort((a, b) => b - a)
        .find(h => h <= 720) || '¿?';

      let thumbBuffer;
      try {
        const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
        thumbBuffer = Buffer.from(res.data);
      } catch {}

      try {
        m.reply(`✅ *Vídeo encontrado, arrancando descarga... espera un momento.*`);

        const videoBuffer = await bajarVideo(webpage_url);
        const fileName = cleanName(title) + '.mp4';

        await conn.sendMessage(chatId, {
          document: videoBuffer,
          mimetype: 'video/mp4',
          fileName,
          caption: `🎥 *${title}*\n⏳ Duración: ${duration_string}\n📏 Calidad: ${calidad}p\n👀 Vistas: ${view_count?.toLocaleString?.() || 'N/A'}\n🔗 Link: ${webpage_url}`,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title,
              body: 'ZenBot - Descargas ✔️',
              mediaType: 1,
              thumbnail: thumbBuffer || null,
              sourceUrl: webpage_url
            }
          }
        }, { quoted: m });

        console.log('🎉 Todo joya, video enviado.');
      } catch (e) {
        console.error('⚠️ Se pudrió todo al mandar el video:', e);
        m.reply('❌ Mmm, hubo un quilombo enviando el video, probá otra vez.');
      }
    });
  }
};