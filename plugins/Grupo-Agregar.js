export default {
  help: ['𝙰𝙶𝚁𝙴𝙶𝙰𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['add', 'agregar', 'añadir'],

  run: async (m, { conn, args, isGroup, metadata, botParticipant }) => {
    if (!isGroup) {
      return conn.sendMessage(m.key.remoteJid, {
        text: '❌ *Este comando solo funciona en grupos.*',
      }, { quoted: m });
    }

    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) {
      return conn.sendMessage(m.key.remoteJid, {
        text: '⚠️ *Debes escribir un número válido para agregar.*\n\n*Ejemplo:* `.add 1123456789`',
      }, { quoted: m });
    }

    if (!botParticipant?.admin) {
      return conn.sendMessage(m.key.remoteJid, {
        text: '⛔ *No puedo agregar usuarios porque no soy administrador del grupo.*\n\nDame permisos y volvé a intentarlo.',
      }, { quoted: m });
    }

    const userJid = `${number}@s.whatsapp.net`;

    try {
      const res = await conn.groupParticipantsUpdate(m.key.remoteJid, [userJid], 'add');
      const result = res[0];
      const status = result?.status;

      if (status === 200 || status === '200') {
        return conn.sendMessage(m.key.remoteJid, {
          text: `✅ *¡Usuario agregado con éxito!*\n\n@${number} ahora forma parte del grupo.`,
          mentions: [userJid],
        }, { quoted: m });
      }

      if (status === 403 || result?.error === '403') {
        const invite = await conn.groupInviteCode(m.key.remoteJid);
        await conn.sendMessage(userJid, {
          text: `👋 *¡Hola!* Te enviaron una invitación para unirte al grupo:\n\n🔗 https://chat.whatsapp.com/${invite}\n\n_Pulsa el enlace para unirte._`,
        });

        return conn.sendMessage(m.key.remoteJid, {
          text: `🚫 *No se pudo agregar directamente a @${number}.*\n✉️ Se le ha enviado una *invitación privada* para unirse al grupo.`,
          mentions: [userJid],
        }, { quoted: m });
      }

      return conn.sendMessage(m.key.remoteJid, {
        text: `❌ *No se pudo agregar al usuario.*\nCódigo de error: ${status}`,
      }, { quoted: m });

    } catch (err) {
      console.error('[❌ ERROR AL AGREGAR]:', err);
      return conn.sendMessage(m.key.remoteJid, {
        text: '❌ *Ocurrió un error inesperado al intentar agregar al usuario.*',
      }, { quoted: m });
    }
  }
};