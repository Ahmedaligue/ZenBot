export default {
  command: ['top5gay', 'top5gays'],
  help: ['*Ⓣᴏᴘ5ɢᴀʏ*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }

    const participantes = metadata.participants
      .filter(p => !p.admin)
      .map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ɴᴇᴄᴇsɪᴛᴀ ᴀʟ ᴍᴇɴᴏs 5 ᴍɪᴇᴍʙʀᴏs ᴇɴ ᴇʟ ɢʀᴜᴘᴏ.*');
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
      caption: `🏳️‍🌈 *𝐓𝐎𝐏 5 𝐆𝐀𝐘 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎* 🏳️‍🌈\n\n*${mensajeTop}*`,
      mentions
    }, { quoted: m });
  }
};