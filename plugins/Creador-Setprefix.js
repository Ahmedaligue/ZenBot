import { config } from '../config.js';

export default {
  command: ['cambiarprefijo', 'setprefix'],
  help: ['𝚂𝙴𝚃𝙿𝚁𝙴𝙵𝙸𝚇 <𝙽𝚄𝙴𝙾_𝙿𝚁𝙴𝙵𝙸𝙹𝙾>'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { conn, args, isOwner }) => {
    if (!isOwner) {
      await m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');
      return;
    }

    if (args.length === 0) {
      await m.reply('[ ❌ ] *𝐏𝐨𝐫 𝐟𝐚𝐯𝐨𝐫, 𝐢𝐧𝐠𝐫𝐞𝐬𝐚 𝐞𝐥 𝐧𝐮𝐞𝐯𝐨 𝐩𝐫𝐞𝐟𝐢𝐣𝐨.*');
      return;
    }

    const nuevoPrefijo = args[0];

    if (nuevoPrefijo.trim() === '') {
      await m.reply('[ ❌ ] *𝐄𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨 𝐧𝐨 𝐩𝐮𝐞𝐝𝐞 𝐞𝐬𝐭𝐚𝐫 𝐯𝐚𝐜𝐢́𝐨.*');
      return;
    }

    config.prefix = nuevoPrefijo;

    await m.reply(`[ ✅ ] *𝐄𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐜𝐚𝐦𝐛𝐢𝐚𝐝𝐨 𝐚: ${nuevoPrefijo}*`);
    console.log(`El prefijo ha sido cambiado a: ${nuevoPrefijo}`);
  }
};