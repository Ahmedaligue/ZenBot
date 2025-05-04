export default {
  help: ['𝙲𝙴𝚁𝚁𝙰𝚁𝙶𝚁𝚄𝙿𝙾 1𝚜/1𝚖/1𝚑'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['cerrargrupo', 'closegroup'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const timeArg = args[0];
    if (!timeArg || !/^\d+(s|m|h|d)$/.test(timeArg))
      return m.reply('[ ❗ ] Debes ingresar un tiempo válido (Ej: 10s, 5m, 1h, 1d).');

    const timeValue = parseInt(timeArg);
    const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[timeArg.slice(-1)];
    const duration = timeValue * unit;

    await conn.groupSettingUpdate(id, 'announcement');
    await m.reply(`[ 🔒 ] El grupo ha sido cerrado durante ${timeArg}.`);

    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(id, 'not_announcement');
        await m.reply('[ ⏱️ ] *El grupo ha sido reabierto.*');
      } catch (e) {
        console.error('Error al reabrir el grupo:', e);
        await m.reply('[ ❌ ] *Error al intentar reabrir el grupo.*');
      }
    }, duration);
  }
};