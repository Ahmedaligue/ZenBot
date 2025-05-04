export default {
  help: ['𝙲𝙰𝙼𝙱𝙸𝙰𝚁𝙽𝙾𝙼𝙱𝚁𝙴 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['setname', 'cambiarnombre'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const nuevoNombre = args.join(' ').trim();
    if (!nuevoNombre)
      return m.reply(`*✳️ Usa el comando así:*\n\n• \`${prefix}setname (Nuevo nombre del grupo)\``);

    await conn.groupUpdateSubject(id, nuevoNombre);
    return m.reply(`[ ✅ ] El nombre del grupo ha sido cambiado a: *${nuevoNombre}*`);
  }
};