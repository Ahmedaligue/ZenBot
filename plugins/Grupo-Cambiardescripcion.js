export default {
  help: ['𝙲𝙰𝙼𝙱𝙸𝙰𝚁𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['setdesc', 'cambiardescripcion'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return conn.sendMessage(id, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(id, { text: '❗ Solo los administradores pueden usar este comando.' }, { quoted: m });

    if (!isBotAdmin)
      return conn.sendMessage(id, { text: '❗ El bot necesita ser administrador para cambiar la descripción.' }, { quoted: m });

    const nuevaDesc = args.join(' ').trim();
    if (!nuevaDesc)
      return conn.sendMessage(id, {
        text: '✳️ Usa el comando así:\n\n• .setdesc Nueva descripción del grupo',
      }, { quoted: m });

    await conn.groupUpdateDescription(id, nuevaDesc);
    return conn.sendMessage(id, {
      text: `✅ La descripción del grupo ha sido cambiada a:\n\n*${nuevaDesc}*`,
    }, { quoted: m });
  }
};