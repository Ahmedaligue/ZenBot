import fs from 'fs';

export default {
  command: ['top5feos', 'feos', 'top5feo'],
  help: ['*Ⓣᴏᴘ5ғᴇᴏs*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ɴᴇᴄᴇsɪᴛᴀ ᴀʟ ᴍᴇɴᴏs 5 ᴍɪᴇᴍʙʀᴏs ᴇɴ ᴇʟ ɢʀᴜᴘᴏ.*');
    }

    const topFeos = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
🚨 *𝐓𝐎𝐏 5 𝐅𝐄𝐎𝐒 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎* 🚨

1️⃣ *@${topFeos[0].split('@')[0]}* — ¡ᴇʟ ᴠᴇʀᴅᴀᴅᴇʀᴏ ᴍᴏɴsᴛʀᴜᴏ ᴅᴇʟ ɢʀᴜᴘᴏ! 😱  
2️⃣ *@${topFeos[1].split('@')[0]}* — ¡ʟᴏ sɪᴇɴᴛᴏ, ᴘᴇʀᴏ ᴇsᴀ ᴄᴀʀᴀ ɴᴇᴄᴇsɪᴛᴀ ᴜɴ ғɪʟᴛʀᴏ! 😂  
3️⃣ *@${topFeos[2].split('@')[0]}* — ¡ʟᴀ ᴄᴀʀᴀ ᴍᴀ́s ʀᴇᴄʜᴀᴢᴀᴅᴀ ᴘᴏʀ ᴇʟ ғɪʟᴛʀᴏ ʙᴇʟʟᴀ! 💄  
4️⃣ *@${topFeos[3].split('@')[0]}* — ¡ᴇs ᴇʟ ᴘʀɪᴍᴇʀ ʟᴜɢᴀʀ, ᴘᴇʀᴏ ᴀʟ ʀᴇᴠᴇ́s! 😅  
5️⃣ *@${topFeos[4].split('@')[0]}* — ᴛᴇ ϙᴜᴇʀᴇᴍᴏs ɪɢᴜᴀʟ... ¡ᴘᴇʀᴏ ᴘᴏʀ ᴅᴇɴᴛʀᴏ! 💖
`;

    const imagen = fs.readFileSync('./media/top5feos.jpg');

    await conn.sendMessage(groupId, {
      image: imagen,
      caption: mensaje,
      mentions: topFeos
    }, { quoted: m });
  }
};