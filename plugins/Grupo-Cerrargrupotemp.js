export default {
  command: ['cerrargrupo', 'closegroup'],
  help: ['*Ⓒᴇʀʀᴀʀɢʀᴜᴘᴏ <1s, 1ᴍ, 1ʜ, 1ᴅ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix, command }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    const timeArg = args[0];
    if (!timeArg || !/^\d+(s|m|h|d)$/.test(timeArg))
      return m.tutorial(`*[ 📍 ] ᴇʟ ᴜsᴏ ᴄᴏʀʀᴇᴄᴛᴏ ᴇs ᴀsɪ́:* (ᴇᴊ: *${prefix + command}* _10s, 5m, 1h, 1d_`);

    const timeValue = parseInt(timeArg);
    const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[timeArg.slice(-1)];
    const duration = timeValue * unit;

    await conn.groupSettingUpdate(id, 'announcement');
    await m.reply(`*[ 🔒 ] ᴇʟ ɢʀᴜᴘᴏ ʜᴀ sɪᴅᴏ ᴄᴇʀʀᴀᴅᴏ ᴅᴜʀᴀɴᴛᴇ ${timeArg}.*`);

    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(id, 'not_announcement');
        await m.reply('*[ ⏱️ ] ᴇʟ ɢʀᴜᴘᴏ ʜᴀ sɪᴅᴏ ʀᴇᴀʙɪᴇʀᴛᴏ.*');
      } catch (e) {
        console.error('Error:', e);
        await m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
      }
    }, duration);
  }
};