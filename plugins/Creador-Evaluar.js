import { VM } from 'vm2';

export default {
  command: ['>'],
  help: ['> (𝙴𝚇𝙿𝚁𝙴𝚂𝙸𝙾́𝙽)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { text, isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');
    if (!text) return m.reply('*¿𝐐𝐮𝐞́ 𝐪𝐮𝐞𝐫𝐞́𝐬 𝐞𝐯𝐚𝐥𝐮𝐚𝐫?*');

    const vm = new VM({
      timeout: 1000,
      sandbox: {}
    });

    try {
      const result = vm.run(text);
      m.reply(`✅ *𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨:*\n${result}`);
    } catch (error) {
      m.reply(`❌ *𝐄𝐫𝐫𝐨𝐫:*\n${error.message}`);
    }
  }
};