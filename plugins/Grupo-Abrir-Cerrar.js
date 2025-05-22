export default {
  command: ['grupo', 'group'],
  help: ['*Ⓖʀᴜᴘᴏ <ᴀʙʀɪʀ/ᴄᴇʀʀᴀʀ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, sender, isAdmin, isBotAdmin, prefix, command }) => {
    const id = m.key.remoteJid;

    if (!isGroup) {
      return await m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    if (!isAdmin) {
      return await m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    if (!isBotAdmin) {
      return await m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    const accion = args[0]?.toLowerCase();
    if (!accion || !['abrir', 'cerrar'].includes(accion)) {
      return m.tutorial(`*[ 📍 ] ᴇʟ ᴜsᴏ ᴄᴏʀʀᴇᴄᴛᴏ ᴇs ᴀsɪ́:* (ᴇᴊ: *${prefix + command}* _abrir/cerrar_`);
    }

    const groupMetadata = await conn.groupMetadata(id);
    const isClosed = groupMetadata.announce;

    if (accion === 'cerrar' && isClosed) {
      return await m.reply('*[ ⚠️ ] ᴇʟ ɢʀᴜᴘᴏ ʏᴀ ᴇsᴛᴀ́ ᴄᴇʀʀᴀᴅᴏ.*');
    }

    if (accion === 'abrir' && !isClosed) {
      return await m.reply('*[ ⚠️ ] ᴇʟ ɢʀᴜᴘᴏ ʏᴀ ᴇsᴛᴀ́ ᴀʙɪᴇʀᴛᴏ.*');
    }

    await conn.groupSettingUpdate(id, accion === 'abrir' ? 'not_announcement' : 'announcement');
    await m.reply(`*[ ✅ ] ɢʀᴜᴘᴏ ${accion === 'abrir' ? 'ᴀʙɪᴇʀᴛᴏ' : 'ᴄᴇʀʀᴀᴅᴏ'} ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ.**`);
  }
};