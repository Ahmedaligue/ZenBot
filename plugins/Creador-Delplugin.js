import fs from 'fs';
import path from 'path';

export default {
  command: ['delplugin', 'borrarplugin', 'eliminarplugin', 'bp'],
  help: ['𝙳𝙴𝙻𝙿𝙻𝚄𝙶𝙸𝙽 <𝙰𝚁𝙲𝙷𝙸𝚅𝙾.𝙹𝚂>'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],
  owner: true,
  run: async (m, { conn, args, isOwner, prefix }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');

    if (!args[0]) {
      return m.reply(`[ ❌ ] *Especifica el nombre del plugin a eliminar. Ej: ${prefix}delplugin prueba.js*`);
    }

    const pluginName = args[0].endsWith('.js') ? args[0] : `${args[0]}.js`;
    const filePath = path.join('./plugins', pluginName);

    if (!fs.existsSync(filePath)) {
      return m.reply(`*[ ❌ ] *El plugin "${pluginName}" no existe.*`);
    }

    try {
      fs.unlinkSync(filePath);
      await m.reply(`[ ✅ ] *Plugin "${pluginName}" eliminado.*\n*Recargando...*`);

      setTimeout(async () => {
        const { loadPlugins } = await import('../lib/handler.js');
        await loadPlugins();
      }, 500);

    } catch (e) {
      console.error(e);
      await m.reply('[ ❌ ] *Error al eliminar el plugin.*');
    }
  }
};