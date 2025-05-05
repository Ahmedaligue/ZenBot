import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import mime from 'mime-types';

export default {
  command: ['igvid', 'instagramvid', 'ig', 'instagram'],
  help: ['𝙸𝙶𝚅𝙸𝙳 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text }) => {
    if (!text || !text.includes('instagram.com')) {
      return m.reply('✳️ *Pasá un link válido de Instagram.*');
    }

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'instagram');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    m.reply('⏳ *Descargando video de Instagram...*');

    const cmd = `yt-dlp --no-playlist -o "${folder}/igvid_%(id)s.%(ext)s" "${text}"`;

    exec(cmd, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error al descargar video:', stderr || error);
        return m.reply('❌ *No se pudo descargar el video.*');
      }

      const files = fs.readdirSync(folder).filter(f => mime.lookup(f)?.startsWith('video/'));
      if (!files.length) return m.reply('❌ *No se encontró ningún video.*');

      for (const file of files) {
        const filePath = path.join(folder, file);
        try {
          await conn.sendMessage(m.chat, {
            video: fs.readFileSync(filePath),
            mimetype: mime.lookup(filePath),
            caption: '✅ *Aquí tienes tu vídeo de Instagram.*'
          }, { quoted: m });
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error al enviar video:', err);
          m.reply('❌ *Error al enviar el video.*');
        }
      }
    });
  }
};