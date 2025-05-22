export default {
  command: ['infogrupo', 'infogroup'],
  help: ['*Ⓘɴғᴏɢʀᴜᴘᴏ*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],
  
  async run(m, { conn, sender, isGroup }) {
    if (!isGroup) return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');

    const groupId = m.key.remoteJid;
    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin);
    const ownerId = groupMetadata.owner;

    const creationDate = new Date(groupMetadata.creation * 1000);
    const fechaFormateada = creationDate.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const texto = `
╭━━━〔 *📌 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎* 〕━━━╮
┃ 🏷️ *ɴᴏᴍʙʀᴇ:* ${groupMetadata.subject}
┃ ✍️ *ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ:* ${groupMetadata.desc?.split('\n')[0] || 'sɪɴ ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ'}
┃ 📆 *ᴄʀᴇᴀᴅᴏ ᴇʟ:* ${fechaFormateada}
┃ 👤 *ᴄʀᴇᴀᴅᴏʀ:* ${ownerId ? `@${ownerId.split('@')[0]}` : 'ᴅᴇsᴄᴏɴᴏᴄɪᴅᴏ'}
┃ 👥 *ᴍɪᴇᴍʙʀᴏs:* ${participants.length}
┃ 🛡️ *ᴀᴅᴍɪɴs:* ${admins.length}
┃ 🆔 *ɪᴅ:* ${groupMetadata.id}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

    const menciones = ownerId ? [ownerId, ...admins.map(a => a.id)] : admins.map(a => a.id);

    return m.reply(texto.trim(), { mentions: menciones });
  }
};