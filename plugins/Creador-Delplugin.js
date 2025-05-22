import fs from 'fs';
import path from 'path';

export default {
  command: ['delplugin', 'borrarplugin', 'eliminarplugin', 'bp'],
  help: ['*Ⓓᴇʟᴘʟᴜɢɪɴ <ᴀʀᴄʜɪᴠᴏ.ᴊs>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { conn, args, isOwner, prefix, command }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');

    if (!args[0]) {
      return m.reply(`*[ ❌ ] ᴇsᴘᴇᴄɪғɪᴄᴀ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇʟ ᴘʟᴜɢɪɴ ᴀ ᴇʟɪᴍɪɴᴀʀ. (ᴇᴊ: *${prefix + command}* prueba.js*)`);
    }

    const pluginName = args[0].endsWith('.js') ? args[0] : `${args[0]}.js`;
    const filePath = path.join('./plugins', pluginName);

    if (!fs.existsSync(filePath)) {
      return m.reply(`*[ ❌ ] ᴇʟ ᴘʟᴜɢɪɴ "${pluginName}" ɴᴏ ᴇxɪsᴛᴇ.*`);
    }

    try {
      fs.unlinkSync(filePath);
      await m.reply(`[ ✅ ] *ᴘʟᴜɢɪɴ "${pluginName}" ᴇʟɪᴍɪɴᴀᴅᴏ.*\n*ʀᴇᴄᴀʀɢᴀɴᴅᴏ...*`);

      setTimeout(async () => {
        const { loadPlugins } = await import('../lib/handler.js');
        await loadPlugins();
      }, 500);

    } catch (e) {
      console.error(e);
      await m.reply('[ ❌ ] *ᴇʀʀᴏʀ ᴀʟ ᴇʟɪᴍɪɴᴀʀ ᴇʟ ᴘʟᴜɢɪɴ.*');
    }
  }
};