export default {
  help: ['𝙳𝙴𝚂𝙿𝚁𝙾𝙼𝙾𝚅𝙴𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['despromover', 'despromote'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const groupMetadata = await conn.groupMetadata(id);
    const owner = groupMetadata.owner;

    let target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] *𝐓𝐞𝐧𝐞́𝐬 𝐪𝐮𝐞 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐨 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐚𝐥𝐠𝐮𝐢𝐞𝐧 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐩𝐫𝐨𝐦𝐨𝐯𝐞𝐫𝐥𝐨 𝐝𝐞 𝐚𝐝𝐦𝐢𝐧.*');

    if (target === owner)
      return m.reply('[ ❌ ] 𝐍𝐨 𝐩𝐮𝐞𝐝𝐨 𝐝𝐞𝐬𝐩𝐫𝐨𝐦𝐨𝐯𝐞𝐫 𝐚𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨. ¡𝐄𝐬 𝐢𝐧𝐯𝐮𝐥𝐧𝐞𝐫𝐚𝐛𝐥𝐞!');

    try {
      await conn.groupParticipantsUpdate(id, [target], 'demote');
      return m.reply(`[ ⚠️ ] *@${target.split('@')[0]}* 𝐲𝐚 𝐧𝐨 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫. 😶`, { mentions: [target] });
    } catch (e) {
      console.error('❌ Error al intentar despromover:', e);
      return m.reply('[ ⚠️ ] *𝐍𝐨 𝐩𝐮𝐝𝐞 𝐝𝐞𝐬𝐩𝐫𝐨𝐦𝐨𝐯𝐞𝐫 𝐚𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨.*');
    }
  }
};