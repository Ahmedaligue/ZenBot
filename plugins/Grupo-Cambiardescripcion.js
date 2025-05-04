export default {
  help: ['𝙲𝙰𝙼𝙱𝙸𝙰𝚁𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['setdesc', 'cambiardescripcion'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const nuevaDesc = args.join(' ').trim();
    if (!nuevaDesc)
      return m.reply(`*✳️ Usa el comando así:*\n\n• \`${prefix}setdesc ¡𝖹𝖾𝗇𝖡𝗈𝗍 𝖾𝗌 𝖾𝗅 𝗆𝖾𝗃𝗈𝗋!\``);

    await conn.groupUpdateDescription(id, nuevaDesc);
    return m.reply(`[ ✅ ] La descripción del grupo ha sido cambiada a:\n\n*${nuevaDesc}*`);
  }
};