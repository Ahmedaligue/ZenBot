import { config } from '../config.js';

export default {
  command: ['addowner', 'addcreador', 'adddueño', 'addpropietario'],
  help: ['𝙰𝙳𝙳𝙾𝚆𝙽𝙴𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { sender, args, saveOwner }) => {
    const number = args[0]?.replace(/[^0-9]/g, '');

    if (sender.split('@')[0] !== config.owner) {
      return m.reply('[ ⚠️ ] *𝐒𝐨𝐥𝐨 𝐞𝐥 𝐜𝐫𝐞𝐚𝐝𝐨𝐫 𝐩𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥 𝐩𝐮𝐞𝐝𝐞 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐨𝐰𝐧𝐞𝐫𝐬.*');
    }

    if (!number) {
      return m.reply('[ ⚠️ ] *𝐃𝐞𝐛𝐞𝐬 𝐢𝐧𝐠𝐫𝐞𝐬𝐚𝐫 𝐮𝐧 𝐧𝐮́𝐦𝐞𝐫𝐨 𝐯𝐚́𝐥𝐢𝐝𝐨.*');
    }

    if (typeof saveOwner !== 'function') {
      return m.reply('[ ❌ ] *𝐄𝐫𝐫𝐨𝐫 𝐢𝐧𝐭𝐞𝐫𝐧𝐨: 𝐬𝐚𝐯𝐞𝐎𝐰𝐧𝐞𝐫 𝐧𝐨 𝐞𝐬 𝐮𝐧𝐚 𝐟𝐮𝐧𝐜𝐢𝐨́𝐧.*');
    }

    saveOwner(number);
    m.reply(`[ ✅ ] *𝐄𝐥 𝐧𝐮́𝐦𝐞𝐫𝐨 ${number} 𝐚𝐡𝐨𝐫𝐚 𝐞𝐬 𝐮𝐧 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*`);
  }
};