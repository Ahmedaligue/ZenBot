export default {
  command: ['apagar', 'apagarbot'],
  help: ['𝙰𝙿𝙰𝙶𝙰𝚁𝙱𝙾𝚃'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],
  owner: true,
  run: async (m, { isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');

    await m.reply('⏹️ *Bot apagado correctamente.*');
    process.exit(0);
  }
};