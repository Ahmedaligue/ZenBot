export default {
  command: ['listowner', 'owners'],
  help: ['𝙻𝙸𝚂𝚃𝙾𝚆𝙽𝙴𝚁'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],
  run: async (m, { ownerList }) => {
    if (!ownerList || ownerList.length === 0) {
      return m.reply('[ ⚠️ ] *No hay owners registrados.*');
    }

    const lista = ownerList
      .map((owner, index) => `• ${index + 1}. wa.me/${owner}`)
      .join('\n');

    await m.reply(`👑 *Lista de Owners:*\n\n${lista}`);
  }
};