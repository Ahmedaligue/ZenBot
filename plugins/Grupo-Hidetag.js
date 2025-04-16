export default {
  help: ['𝙷𝙸𝙳𝙴𝚃𝙰𝙶 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['hidetag', 'mensaje', 'comunicar'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata?.participants?.map(p => p.id) || [];

    if (participants.length === 0)
      return m.reply('[ ❗ ] *𝐍𝐨 𝐡𝐚𝐲 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐞𝐬 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐩𝐚𝐫𝐚 𝐞𝐭𝐢𝐪𝐮𝐞𝐭𝐚𝐫.*');

    const texto = args.join(' ') || '🕵️‍♂️';

    await conn.sendMessage(groupId, {
      text: texto,
      mentions: participants
    }, { quoted: m });
  }
};