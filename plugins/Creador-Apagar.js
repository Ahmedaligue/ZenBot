export default {
  command: ['apagar', 'apagarbot'],
  help: ['apagar', 'apagarbot'],
  tags: ['owner'],
  owner: true,
  run: async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('⚠️ Este comando solo lo puede usar el propietario del bot.');
    const response = '⏹️ Bot apagado correctamente.';
    if (m.reply && typeof m.reply === 'function') {
      await m.reply(response);
    } else {
      await conn.sendMessage(m.key.remoteJid, { text: response }, { quoted: m });
    }
    process.exit(0);
  }
};