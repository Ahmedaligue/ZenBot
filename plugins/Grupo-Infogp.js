export default {
  help: ['𝙸𝙽𝙵𝙾𝙶𝚁𝚄𝙿𝙾'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['infogrupo', 'infogroup'],
  async run(m, { conn, sender, isGroup }) {
    if (!isGroup) return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

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
╭━━━〔 *📌 𝕀ℕ𝔽𝕆ℝ𝕄𝔸ℂ𝕀𝕆́ℕ 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆* 〕━━━╮
┃ 🏷️ *ɴᴏᴍʙʀᴇ:* ${groupMetadata.subject}
┃ ✍️ *ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ:* ${groupMetadata.desc?.split('\n')[0] || 'sɪɴ ᴅᴇsᴄʀɪᴘᴄɪᴏ́ɴ'}
┃ 📆 *ᴄʀᴇᴀᴅᴏ ᴇʟ:* ${fechaFormateada}
┃ 👤 *ᴄʀᴇᴀᴅᴏʀ:* ${ownerId ? `@${ownerId.split('@')[0]}` : 'ᴅᴇsᴄᴏɴᴏᴄɪᴅᴏ'}
┃ 👥 *ᴍɪᴇᴍʙʀᴏs:* ${participants.length}
┃ 🛡️ *ᴀᴅᴍɪɴs:* ${admins.length}
┃ 🆔 *ID:* ${groupMetadata.id}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

    const menciones = ownerId ? [ownerId, ...admins.map(a => a.id)] : admins.map(a => a.id);

    return m.reply(texto.trim(), { mentions: menciones });
  }
};