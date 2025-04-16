import fs from 'fs';

export default {
  help: ['𝚃𝙾𝙿𝟻𝙾𝚃𝙰𝙺𝚄𝚂'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5otakus', 'otakus', 'otaku'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐚𝐥 𝐦𝐞𝐧𝐨𝐬 𝟓 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
    }

    const topOtakus = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
🏯 *𝕋𝕆ℙ 𝟝 𝕆𝕋𝔸𝕂𝕌𝕊 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆* 🏯

1️⃣ *@${topOtakus[0].split('@')[0]}* — *ᴠɪᴠᴇ ᴇɴ ᴜɴ sʜᴏ̄ɴᴇɴ ᴇᴛᴇʀɴᴏ. ¿sᴇ ʙᴀɴ̃ᴀ? ᴍᴍᴍ......* 🤧  
2️⃣ *@${topOtakus[1].split('@')[0]}* — *ᴛɪᴇɴᴇ ᴍᴀ́s ᴡᴀɪғᴜs ϙᴜᴇ ᴄᴏɴᴛᴀᴄᴛᴏs.* ❤️‍🔥  
3️⃣ *@${topOtakus[2].split('@')[0]}* — *sᴇ ᴇᴍᴏᴄɪᴏɴᴀ ᴍᴀ́s ᴄᴏɴ ᴜɴ ᴄᴀᴘɪ́ᴛᴜʟᴏ ϙᴜᴇ ᴄᴏɴ sᴜ ᴄᴜᴍᴘʟᴇ.* 🎉  
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