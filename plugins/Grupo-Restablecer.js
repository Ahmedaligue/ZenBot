export default {
  command: ['revoke', 'resetlink', 'restablecer'],
  help: ['*Ⓡᴇᴠᴏᴋᴇ*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    try {
      const code = await conn.groupRevokeInvite(groupId);
      return conn.sendMessage(groupId, {
        text: `[ ✅ ] 𝐋𝐈𝐍𝐊 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 𝐑𝐄𝐒𝐓𝐀𝐁𝐋𝐄𝐂𝐈𝐃𝐎:\nhttps://chat.whatsapp.com/${code}`
      }, { quoted: m });
    } catch (error) {
      console.error('Error:', error);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};