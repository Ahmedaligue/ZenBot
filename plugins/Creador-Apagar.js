export default {
  command: ['apagar', 'apagarbot'],
  help: ['𝙰𝙿𝙰𝙶𝙰𝚁𝙱𝙾𝚃'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],
  owner: true,
  run: async (m, { isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');

    await m.reply('⏹️ *𝘉𝘰𝘵 𝘢𝘱𝘢𝘨𝘢𝘥𝘰 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦.*');
    process.exit(0);
  }
};