export default {
  command: ['listplugins'],
  help: ['Muestra una lista de todos los plugins cargados.'],
  tags: ['🤖 ADMIN'],

  run: async (m, { conn, isOwner, plugins }) => {
    if (!isOwner) {
      return await conn.sendMessage(m.key.remoteJid, {
        text: '🚫 Este comando solo puede ser usado por el creador del bot.'
      });
    }

    if (!plugins || plugins.length === 0) {
      return await conn.sendMessage(m.key.remoteJid, {
        text: '❌ No hay plugins cargados en este momento.'
      });
    }

    let pluginList = '📂 *Lista de plugins cargados:*\n\n';
    plugins.forEach((plugin, i) => {
      pluginList += `🔹 ${plugin.file || 'plugin sin nombre'}\n`;
    });

    await conn.sendMessage(m.key.remoteJid, { text: pluginList });
  }
};