export default {
  command: ['listowner', 'owners', 'creadores', 'listowners'],
  help: ['*Ⓒʀᴇᴀᴅᴏʀᴇs*'],
  tags: ['*𝕀ℕ𝔽𝕆𝔹𝕆𝕋*'],
  
  run: async (m, { ownerList }) => {
    if (!ownerList || ownerList.length === 0) {
      return m.reply('*[ ⚠️ ] ɴᴏ ʜᴀʏ ᴏᴡɴᴇʀs ʀᴇɢɪsᴛʀᴀᴅᴏs.*');
    }

    const lista = ownerList
      .map((owner, index) => `• ${index + 1}. wa.me/${owner}`)
      .join('\n');

    await m.reply(`👑 *𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐂𝐑𝐄𝐀𝐃𝐎𝐑𝐄𝐒:*\n\n${lista}`);
  }
};