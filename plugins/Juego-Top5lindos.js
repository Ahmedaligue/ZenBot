import fs from 'fs';

export default {
  command: ['top5lindos', 'lindos', 'top5lindo', 'top5lindas'],
  help: ['*Ⓣᴏᴘ5ʟɪɴᴅᴏs*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ɴᴇᴄᴇsɪᴛᴀ ᴀʟ ᴍᴇɴᴏs 5 ᴍɪᴇᴍʙʀᴏs ᴇɴ ᴇʟ ɢʀᴜᴘᴏ.*');
    }

    const topLindos = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
✨ *𝐓𝐎𝐏 5 𝐋𝐈𝐍𝐃𝐎𝐒 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎* ✨

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