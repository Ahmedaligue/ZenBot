export default {
  command: ['listplugins'],
  help: ['𝙻𝙸𝚂𝚃𝙿𝙻𝚄𝙶𝙸𝙽𝚂'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { conn, isOwner, plugins }) => {
    if (!isOwner) {
      return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');
    }

    if (!plugins || plugins.length === 0) {
      return m.reply('[ ❌ ] *No hay plugins cargados en este momento.*');
    }

    let pluginList = '📂 *Lista de Plugins Cargados:*\n\n';
    plugins.forEach((plugin, i) => {
      pluginList += `🔹 ${plugin.file || 'plugin sin nombre'}\n`;
    });

    await conn.sendMessage(m.key.remoteJid, { text: pluginList });
  }
};