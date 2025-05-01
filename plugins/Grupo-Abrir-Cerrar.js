export default {
  help: ['𝙶𝚁𝚄𝙿𝙾 𝙰𝙱𝚁𝙸𝚁/𝙲𝙴𝚁𝚁𝙰𝚁'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['grupo', 'group'],

  run: async (m, { conn, args, isGroup, sender, isAdmin, isBotAdmin, prefix }) => {
    const id = m.key.remoteJid;

    if (!isGroup) {
      return await m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    if (!isAdmin) {
      return await m.reply('*[ ❗ ] 𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    if (!isBotAdmin) {
      return await m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    const accion = args[0]?.toLowerCase();
    if (!accion || !['abrir', 'cerrar'].includes(accion)) {
      return await m.reply(`*✳️ 𝐔𝐬𝐚 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐚𝐬𝐢́:*\n\n• ${prefix}grupo abrir\n• ${prefix}grupo cerrar`);
    }

    const groupMetadata = await conn.groupMetadata(id);
    const isClosed = groupMetadata.announce;

    if (accion === 'cerrar' && isClosed) {
      return await m.reply('*[ ⚠️ ] 𝐄𝐥 𝐠𝐫𝐮𝐩𝐨 𝐲𝐚 𝐞𝐬𝐭𝐚́ 𝐜𝐞𝐫𝐫𝐚𝐝𝐨.*');
    }

    if (accion === 'abrir' && !isClosed) {
      return await m.reply('*[ ⚠️ ] 𝐄𝐥 𝐠𝐫𝐮𝐩𝐨 𝐲𝐚 𝐞𝐬𝐭𝐚́ 𝐚𝐛𝐢𝐞𝐫𝐭𝐨.*');
    }

    await conn.groupSettingUpdate(id, accion === 'abrir' ? 'not_announcement' : 'announcement');
    await m.reply(`*[ ✅ ] 𝐆𝐫𝐮𝐩𝐨 ${accion === 'abrir' ? '𝐚𝐛𝐢𝐞𝐫𝐭𝐨' : '𝐜𝐞𝐫𝐫𝐚𝐝𝐨'} 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞.*`);
  }
};