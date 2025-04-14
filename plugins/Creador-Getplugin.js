import fs from 'fs';
import path from 'path';

export default {
  command: ['getplugin'],
  help: ['getplugin <nombre>.js'],
  tags: ['owner'],
  owner: true,
  run: async (m, { conn, args, isOwner }) => {
    if (!isOwner) return;

    const pluginName = args[0];
    if (!pluginName || !pluginName.endsWith('.js')) {
      return await conn.sendMessage(m.key.remoteJid, { text: '❌ Especificá el nombre del plugin, ejemplo: getplugin prueba.js' }, { quoted: m });
    }

    const pluginPath = path.join('./plugins', pluginName);
    if (!fs.existsSync(pluginPath)) {
      return await conn.sendMessage(m.key.remoteJid, { text: `❌ El plugin ${pluginName} no existe.` }, { quoted: m });
    }

    const buffer = fs.readFileSync(pluginPath);
    await conn.sendMessage(m.key.remoteJid, {
      document: buffer,
      fileName: pluginName,
      mimetype: 'application/javascript'
    }, { quoted: m });
  }
};