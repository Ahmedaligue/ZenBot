export default {
  help: ['𝚃𝙾𝙿5𝙶𝙰𝚈'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5gay', 'top5gays'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    const participantes = metadata.participants
      .filter(p => !p.admin)
      .map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] Este comando necesita al menos 5 miembros en el grupo.');
    }

    const elegidos = participantes.sort(() => 0.5 - Math.random()).slice(0, 5);

    const medallas = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    const mensajes = [
      '🌈 El más gay del grupo, nadie le quita el trono. 🏆',
      '😎 Casi, pero igual muy gay, eh. 🔥',
      'Medalla de bronce para este campeón del arcoíris. 🌈',
      '🤐 Muy callado pero sabemos lo tuyo. 😏',
      '😂 No se salva ni en el último puesto. 🙈'
    ];

    const mensajeTop = elegidos.map((jid, i) => {
      const tag = '@' + jid.split('@')[0];
      return `${medallas[i]} *${i + 1}.* ${tag} — ${mensajes[i]}`;
    }).join('\n');

    const mentions = elegidos;

    await conn.sendMessage(groupId, {
      image: { url: './media/top5gay.jpg' },
      caption: `🏳️‍🌈 *TOP 5 GAY DEL GRUPO* 🏳️‍🌈\n\n${mensajeTop}`,
      mentions
    }, { quoted: m });
  }
};