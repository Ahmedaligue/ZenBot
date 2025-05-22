export default {
  command: ['add', 'agregar', 'añadir'],
  help: ['*Ⓐɢʀᴇɢᴀʀ <ɴᴜ́ᴍᴇʀᴏ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, metadata, isBotAdmin, isAdmin, prefix, command }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }
    
    if (!isAdmin) {
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }
    
    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) {
      return m.tutorial(`*[ ⚠️ ] ᴅᴇʙᴇs ᴇsᴄʀɪʙɪʀ ᴜɴ ɴᴜ́ᴍᴇʀᴏ ᴠᴀ́ʟɪᴅᴏ ᴘᴀʀᴀ ᴀɢʀᴇɢᴀʀ.* (ᴇᴊ: *${prefix + command}* _1123456789_`);
    }

    const userJid = `${number}@s.whatsapp.net`;

    try {
      const res = await conn.groupParticipantsUpdate(m.key.remoteJid, [userJid], 'add');
      const result = res[0];
      const status = result?.status;

      if (status === 200 || status === '200') {
        return m.reply(`*[ ✅ ] ¡ᴜsᴜᴀʀɪᴏ ᴀɢʀᴇɢᴀᴅᴏ ᴄᴏɴ ᴇ́xɪᴛᴏ!*\n\n@${number} ᴀʜᴏʀᴀ ғᴏʀᴍᴀ ᴘᴀʀᴛᴇ ᴅᴇʟ ɢʀᴜᴘᴏ.`, { mentions: [userJid] });
      }

      if (status === 403 || result?.error === '403') {
        const invite = await conn.groupInviteCode(m.key.remoteJid);
        await conn.sendMessage(userJid, {
          text: `👋 *¡ʜᴏʟᴀ!* ᴛᴇ ᴇɴᴠɪᴀʀᴏɴ ᴜɴᴀ ɪɴᴠɪᴛᴀᴄɪᴏ́ɴ ᴘᴀʀᴀ ᴜɴɪʀᴛᴇ ᴀʟ ɢʀᴜᴘᴏ:\n\n🔗 https://chat.whatsapp.com/${invite}\n\n_ᴘᴜʟsᴀ ᴇʟ ᴇɴʟᴀᴄᴇ ᴘᴀʀᴀ ᴜɴɪʀᴛᴇ._`,
        });

        return m.reply(`[ 🚫 ] *ɴᴏ sᴇ ᴘᴜᴅᴏ ᴀɢʀᴇɢᴀʀ ᴅɪʀᴇᴄᴛᴀᴍᴇɴᴛᴇ ᴀ @${number}.*\n✉️ sᴇ ʟᴇ ʜᴀ ᴇɴᴠɪᴀᴅᴏ ᴜɴᴀ *ɪɴᴠɪᴛᴀᴄɪᴏ́ɴ ᴘʀɪᴠᴀᴅᴀ* ᴘᴀʀᴀ ᴜɴɪʀsᴇ ᴀʟ ɢʀᴜᴘᴏ.`, { mentions: [userJid] });
      }

      return m.reply(`[ ❌ ] *ɴᴏ sᴇ ᴘᴜᴅᴏ ᴀɢʀᴇɢᴀʀ ᴀʟ ᴜsᴜᴀʀɪᴏ..*\nᴄᴏ́ᴅɪɢᴏ ᴅᴇ ᴇʀʀᴏʀ: ${status}`);

    } catch (err) {
      console.error('Error:', err);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};