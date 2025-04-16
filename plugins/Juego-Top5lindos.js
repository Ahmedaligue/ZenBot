import fs from 'fs';

export default {
  help: ['𝚃𝙾𝙿𝟻𝙻𝙸𝙽𝙳𝙾𝚂'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5lindos', 'lindos', 'top5lindo'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐚𝐥 𝐦𝐞𝐧𝐨𝐬 𝟓 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
    }

    const topLindos = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
✨ *𝕋𝕆ℙ 𝟝 𝕃𝕀ℕ𝔻𝕆𝕊 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆* ✨

1️⃣ *@${topLindos[0].split('@')[0]}* — *¡ᴅɪᴏs/ᴀ ɢʀɪᴇɢᴏ/ᴀ ʙᴀᴊᴀᴅᴏ ᴅᴇʟ ᴏʟɪᴍᴘᴏ!* 😍  
2️⃣ *@${topLindos[1].split('@')[0]}* — *¡ᴇʟ ᴍᴏᴛɪᴠᴏ ᴘᴏʀ ᴇʟ ϙᴜᴇ ᴠᴀʀɪᴏs sᴜsᴘɪʀᴀɴ!* 🥵  
3️⃣ *@${topLindos[2].split('@')[0]}* — *¡ᴄᴏɴ ᴇsᴀ ᴄᴀʀɪᴛᴀ sᴇ ɢᴀɴᴀ ᴇʟ ᴍᴜɴᴅᴏ!* 🫦  
4️⃣ *@${topLindos[3].split('@')[0]}* — *¡sᴜ ʙᴇʟʟᴇᴢᴀ ᴄᴀᴜsᴀ ʙᴜɢs ᴇɴ ᴡʜᴀᴛsᴀᴘᴘ!* 🪄  
5️⃣ *@${topLindos[4].split('@')[0]}* — *¡ʜᴇʀᴍᴏsᴏ/ᴀ ʜᴀsᴛᴀ ᴇɴ sᴛɪᴄᴋᴇʀs ᴘɪxᴇʟᴀᴅᴏs!* 📱
`;

    const imagen = fs.readFileSync('./media/top5lindo.jpg');

    await conn.sendMessage(groupId, {
      image: imagen,
      caption: mensaje,
      mentions: topLindos
    }, { quoted: m });
  }
};