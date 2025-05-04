import fs from 'fs';
import path from 'path';

export default {
  command: ['getplugin', 'buscarplugin'],
  help: ['𝙶𝙴𝚃𝙿𝙻𝚄𝙶𝙸𝙽 <𝙽𝙾𝙼𝙱𝚁𝙴>.𝙹𝚂'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { conn, args, isOwner, prefix }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');

    const pluginName = args[0];
    if (!pluginName || !pluginName.endsWith('.js')) {
      return m.reply(`[ ❌ ] *Especifica el nombre del plugin, ej: ${prefix}getplugin prueba.js*`);
    }

    const pluginPath = path.join('./plugins', pluginName);
    if (!fs.existsSync(pluginPath)) {
      return m.reply(`[ ❌ ] *El plugin ${pluginName} no existe.*`);
    }

    const buffer = fs.readFileSync(pluginPath);
    await conn.sendMessage(m.key.remoteJid, {
      document: buffer,
      fileName: pluginName,
      mimetype: 'application/javascript'
    }, { quoted: m });
  }
};