export default {
  help: ['𝚁𝙴𝚂𝚃𝙰𝙱𝙻𝙴𝙲𝙴𝚁'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['revoke', 'resetlink', 'restablecer'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return conn.sendMessage(groupId, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: m });
    }

    if (!isAdmin) {
      return conn.sendMessage(groupId, { text: '❗ Solo los administradores pueden usar este comando.' }, { quoted: m });
    }

    if (!isBotAdmin) {
      return conn.sendMessage(groupId, { text: '❗ El bot necesita ser administrador para ejecutar este comando.' }, { quoted: m });
    }

    try {
      const code = await conn.groupRevokeInvite(groupId);
      return conn.sendMessage(groupId, {
        text: `✅ Link del grupo restablecido:\nhttps://chat.whatsapp.com/${code}`
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Error al restablecer link:', error);
      return conn.sendMessage(groupId, {
        text: '❌ Ocurrió un error al intentar restablecer el enlace del grupo.'
      }, { quoted: m });
    }
  }
};