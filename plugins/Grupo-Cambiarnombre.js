export default {
  help: ['𝙲𝙰𝙼𝙱𝙸𝙰𝚁𝙽𝙾𝙼𝙱𝚁𝙴 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['setname', 'cambiarnombre'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return conn.sendMessage(id, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(id, { text: '❗ Solo los administradores pueden usar este comando.' }, { quoted: m });

    if (!isBotAdmin)
      return conn.sendMessage(id, { text: '❗ El bot necesita ser administrador para cambiar el nombre.' }, { quoted: m });

    const nuevoNombre = args.join(' ').trim();
    if (!nuevoNombre)
      return conn.sendMessage(id, {
        text: '✳️ Usa el comando así:\n\n• .setname Nuevo nombre del grupo',
      }, { quoted: m });

    await conn.groupUpdateSubject(id, nuevoNombre);
    return conn.sendMessage(id, {
      text: `✅ El nombre del grupo ha sido cambiado a: *${nuevoNombre}*`,
    }, { quoted: m });
  }
};