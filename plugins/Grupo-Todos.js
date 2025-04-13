export default {
  help: ['𝚃𝙾𝙳𝙾𝚂'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['tagall', 'todos', 'invocar'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, metadata, groupId }) => {
    if (!isGroup || !metadata)
      return conn.sendMessage(groupId, {
        text: '❗ Este comando solo funciona en grupos.'
      }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(groupId, {
        text: '❗ Solo los administradores pueden usar este comando.'
      }, { quoted: m });

    if (!isBotAdmin)
      return conn.sendMessage(groupId, {
        text: '❗ El bot necesita ser administrador para poder etiquetar a todos.'
      }, { quoted: m });

    const mentions = metadata.participants.map(p => p.id);
    const mensaje = mentions.map(jid => `➤ @${jid.split('@')[0]}`).join('\n');

    await conn.sendMessage(groupId, {
      text: `📢 *Etiqueta a todos los miembros:*\n\n${mensaje}`,
      mentions
    }, { quoted: m });
  }
};