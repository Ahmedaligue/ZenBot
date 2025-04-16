export default {
  help: ['𝙲𝙰𝙼𝙱𝙸𝙰𝚁𝙽𝙾𝙼𝙱𝚁𝙴 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['setname', 'cambiarnombre'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const nuevoNombre = args.join(' ').trim();
    if (!nuevoNombre)
      return m.reply(`*✳️ 𝐔𝐬𝐚 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐚𝐬𝐢́:*\n\n• \`${prefix}setname (Nuevo nombre del grupo)\``);

    await conn.groupUpdateSubject(id, nuevoNombre);
    return m.reply(`[ ✅ ] 𝐄𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐜𝐚𝐦𝐛𝐢𝐚𝐝𝐨 𝐚: *${nuevoNombre}*`);
  }
};