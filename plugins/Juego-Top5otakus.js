import fs from 'fs';

export default {
  command: ['top5otakus', 'otakus', 'otaku'],
  help: ['*Ⓣᴏᴘ5ᴏᴛᴀᴋᴜs*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ɴᴇᴄᴇsɪᴛᴀ ᴀʟ ᴍᴇɴᴏs 5 ᴍɪᴇᴍʙʀᴏs ᴇɴ ᴇʟ ɢʀᴜᴘᴏ.*');
    }

    const topOtakus = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
🏯 *TOP 5 OTAKUS DEL GRUPO* 🏯

1️⃣ *@${topOtakus[0].split('@')[0]}* — *ᴠɪᴠᴇ ᴇɴ ᴜɴ sʜᴏ̄ɴᴇɴ ᴇᴛᴇʀɴᴏ. ¿sᴇ ʙᴀɴ̃ᴀ? ᴍᴍᴍ......* 🤧  
2️⃣ *@${topOtakus[1].split('@')[0]}* — *ᴛɪᴇɴᴇ ᴍᴀ́s ᴡᴀɪғᴜs ϙᴜᴇ ᴄᴏɴᴛᴀᴄᴛᴏs.* ❤️‍🔥  
3️⃣ *@${topOtakus[2].split('@')[0]}* — *sᴇ ᴇᴍᴏᴄɪᴏɴᴀ ᴍᴀ́s ᴄᴏɴ ᴜɴ ᴄᴀᴘɪ́ᴛᴜʟᴏ ϙᴜᴇ ᴄᴏɴ sᴜ ᴄᴜᴍᴘʟᴇᴀɴ̃ᴏs.* 🎉  
4️⃣ *@${topOtakus[3].split('@')[0]}* — *ᴛɪᴇɴᴇ ᴍᴀ́s ᴀɴɪᴍᴇs ᴠɪsᴛᴏs ϙᴜᴇ ᴅɪ́ᴀs ᴠɪᴠɪᴅᴏs.* ⌛  
5️⃣ *@${topOtakus[4].split('@')[0]}* — *ʟᴏ ᴠɪᴇʀᴏɴ ʟʟᴏʀᴀʀ ᴄᴏɴ ᴇʟ ғɪɴᴀʟ ᴅᴇ ᴄʟᴀɴɴᴀᴅ.* 😭
`;

    const imagen = fs.readFileSync('./media/top5otakus.jpg');

    await conn.sendMessage(groupId, {
      image: imagen,
      caption: mensaje,
      mentions: topOtakus
    }, { quoted: m });
  }
};