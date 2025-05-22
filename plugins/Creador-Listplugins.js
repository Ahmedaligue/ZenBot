export default {
  command: ['listplugins', 'listaplugins', 'plugins'],
  help: ['*Ⓛɪsᴛᴘʟᴜɢɪɴs*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { conn, isOwner, plugins }) => {
    if (!isOwner) {
      return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');
    }

    if (!plugins || plugins.length === 0) {
      return m.reply('*[ ❌ ] ɴᴏ ʜᴀʏ ᴘʟᴜɢɪɴs ᴄᴀʀɢᴀᴅᴏs ᴇɴ ᴇsᴛᴇ ᴍᴏᴍᴇɴᴛᴏ.*');
    }

    let pluginList = '📂 *ʟɪsᴛᴀ ᴅᴇ ᴘʟᴜɢɪɴs ᴄᴀʀɢᴀᴅᴏs:*\n\n';
    plugins.forEach((plugin, i) => {
      pluginList += `🔹 ${plugin.file || 'ᴘʟᴜɢɪɴ sɪɴ ɴᴏᴍʙʀᴇ'}\n`;
    });

    await conn.sendMessage(m.key.remoteJid, { text: pluginList });
  }
};