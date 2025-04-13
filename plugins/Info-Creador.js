import fs from 'fs';
import path from 'path';
import { config } from '../config.js';

export default {
  command: ['owner', 'creador', 'dueño', 'propietario'],
  help: ['owner'],
  tags: ['🤖 INFOBOT'],

  run: async (m, { conn, sender }) => {
    const mention = '@' + sender.split('@')[0];
    const caption = `  
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 👤 **Creador**: ${mention}
┃ 📞 **Número**: wa.me/${config.owner}
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🌐 **Instagram**: ${config.instagram}
┃ 💻 **GitHub**: ${config.github}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    const imagePath = path.join('./media/owner.jpg');

    const fakeQuoted = {
      key: {
        remoteJid: m.chat,
        fromMe: false,
        id: 'Owner-Fake',
        participant: '0@s.whatsapp.net',
      },
      message: {
        imageMessage: {
          caption: '🤖 Información del Creador.',
          mimetype: 'image/jpeg',
          jpegThumbnail: fs.readFileSync(imagePath),
        }
      }
    };

    // Si el archivo de imagen existe, se envía la imagen con la descripción
    if (fs.existsSync(imagePath)) {
      await conn.sendMessage(m.key.remoteJid, {
        image: fs.readFileSync(imagePath),
        caption,
        mentions: [sender]
      }, { quoted: fakeQuoted });
    } else {
      // Si no, se envía solo el texto con mención
      await conn.sendMessage(m.key.remoteJid, {
        text: caption,
        mentions: [sender]
      }, { quoted: fakeQuoted });
    }
  }
};