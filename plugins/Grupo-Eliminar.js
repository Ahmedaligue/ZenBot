export default {
  help: ['𝙴𝙻𝙸𝙼𝙽𝙰𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['ban', 'kick', 'eliminar', 'borrar'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin, botNumber, owner, groupId }) => {
    if (!isGroup)
      return conn.sendMessage(groupId, { text: '❗ Este comando solo se puede usar en grupos.' }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(groupId, { text: '❌ No sos admin, no podés eliminar a nadie.' }, { quoted: m });

    if (!isBotAdmin)
      return conn.sendMessage(groupId, { text: '❌ No puedo eliminar si no soy admin del grupo.' }, { quoted: m });

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return conn.sendMessage(groupId, {
        text: '💡 Tenés que mencionar o responder a alguien para eliminarlo.'
      }, { quoted: m });

    if (target === botNumber)
      return conn.sendMessage(groupId, {
        text: 'Ey, no puedo eliminarme a mí mismo, no seas malo.'
      }, { quoted: m });

    if (target === owner)
      return conn.sendMessage(groupId, {
        text: '❌ No puedo eliminar al creador del grupo. ¡Ese tiene corona!'
      }, { quoted: m });

    try {
      await conn.groupParticipantsUpdate(groupId, [target], 'remove');
      return conn.sendMessage(groupId, {
        text: `👢 Chau chau @${target.split('@')[0]}...`,
        mentions: [target]
      }, { quoted: m });
    } catch (e) {
      console.error('❌ Error al intentar eliminar:', e);
      return conn.sendMessage(groupId, {
        text: '⚠️ No pude eliminar al usuario. ¿Será que soy admin?'
      }, { quoted: m });
    }
  }
};