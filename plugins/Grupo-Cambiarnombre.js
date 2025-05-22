export default {
  command: ['setname', 'cambiarnombre'],
  help: ['*Ⓢᴇᴛɴᴀᴍᴇ <ᴛᴇxᴛᴏ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix, command }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ*');

    const nuevoNombre = args.join(' ').trim();
    if (!nuevoNombre)
      return m.tutorial(`*[ 📍 ] ᴇʟ ᴜsᴏ ᴄᴏʀʀᴇᴄᴛᴏ ᴇs ᴀsɪ́:* (ᴇᴊ: *${prefix + command}* _Texto_`);

    await conn.groupUpdateSubject(id, nuevoNombre);
    return m.reply(`*[ ✅ ] ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇʟ ɢʀᴜᴘᴏ ʜᴀ sɪᴅᴏ ᴄᴀᴍʙɪᴀᴅᴏ ᴀ:* *${nuevoNombre}*`);
  }
};