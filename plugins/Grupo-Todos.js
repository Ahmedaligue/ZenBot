export default {
  help: ['𝚃𝙾𝙳𝙾𝚂'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['tagall', 'todos', 'invocar'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    const mentions = metadata.participants.map(p => p.id);
    const mensaje = mentions.map(jid => `➤ @${jid.split('@')[0]}`).join('\n');

    await conn.sendMessage(groupId, {
      text: `📢 *𝔼𝕋𝕀ℚ𝕌𝔼𝕋𝔸 𝔸 𝕋𝕆𝔻𝕆𝕊 𝕃𝕆𝕊 𝕄𝕀𝔼𝕄𝔹ℝ𝕆𝕊:*\n\n${mensaje}`,
      mentions
    }, { quoted: m });
  }
};