import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export default {
  command: ['pinterest', 'pindl', 'pin', 'pinvid'],
  help: ['𝙿𝙸𝙽𝚅𝙸𝙳 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !text.includes('pinterest.com')) {
      return m.reply('✳️ *Pasame un link válido de Pinterest, porfa.*');
    }

    const folder = path.join(process.cwd(), 'lib', 'descargas', 'pinterest');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    await m.reply('⏳ *Descargando tu video de Pinterest... aguantá un cachito.*');

    const cmd = `yt-dlp -f best --merge-output-format mp4 -o "${folder}/pin_%(id)s.%(ext)s" "${text}"`;

    exec(cmd, async (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error al descargar:', stderr || error);
        return m.reply(`
❌ *No pude descargar el video de Pinterest.*

*Posibles causas:*
- El link está roto o no es válido.
- El contenido está restringido.
- yt-dlp tiró error.

*Revisalo y volvé a intentar.*`);
      }

      const files = fs.readdirSync(folder).filter(f => f.includes('pin_'));
      if (!files.length) return m.reply('❌ *No encontré ningún video para mandar.*');

      for (const file of files) {
        const filePath = path.join(folder, file);
        try {
          await conn.sendMessage(chatId, {
            video: fs.readFileSync(filePath),
            mimetype: 'video/mp4',
            caption: '✅ *Acá tenés tu video de Pinterest, listo para compartir.*'
          }, { quoted: m });
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('❌ Error al enviar el video:', err);
          m.reply('⚠️ *Se descargó bien, pero hubo un error al enviarlo. Probá más tarde.*');
        }
      }
    });
  }
};