export default {
  help: ['𝙳𝙴𝚂𝙿𝚁𝙾𝙼𝙾𝚅𝙴𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['despromover', 'despromote'],

  run: async (m, { conn, isGroup, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return conn.sendMessage(id, { text: '⚠️ Este comando solo se puede usar en grupos.' }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(id, { text: '❌ No sos admin, no podés usar este comando.' }, { quoted: m });

    if (!isBotAdmin)
      return conn.sendMessage(id, { text: '❌ No puedo despromover si no soy administrador del grupo.' }, { quoted: m });

    const groupMetadata = await conn.groupMetadata(id);
    const owner = groupMetadata.owner;

    let target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return conn.sendMessage(id, {
        text: '💡 Tenés que mencionar o responder a alguien para despromoverlo de admin.'
      }, { quoted: m });

    if (target === owner)
      return conn.sendMessage(id, {
        text: '❌ No puedo despromover al creador del grupo. ¡Es invulnerable!'
      }, { quoted: m });

    try {
      await conn.groupParticipantsUpdate(id, [target], 'demote');
      return conn.sendMessage(id, {
        text: `⚠️ *@${target.split('@')[0]}* ya no es administrador.`,
        mentions: [target]
      }, { quoted: m });
    } catch (e) {
      console.error('❌ Error al intentar despromover:', e);
      return conn.sendMessage(id, {
        text: '⚠️ No pude despromover al usuario. ¿Será que soy admin?'
      }, { quoted: m });
    }
  }
};