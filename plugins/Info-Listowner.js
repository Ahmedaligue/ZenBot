export default {
  command: ['listowner', 'owners'],
  help: ['𝙻𝙸𝚂𝚃𝙾𝚆𝙽𝙴𝚁'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],
  run: async (m, { ownerList }) => {
    if (!ownerList || ownerList.length === 0) {
      return m.reply('[ ⚠️ ] *𝐍𝐨 𝐡𝐚𝐲 𝐨𝐰𝐧𝐞𝐫𝐬 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐬.*');
    }

    const lista = ownerList
      .map((owner, index) => `• ${index + 1}. wa.me/${owner}`)
      .join('\n');

    await m.reply(`👑 *𝕃𝕀𝕊𝕋𝔸 𝔻𝔼 𝕆𝕎ℕ𝔼ℝ𝕊:*\n\n${lista}`);
  }
};