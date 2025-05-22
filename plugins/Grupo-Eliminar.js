export default {
  command: ['ban', 'kick', 'eliminar', 'borrar'],
  help: ['*Ⓔʟɪᴍɪɴᴀʀ <ᴍᴇɴᴄɪᴏɴᴀʀ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, botNumber, owner, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('*[ ⚠️ ] ɴᴇᴄᴇsɪᴛᴀs ᴍᴇɴᴄɪᴏɴᴀʀ ᴏ ʀᴇsᴘᴏɴᴅᴇʀ ᴀ ᴀʟɢᴜɪᴇɴ ᴘᴀʀᴀ ᴇʟɪᴍɪɴᴀʀʟᴏ.*');

    if (target === botNumber)
      return m.reply('ᴇʏ, ɴᴏ ᴘᴜᴇᴅᴏ ᴇʟɪᴍɪɴᴀʀᴍᴇ ᴀ ᴍɪ́ ᴍɪsᴍᴏ, ɴᴏ sᴇᴀs ᴍᴀʟᴏ. 😐😑');

    if (target === owner)
      return m.reply('*[ ❌ ] ɴᴏ ᴘᴜᴇᴅᴏ ᴇʟɪᴍɪɴᴀʀ ᴀʟ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ ɢʀᴜᴘᴏ. ¡ᴇ́ʟ ᴛɪᴇɴᴇ ᴄᴏʀᴏɴᴀ!* 🙊');

    try {
      await conn.groupParticipantsUpdate(groupId, [target], 'remove');
      return m.reply(`*👢 ᴀᴅɪᴏ́s, ᴀᴅɪᴏ́s* *@${target.split('@')[0]}*...`, { mentions: [target] });
    } catch (e) {
      console.error('Error:', e);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};