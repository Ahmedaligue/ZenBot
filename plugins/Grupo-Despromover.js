export default {
  help: ['𝙳𝙴𝚂𝙿𝚁𝙾𝙼𝙾𝚅𝙴𝚁 @𝚝𝚊𝚐'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['despromover', 'despromote'],

  run: async (m, { conn, sender, isGroup, isBotAdmin, groupId }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata.participants;

    const senderId = sender.endsWith('@s.whatsapp.net') ? sender : sender + '@s.whatsapp.net';
    const isAdmin = participants.find(p => p.id === senderId)?.admin;

    if (!isAdmin) {
      return m.reply('*[ ❗ ] Solo los admins pueden usar este comando.*');
    }

    if (!isBotAdmin) {
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');
    }

    const targetJid =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!targetJid) {
      return m.reply('[ ⚠️ ] ¡Asegúrate de mencionar o responder a alguien para despromoverlo!');
    }

    try {
      await conn.groupParticipantsUpdate(groupId, [targetJid], 'demote');
      return conn.sendMessage(groupId, {
        text: `⚠️ @${targetJid.split('@')[0]} ya no es admin.`,
        mentions: [targetJid]
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Error al intentar despromover:', error);
      return m.reply('[ ⚠️ ] *No se pudo despromover al usuario.*');
    }
  }
};