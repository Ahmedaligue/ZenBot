export default {
  command: ['despromover', 'despromote'],
  help: ['*Ⓓᴇsᴘʀᴏᴍᴏᴠᴇʀ <ᴍᴇɴᴄɪᴏɴᴀʀ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, sender, isGroup, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }
    
    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata.participants;

    const senderId = sender.endsWith('@s.whatsapp.net') ? sender : sender + '@s.whatsapp.net';
    const isAdmin = participants.find(p => p.id === senderId)?.admin;

    const targetJid =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!targetJid) {
      return m.reply('*[ ⚠️ ] ¡ᴀsᴇɢᴜ́ʀᴀᴛᴇ ᴅᴇ ᴍᴇɴᴄɪᴏɴᴀʀ ᴏ ʀᴇsᴘᴏɴᴅᴇʀ ᴀ ᴀʟɢᴜɪᴇɴ ᴘᴀʀᴀ ᴅᴇsᴘʀᴏᴍᴏᴠᴇʀʟᴏ!*');
    }

    try {
      await conn.groupParticipantsUpdate(groupId, [targetJid], 'demote');
      return conn.sendMessage(groupId, {
        text: `*[ ⚠️ ] @${targetJid.split('@')[0]} ʏᴀ ɴᴏ ᴇs ᴀᴅᴍɪɴ.*`,
        mentions: [targetJid]
      }, { quoted: m });
    } catch (error) {
      console.error('Error:', error);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};