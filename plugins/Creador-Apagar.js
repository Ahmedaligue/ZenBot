export default {
  command: ['apagar', 'apagarbot'],
  help: ['*Ⓐᴘᴀɢᴀʀʙᴏᴛ*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { isOwner }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');

    await m.reply('⏹️ *ʙᴏᴛ ᴀᴘᴀɢᴀᴅᴏ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ.*');
    process.exit(0);
  }
};