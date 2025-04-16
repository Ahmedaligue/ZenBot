import fs from 'fs';
import path from 'path';

export default {
  command: ['getplugin', 'buscarplugin'],
  help: ['𝙶𝙴𝚃𝙿𝙻𝚄𝙶𝙸𝙽 <𝙽𝙾𝙼𝙱𝚁𝙴>.𝙹𝚂'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { conn, args, isOwner, prefix }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');

    const pluginName = args[0];
    if (!pluginName || !pluginName.endsWith('.js')) {
      return m.reply(`[ ❌ ] *𝐄𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚́ 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐥 𝐩𝐥𝐮𝐠𝐢𝐧, 𝐞𝐣: ${prefix}getplugin prueba.js*`);
    }

    const pluginPath = path.join('./plugins', pluginName);
    if (!fs.existsSync(pluginPath)) {
      return m.reply(`[ ❌ ] *𝐄𝐥 𝐩𝐥𝐮𝐠𝐢𝐧 ${pluginName} 𝐧𝐨 𝐞𝐱𝐢𝐬𝐭𝐞.*`);
    }

    const buffer = fs.readFileSync(pluginPath);
    await conn.sendMessage(m.key.remoteJid, {
      document: buffer,
      fileName: pluginName,
      mimetype: 'application/javascript'
    }, { quoted: m });
  }
};