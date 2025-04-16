export default {
  help: ['𝙴𝙻𝙸𝙼𝙽𝙰𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['ban', 'kick', 'eliminar', 'borrar'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, botNumber, owner, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] *𝐓𝐞𝐧𝐞́𝐬 𝐪𝐮𝐞 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐚𝐥𝐠𝐮𝐢𝐞𝐧 𝐩𝐚𝐫𝐚 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫𝐥𝐨.*');

    if (target === botNumber)
      return m.reply('𝐄𝐲, 𝐧𝐨 𝐩𝐮𝐞𝐝𝐨 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫𝐦𝐞 𝐚 𝐦𝐢́ 𝐦𝐢𝐬𝐦𝐨, 𝐧𝐨 𝐬𝐞𝐚𝐬 𝐦𝐚𝐥𝐨. 😐😑');

    if (target === owner)
      return m.reply('[ ❌ ] *𝐍𝐨 𝐩𝐮𝐞𝐝𝐨 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫 𝐚𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨. ¡𝐄𝐬𝐞 𝐭𝐢𝐞𝐧𝐞 𝐜𝐨𝐫𝐨𝐧𝐚!* 🙊');

    try {
      await conn.groupParticipantsUpdate(groupId, [target], 'remove');
      return m.reply(`👢 𝘾𝙝𝙖𝙪, 𝙘𝙝𝙖𝙪 *@${target.split('@')[0]}*...`, { mentions: [target] });
    } catch (e) {
      console.error('❌ Error al intentar eliminar:', e);
      return m.reply('[ ⚠️ ] *𝐍𝐨 𝐩𝐮𝐝𝐞 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫 𝐚𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨..*');
    }
  }
};