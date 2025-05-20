import { spawn, exec } from 'child_process';
import axios from 'axios';

const cleanName = name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').slice(0, 150);

const bajarVideo = url => new Promise((resolve, reject) => {
  const yt = spawn("yt-dlp", [
    "-f", "best[ext=mp4][height<=360]",
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
    if (!text) return m.reply('⚠️ Che, mandame el nombre o el link del video, no seas gil.');

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

      const { title, duration_string, view_count, webpage_url, thumbnail } = info;

      let thumbBuffer;
      try {
        const res = await axios.get(thumbnail, { responseType: 'arraybuffer' });
        thumbBuffer = Buffer.from(res.data);
      } catch {
        // no pasa nada si no baja la mini
      }

      try {
        m.reply(`✅ *${title}* encontrado, arrancando descarga... aguantá un toque.`);

        const videoBuffer = await bajarVideo(webpage_url);
        const fileName = cleanName(title) + '.mp4';

        await conn.sendMessage(chatId, {
          document: videoBuffer,
          mimetype: 'video/mp4',
          fileName,
          caption: `🎥 *${title}*\n⏳ Duración: ${duration_string}\n👀 Vistas: ${view_count.toLocaleString()}\n🔗 Link: ${webpage_url}`,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title,
              body: 'ZenBot - Descargas copadas',
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