export default {
  help: ['𝙴𝙻𝙸𝙼𝙽𝙰𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['ban', 'kick', 'eliminar', 'borrar'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, botNumber, owner, groupId }) => {
    if (!isGroup)
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] *Necesitas mencionar o responder a alguien para eliminarlo.*');

    if (target === botNumber)
      return m.reply('Ey, no puedo eliminarme a mí mismo, no seas malo. 😐😑');

    if (target === owner)
      return m.reply('[ ❌ ] *No puedo eliminar al creador del grupo. ¡Él tiene corona!* 🙊');

    try {
      await conn.groupParticipantsUpdate(groupId, [target], 'remove');
      return m.reply(`👢 Adiós, adiós *@${target.split('@')[0]}*...`, { mentions: [target] });
    } catch (e) {
      console.error('❌ Error al intentar eliminar:', e);
      return m.reply('[ ⚠️ ] *No se pudo eliminar al usuario.*');
    }
  }
};