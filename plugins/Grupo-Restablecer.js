export default {
  help: ['𝚁𝙴𝚂𝙴𝚃𝙰𝙱𝙻𝙴𝙲𝙴𝚁'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['revoke', 'resetlink', 'restablecer'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');
    }

    try {
      const code = await conn.groupRevokeInvite(groupId);
      return conn.sendMessage(groupId, {
        text: `✅ LINK DEL GRUPO RESTABLECIDO:\nhttps://chat.whatsapp.com/${code}`
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Error al restablecer el link:', error);
      return m.reply('[ ❌ ] Ocurrió un error al intentar restablecer el enlace del grupo.');
    }
  }
};