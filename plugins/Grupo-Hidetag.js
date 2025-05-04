export default {
  help: ['𝙷𝙸𝙳𝙴𝚃𝙰𝙶 *𝚝𝚎𝚡𝚝𝚘*'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['hidetag', 'mensaje', 'comunicar'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata?.participants?.map(p => p.id) || [];

    if (participants.length === 0)
      return m.reply('[ ❗ ] *No hay participantes en el grupo para etiquetar.*');

    const texto = args.join(' ') || '🕵️‍♂️';

    await conn.sendMessage(groupId, {
      text: texto,
      mentions: participants
    }, { quoted: m });
  }
};