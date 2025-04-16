export default {
  help: ['𝚃𝙾𝙿5𝙶𝙰𝚈'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5gay', 'top5gays'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    const participantes = metadata.participants
      .filter(p => !p.admin)
      .map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐚𝐥 𝐦𝐞𝐧𝐨𝐬 𝟓 𝐦𝐢𝐞𝐦𝐛𝐫𝐨𝐬 𝐞𝐧 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
    }

    const elegidos = participantes.sort(() => 0.5 - Math.random()).slice(0, 5);

    const medallas = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    const mensajes = [
      '🌈 ᴇʟ ᴍᴀ́s ɢᴀʏ ᴅᴇʟ ɢʀᴜᴘᴏ, ɴᴀᴅɪᴇ ʟᴇ ϙᴜɪᴛᴀ ᴇʟ ᴛʀᴏɴᴏ. 🏆',
      '😎 ᴄᴀsɪ, ᴘᴇʀᴏ ɪɢᴜᴀʟ ᴍᴜʏ ɢᴀʏ, ᴇʜ. 🔥',
      'ᴍᴇᴅᴀʟʟᴀ ᴅᴇ ʙʀᴏɴᴄᴇ ᴘᴀʀᴀ ᴇsᴛᴇ ᴄᴀᴍᴘᴇᴏ́ɴ ᴅᴇʟ ᴀʀᴄᴏɪ́ʀɪs. 🌈',
      '🤐 ᴍᴜʏ ᴄᴀʟʟᴀᴅᴏ ᴘᴇʀᴏ sᴀʙᴇᴍᴏs ʟᴏ ᴛᴜʏᴏ. 😏',
      '😂 ɴᴏ sᴇ sᴀʟᴠᴀ ɴɪ ᴇɴ ᴇʟ ᴜ́ʟᴛɪᴍᴏ ᴘᴜᴇsᴛᴏ. 🙈'
    ];

    const mensajeTop = elegidos.map((jid, i) => {
      const tag = '@' + jid.split('@')[0];
      return `${medallas[i]} *${i + 1}.* ${tag} — ${mensajes[i]}`;
    }).join('\n');

    const mentions = elegidos;

    await conn.sendMessage(groupId, {
      image: { url: './media/top5gay.jpg' },
      caption: `🏳️‍🌈 *𝕋𝕆ℙ 𝟝 𝔾𝔸𝕐 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆* 🏳️‍🌈\n\n${mensajeTop}`,
      mentions
    }, { quoted: m });
  }
};