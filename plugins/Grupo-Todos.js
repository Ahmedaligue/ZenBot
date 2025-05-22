export default {
  command: ['tagall', 'todos', 'invocar'],
  help: ['*Ⓣᴏᴅᴏs*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, text, isGroup, isAdmin, isBotAdmin, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    const mentions = metadata.participants.map(p => p.id);
    const mensajeEtiquetas = mentions.map(jid => `➤ @${jid.split('@')[0]}`).join('\n');
    const mensajeTexto = text ? `*💬 ᴍᴇɴsᴀᴊᴇ:* ${text}\n\n` : '';

    await conn.sendMessage(groupId, {
      text: `📢 *ɪɴᴠᴏᴄᴀɴᴅᴏ ᴀ ${mentions.length} ɪɴᴛᴇɢʀᴀɴᴛᴇs...*\n\n${mensajeTexto}${mensajeEtiquetas}`,
      mentions
    }, { quoted: m });
  }
};