export default {
  help: ['𝙷𝙸𝙳𝙴𝚃𝙰𝙶 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['hidetag', 'mensaje', 'comunicar'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup)
      return conn.sendMessage(groupId, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(groupId, { text: '❗ Solo los administradores pueden usar este comando.' }, { quoted: m });

    if (!isBotAdmin)
      return conn.sendMessage(groupId, { text: '❗ El bot necesita ser administrador para ejecutar este comando.' }, { quoted: m });

    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata?.participants?.map(p => p.id) || [];

    if (participants.length === 0)
      return conn.sendMessage(groupId, { text: '❗ No hay participantes en el grupo para etiquetar.' }, { quoted: m });

    const texto = args.join(' ') || '🕵️‍♂️';

    await conn.sendMessage(groupId, {
      text: texto,
      mentions: participants
    }, { quoted: m });
  }
};