export default {
  command: ['=>'],
  help: ['=> código async'],
  tags: ['owner'],
  owner: true,
  run: async (m, { text, conn, isOwner }) => {
    if (!isOwner) return conn.sendMessage(m.key.remoteJid, { text: 'Este comando solo lo puede usar mi creador.' }, { quoted: m });
    if (!text) return conn.sendMessage(m.key.remoteJid, { text: '¿Qué querés evaluar?' }, { quoted: m });
    try {
      let evaled = await (async () => eval(text))();
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      conn.sendMessage(m.key.remoteJid, { text: evaled }, { quoted: m });
    } catch (err) {
      conn.sendMessage(m.key.remoteJid, { text: '❌ Error:\n' + err }, { quoted: m });
    }
  }
};