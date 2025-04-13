export default {
  help: ['𝙶𝚁𝚄𝙿𝙾 𝙰𝙱𝚁𝙸𝚁/𝙲𝙴𝚁𝚁𝙰𝚁'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['grupo', 'group'],

  run: async (m, { conn, args, isGroup, sender, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup) {
      return await conn.sendMessage(id, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: m });
    }

    if (!isAdmin) {
      return await conn.sendMessage(id, { text: '❗ Solo los administradores pueden usar este comando.' }, { quoted: m });
    }

    if (!isBotAdmin) {
      return await conn.sendMessage(id, { text: '❗ El bot necesita ser administrador para ejecutar este comando.' }, { quoted: m });
    }

    const accion = args[0]?.toLowerCase();
    if (!accion || !['abrir', 'cerrar'].includes(accion)) {
      return await conn.sendMessage(id, {
        text: '✳️ Usa el comando así:\n\n• .grupo abrir\n• .grupo cerrar'
      }, { quoted: m });
    }

    await conn.groupSettingUpdate(id, accion === 'abrir' ? 'not_announcement' : 'announcement');
    await conn.sendMessage(id, {
      text: `✅ Grupo ${accion === 'abrir' ? 'abierto' : 'cerrado'} correctamente.`
    }, { quoted: m });
  }
};