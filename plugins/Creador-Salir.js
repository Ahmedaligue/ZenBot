export default {
  command: ['salir', 'leave', 'salirgp', 'gpleave'],
  help: ['*Ⓢᴀʟɪʀ*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { isOwner, conn, chatId }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');

    if (typeof chatId !== 'string' || !chatId.endsWith('@g.us')) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ sᴇ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴅᴇɴᴛʀᴏ ᴅᴇ ᴜɴ ɢʀᴜᴘᴏ.*');
    }

    await m.reply('*[ 👋 ] sᴀʟɪᴇɴᴅᴏ ᴅᴇʟ ɢʀᴜᴘᴏ...*');
    await conn.groupLeave(chatId);
  }
};