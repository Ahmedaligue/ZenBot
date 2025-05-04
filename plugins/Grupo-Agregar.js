export default {
  help: ['𝙰𝙶𝚁𝙴𝙶𝙰𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['add', 'agregar', 'añadir'],

  run: async (m, { conn, args, isGroup, metadata, botParticipant, prefix }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) {
      return m.reply(`[ ⚠️ ] *Debes escribir un número válido para agregar.*\n\n*Ej:* \`${prefix}add 1123456789\``);
    }

    if (!botParticipant?.admin) {
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');
    }

    const userJid = `${number}@s.whatsapp.net`;

    try {
      const res = await conn.groupParticipantsUpdate(m.key.remoteJid, [userJid], 'add');
      const result = res[0];
      const status = result?.status;

      if (status === 200 || status === '200') {
        return m.reply(`[ ✅ ]*¡Usuario agregado con éxito!*\n\n@${number} ahora forma parte del grupo.`, { mentions: [userJid] });
      }

      if (status === 403 || result?.error === '403') {
        const invite = await conn.groupInviteCode(m.key.remoteJid);
        await conn.sendMessage(userJid, {
          text: `👋 *¡Hola!* Te enviaron una invitación para unirte al grupo:\n\n🔗 https://chat.whatsapp.com/${invite}\n\n_Pulsa el enlace para unirte._`,
        });

        return m.reply(`[ 🚫 ] *No se pudo agregar directamente a @${number}.*\n✉️ Se le ha enviado una *invitación privada* para unirse al grupo.`, { mentions: [userJid] });
      }

      return m.reply(`[ ❌ ] *No se pudo agregar al usuario..*\nCódigo de error: ${status}`);

    } catch (err) {
      console.error('[❌ ERROR AL AGREGAR]:', err);
      return m.reply('[ ❌ ]*Ocurrió un error inesperado al intentar agregar al usuario.*');
    }
  }
};