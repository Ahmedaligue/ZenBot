import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export default {
  command: ['pinterest', 'pindl', 'pin', 'pinvid'],
  help: ['𝙿𝙸𝙽𝚅𝙸𝙳 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('pinterest.com')) {
      return m.reply('✳️ *Poné un link de un vídeo válido de Pinterest.*');
    }

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'pinterest');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    m.reply('⏳ *Descargando contenido de Pinterest...*');

    const cmd = `yt-dlp -f best --merge-output-format mp4 -o "${folder}/pin_%(id)s.%(ext)s" "${text}"`;

    exec(cmd, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error al descargar:', stderr || error);
        return m.reply('❌ *No se pudo descargar el contenido de Pinterest.*');
      }

      const files = fs.readdirSync(folder).filter(f => f.includes('pin_'));
      if (!files.length) return m.reply('❌ *No se encontró contenido válido.*');

      for (const file of files) {
        const filePath = path.join(folder, file);
        try {
          await conn.sendMessage(chatId, {
            video: fs.readFileSync(filePath),
            mimetype: 'video/mp4',
            caption: '✅ *Aquí tienes tu vídeo de Pinterest.*'
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