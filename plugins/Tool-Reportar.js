import { config } from '../config.js';

export default {
  help: ['𝚁𝙴𝙿𝙾𝚁𝚃𝙰𝚁 (𝚌𝚖𝚍+𝚙𝚋𝚖)'],
  tags: ['⚙️ 𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦'],
  command: ['reporte', 'bug', 'reportar'],
  run: async (m, { conn, args, text, sender, isGroup }) => {
    const reportText = text.trim();
    const from = m.key.remoteJid;

    if (!reportText) {
      return await conn.sendMessage(from, {
        text: '❗ *Por favor, escribe el comando que falla y una breve descripción del problema.*\n\nEjemplo:\n/reporte (comando)\n*No envía el mensaje aunque esté activado.*'
      }, { quoted: m });
    }

    const reportMessage = `
*Nuevo Reporte Recibido*

*De:* ${sender.split('@')[0]}
${isGroup ? `*Grupo:* ${from}` : ''}
*Reporte:*
${reportText}
    `.trim();

    try {
      await conn.sendMessage(config.owner + '@s.whatsapp.net', { text: reportMessage });
      await conn.sendMessage(from, {
        text: '✅ *Tu reporte ha sido enviado al creador del bot. ¡Gracias por tu colaboración!*'
      }, { quoted: m });
    } catch (e) {
      await conn.sendMessage(from, {
        text: '❌ *Hubo un error al intentar enviar el reporte. Inténtalo más tarde.*'
      }, { quoted: m });
    }
  }
};