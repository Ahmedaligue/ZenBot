import util from 'util';

export default {
  command: ['=>'],
  help: ['=> (𝙲𝙾́𝙳𝙸𝙶𝙾 𝙰𝚂𝚈𝙽𝙲)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { text, conn, isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');
    if (!text) return m.reply('*¿𝐐𝐮𝐞́ 𝐪𝐮𝐞𝐫𝐞́𝐬 𝐞𝐯𝐚𝐥𝐮𝐚𝐫?*');
    try {
      let evaled = await (async () => eval(text))();
      if (typeof evaled !== 'string') evaled = util.inspect(evaled);
      m.reply(evaled);
    } catch (err) {
      m.reply('❌ *𝐄𝐫𝐫𝐨𝐫:*\n' + err);
    }
  }
};