export default {
  help: ['𝙿𝚁𝙾𝙼𝙾𝚅𝙴𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['promover', 'promote'],

  run: async (m, { conn, sender, isGroup, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return conn.sendMessage(groupId, { text: '⚠️ Este comando solo se puede usar en grupos.' }, { quoted: m });
    }

    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata.participants;

    const senderId = sender.endsWith('@s.whatsapp.net') ? sender : sender + '@s.whatsapp.net';
    const isAdmin = participants.find(p => p.id === senderId)?.admin;

    if (!isAdmin) {
      return conn.sendMessage(groupId, { text: '❌ No sos admin, no podés usar este comando.' }, { quoted: m });
    }

    if (!isBotAdmin) {
      return conn.sendMessage(groupId, { text: '❌ No puedo promover si no soy admin del grupo.' }, { quoted: m });
    }

    const targetJid =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!targetJid) {
      return conn.sendMessage(groupId, {
        text: '💡 ¡Asegurate de mencionar o responder a alguien para promoverlo al rango de admin!'
      }, { quoted: m });
    }

    try {
      await conn.groupParticipantsUpdate(groupId, [targetJid], 'promote');
      return conn.sendMessage(groupId, {
        text: `🌟 ¡Felicidades @${targetJid.split('@')[0]}! Ahora sos admin del grupo.`,
        mentions: [targetJid]
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Error al intentar promover:', error);
      return conn.sendMessage(groupId, {
        text: '⚠️ No pude promover al usuario. ¿Será que soy admin? 🤔'
      }, { quoted: m });
    }
  }
};