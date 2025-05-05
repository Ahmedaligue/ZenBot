import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export default {
  command: ['tiktok', 'ttk', 'tt', 'tiktokdl'],
  help: ['𝚃𝙸𝙺𝚃𝙾𝙺 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝚃𝚒𝚔 𝚃𝚘𝚔>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text }) => {
    if (!text || !text.includes('tiktok.com')) {
      return m.reply('✳️ *Pasá un link válido de TikTok.*');
    }

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'tiktok');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const filename = `ttk_${Date.now()}.mp4`;
    const outputPath = path.join(folder, filename);

    m.reply('⏳ *Descargando video de TikTok...*');

    const cmd = `yt-dlp -f mp4 -o "${outputPath}" "${text}"`;

    exec(cmd, async (error, stdout, stderr) => {
      if (error || !fs.existsSync(outputPath)) {
        console.error('Error al descargar:', stderr || error);
        return m.reply('❌ *No se pudo descargar el video.*');
      }

      try {
        await conn.sendMessage(m.chat, {
          video: fs.readFileSync(outputPath),
          mimetype: 'video/mp4',
          fileName: filename,
          caption: '✅ *Aquí tienes tu Tiktok*'
        }, { quoted: m });

        fs.unlinkSync(outputPath);
      } catch (err) {
        console.error('Error al enviar el video:', err);
        m.reply('❌ *Ocurrió un error al enviar el video.*');
      }
    });
  }
};