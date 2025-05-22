export default {
  command: ['hidetag', 'mensaje', 'comunicar'],
  help: ['*Ⓗɪᴅᴇᴛᴀɢ <ᴍᴇɴsᴀᴊᴇ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata?.participants?.map(p => p.id) || [];

    if (participants.length === 0)
      return m.reply('*[ ❗ ] ɴᴏ ʜᴀʏ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛᴇs ᴇɴ ᴇʟ ɢʀᴜᴘᴏ ᴘᴀʀᴀ ᴇᴛɪϙᴜᴇᴛᴀʀ.*');

    const texto = args.join(' ') || '🕵️‍♂️';

    await conn.sendMessage(groupId, {
      text: texto,
      mentions: participants
    }, { quoted: m });
  }
};