import { config } from '../config.js';

export default {
  help: ['𝚁𝙴𝙿𝙾𝚁𝚃𝙰𝚁 (𝚌𝚖𝚍+𝚙𝚋𝚖)'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],
  command: ['reporte', 'bug', 'reportar'],
  run: async (m, { conn, args, text, sender, isGroup }) => {
    const reportText = text.trim();
    const from = m.key.remoteJid;

    if (!reportText) {
      return await m.reply(`
❗ *Error:*
Por favor, escribe el comando que falla y una breve descripción del problema.

Ejemplo:
╔════════════════════
║ /reporte (comando)
║ *No envía el mensaje aunque esté activado.*
╚════════════════════
      `);
    }

    const reportMessage = `
*🌟 Nuevo Reporte Recibido 🌟*

*🧑‍💻 De:* ${sender.split('@')[0]}
${isGroup ? `*💬 Grupo:* ${from}` : ''}
*📝 Reporte:*
${reportText}
    `.trim();

    try {
      await conn.sendMessage(config.owner + '@s.whatsapp.net', { text: reportMessage });
      await m.reply(`
✅ *Tu reporte ha sido enviado exitosamente al creador del bot.*

¡Gracias por tu colaboración! 🙌
      `);
    } catch (e) {
      await m.reply(`
❌ *Hubo un error al intentar enviar el reporte.*

Por favor, intenta nuevamente más tarde. 😔
      `);
    }
  }
};