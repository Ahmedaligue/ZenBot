import fs from 'fs';
import path from 'path';

export default {
  command: ['getplugin', 'buscarplugin'],
  help: ['*Ⓖᴇᴛᴘʟᴜɢɪɴ <ɴᴏᴍʙʀᴇ.ᴊs>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { conn, args, isOwner, prefix, command }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');

    const pluginName = args[0];
    if (!pluginName || !pluginName.endsWith('.js')) {
      return m.reply(`*[ ❌ ] ᴇsᴘᴇᴄɪғɪᴄᴀ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇʟ ᴘʟᴜɢɪɴ.* (ᴇᴊ: *${prefix + command}* prueba.js)`);
    }

    const pluginPath = path.join('./plugins', pluginName);
    if (!fs.existsSync(pluginPath)) {
      return m.reply(`*[ ❌ ] ᴇʟ ᴘʟᴜɢɪɴ ${pluginName} ɴᴏ ᴇxɪsᴛᴇ.*`);
    }

    const buffer = fs.readFileSync(pluginPath);
    await conn.sendMessage(m.key.remoteJid, {
      document: buffer,
      fileName: pluginName,
      mimetype: 'application/javascript'
    }, { quoted: m });
  }
};