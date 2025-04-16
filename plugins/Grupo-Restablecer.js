export default {
  help: ['𝚁𝙴𝚂𝚃𝙰𝙱𝙻𝙴𝙲𝙴𝚁'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['revoke', 'resetlink', 'restablecer'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    try {
      const code = await conn.groupRevokeInvite(groupId);
      return conn.sendMessage(groupId, {
        text: `✅ 𝕃𝕀ℕ𝕂 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆 ℝ𝔼𝕊𝕋𝔸𝔹𝕃𝔼ℂ𝕀𝔻𝕆:\nhttps://chat.whatsapp.com/${code}`
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Error al restablecer link:', error);
      return m.reply('[ ❌ ] *𝐎𝐜𝐮𝐫𝐫𝐢𝐨́ 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐫𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐞𝐫 𝐞𝐥 𝐞𝐧𝐥𝐚𝐜𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
    }
  }
};