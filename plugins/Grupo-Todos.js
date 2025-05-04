export default {
  help: ['𝚃𝙾𝙳𝙾𝚂'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['tagall', 'todos', 'invocar'],

  run: async (m, { conn, text, isGroup, isAdmin, isBotAdmin, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    if (!isAdmin) {
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');
    }

    const mentions = metadata.participants.map(p => p.id);
    const mensajeEtiquetas = mentions.map(jid => `➤ @${jid.split('@')[0]}`).join('\n');
    const mensajeTexto = text ? `*💬 Mensaje:* ${text}\n\n` : '';

    await conn.sendMessage(groupId, {
      text: `📢 *Invocando a ${mentions.length} integrantes...*\n\n${mensajeTexto}${mensajeEtiquetas}`,
      mentions
    }, { quoted: m });
  }
};