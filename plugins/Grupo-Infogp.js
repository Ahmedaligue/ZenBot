export default {
  help: ['𝙸𝙽𝙵𝙾𝙶𝚁𝚄𝙿𝙾'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['infogrupo', 'infogroup'],
  async run(m, { conn, sender, isGroup }) {
    if (!isGroup) return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');

    const groupId = m.key.remoteJid;
    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin);
    const ownerId = groupMetadata.owner;

    const creationDate = new Date(groupMetadata.creation * 1000);
    const fechaFormateada = creationDate.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const texto = `
╭━━━〔 *📌 INFORMACIÓN DEL GRUPO* 〕━━━╮
┃ 🏷️ *Nombre:* ${groupMetadata.subject}
┃ ✍️ *Descripción:* ${groupMetadata.desc?.split('\n')[0] || 'Sin descripción'}
┃ 📆 *Creado el:* ${fechaFormateada}
┃ 👤 *Creador:* ${ownerId ? `@${ownerId.split('@')[0]}` : 'Desconocido'}
┃ 👥 *Miembros:* ${participants.length}
┃ 🛡️ *Admins:* ${admins.length}
┃ 🆔 *ID:* ${groupMetadata.id}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

    const menciones = ownerId ? [ownerId, ...admins.map(a => a.id)] : admins.map(a => a.id);

    return m.reply(texto.trim(), { mentions: menciones });
  }
};