import fs from 'fs';

export default {
  help: ['𝚃𝙾𝙿𝟻𝙵𝙴𝙾𝚂'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5feos', 'feos', 'top5feo'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐚𝐥 𝐦𝐞𝐧𝐨𝐬 𝟓 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
    }

    const topFeos = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
🚨 *𝕋𝕆ℙ 𝟝 𝔽𝔼𝕆𝕊 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆* 🚨

1️⃣ *@${topFeos[0].split('@')[0]}* — ¡ᴇʟ ᴠᴇʀᴅᴀᴅᴇʀᴏ ᴍᴏɴsᴛʀᴜᴏ ᴅᴇʟ ɢʀᴜᴘᴏ! 😱  
2️⃣ *@${topFeos[1].split('@')[0]}* — ¡ʟᴏ sɪᴇɴᴛᴏ, ᴘᴇʀᴏ ᴇsᴀ ᴄᴀʀᴀ ɴᴇᴄᴇsɪᴛᴀ ᴜɴ ғɪʟᴛʀᴏ! 😂  
3️⃣ *@${topFeos[2].split('@')[0]}* — ¡ʟᴀ ᴄᴀʀᴀ ᴍás ʀᴇᴄʜᴀᴢᴀᴅᴀ ᴘᴏʀ ᴇʟ ғɪʟᴛʀᴏ ʙᴇʟʟᴀ! 💄  
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