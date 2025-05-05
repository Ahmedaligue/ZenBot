import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export default {
  command: ['fb', 'facebook'],
  help: ['𝙵𝙱 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text }) => {
    if (!text || !text.includes('facebook.com')) {
      return m.reply('✳️ *Pasame un link válido de Facebook público.*');
    }

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'facebook');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const filename = `fb_${Date.now()}.mp4`;
    const outputPath = path.join(folder, filename);

    m.reply('⏳ *Descargando video de Facebook...*');

    const cmd = `yt-dlp -f best -o "${outputPath}" "${text}"`;

    exec(cmd, async (err, stdout, stderr) => {
      if (err || !fs.existsSync(outputPath)) {
        console.error('Error al descargar:', stderr || err);
        return m.reply('❌ *No se pudo descargar el video.* Asegurate que el link sea público.');
      }

      try {
        await conn.sendMessage(m.chat, {
          document: fs.readFileSync(outputPath),
          mimetype: 'video/mp4',
          fileName: 'facebook_video.mp4',
          caption: '✅ *Aquí tienes tu vídeo de Facebook.*',
        }, { quoted: m });

        fs.unlinkSync(outputPath);
      } catch (sendErr) {
        console.error('Error al enviar video:', sendErr);
        m.reply('❌ *Falló el envío del video.*');
      }
    });
  }
};