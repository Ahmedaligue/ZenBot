export default {
  command: ['setdesc', 'cambiardescripcion'],
  help: ['*Ⓢᴇᴛᴅᴇsᴄ <ᴛᴇxᴛᴏ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix, command }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    const nuevaDesc = args.join(' ').trim();
    if (!nuevaDesc)
      return m.tutorial(`*[ 📍 ] ᴇʟ ᴜsᴏ ᴄᴏʀʀᴇᴄᴛᴏ ᴇs ᴀsɪ́:* (ᴇᴊ: *${prefix + command}* _Texto_`);

    await conn.groupUpdateDescription(id, nuevaDesc);
    return m.reply(`*[ ✅ ] ʟᴀ ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ ᴅᴇʟ ɢʀᴜᴘᴏ ʜᴀ sɪᴅᴏ ᴄᴀᴍʙɪᴀᴅᴀ ᴀ:*\n\n*${nuevaDesc}*`);
  }
};