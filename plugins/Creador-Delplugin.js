import fs from 'fs';
import path from 'path';

export default {
  command: ['delplugin', 'borrarplugin', 'eliminarplugin', 'bp'],
  help: ['𝙳𝙴𝙻𝙿𝙻𝚄𝙶𝙸𝙽 <𝙰𝚁𝙲𝙷𝙸𝚅𝙾.𝙹𝚂>'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],
  owner: true,
  run: async (m, { conn, args, isOwner, prefix }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');

    if (!args[0]) {
      return m.reply(`[ ❌ ] *𝐄𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚́ 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐥 𝐩𝐥𝐮𝐠𝐢𝐧 𝐚 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫. 𝐄𝐣: ${prefix}delplugin prueba.js*`);
    }

    const pluginName = args[0].endsWith('.js') ? args[0] : `${args[0]}.js`;
    const filePath = path.join('./plugins', pluginName);

    if (!fs.existsSync(filePath)) {
      return m.reply(`*[ ❌ ] *𝐄𝐥 𝐩𝐥𝐮𝐠𝐢𝐧 "${pluginName}" 𝐧𝐨 𝐞𝐱𝐢𝐬𝐭𝐞.*`);
    }

    try {
      fs.unlinkSync(filePath);
      await m.reply(`[ ✅ ] *𝐏𝐥𝐮𝐠𝐢𝐧 "${pluginName}" 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐝𝐨.*\n*𝘙𝘦𝘤𝘢𝘳𝘨𝘢𝘯𝘥𝘰...*`);

      setTimeout(async () => {
        const { loadPlugins } = await import('../lib/handler.js');
        await loadPlugins();
      }, 500);

    } catch (e) {
      console.error(e);
      await m.reply('[ ❌ ] *𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫 𝐞𝐥 𝐩𝐥𝐮𝐠𝐢𝐧.*');
    }
  }
};