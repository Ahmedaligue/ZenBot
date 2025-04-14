import fs from 'fs';
import path from 'path';

export default {
  command: ['delplugin'],
  help: ['delplugin <archivo.js>'],
  tags: ['owner'],
  owner: true,
  run: async (m, { conn, args, isOwner }) => {
    if (!isOwner) return;

    if (!args[0]) {
      return await conn.sendMessage(m.key.remoteJid, { text: '❌ Especificá el nombre del plugin a eliminar. Ej: delplugin prueba.js' }, { quoted: m });
    }

    const pluginName = args[0].endsWith('.js') ? args[0] : `${args[0]}.js`;
    const filePath = path.join('./plugins', pluginName);

    if (!fs.existsSync(filePath)) {
      return await conn.sendMessage(m.key.remoteJid, { text: `❌ El plugin "${pluginName}" no existe.` }, { quoted: m });
    }

    try {
      fs.unlinkSync(filePath);
      await conn.sendMessage(m.key.remoteJid, { text: `✅ Plugin "${pluginName}" eliminado.\nRecargando...` }, { quoted: m });

      // Recarga los plugins después de un delay
      setTimeout(async () => {
        const { loadPlugins } = await import('../lib/handler.js');
        await loadPlugins();
      }, 500);

    } catch (e) {
      console.error(e);
      await conn.sendMessage(m.key.remoteJid, { text: '❌ Error al eliminar el plugin.' }, { quoted: m });
    }
  }
};