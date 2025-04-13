export default {
  help: ['𝙲𝙴𝚁𝚁𝙰𝚁𝙶𝚁𝚄𝙿𝙾 1𝚜/1𝚖/1𝚑'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['cerrargrupo', 'closegroup'],

  run: async (m, { conn, args, isGroup, isAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return conn.sendMessage(id, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: m });

    if (!isAdmin)
      return conn.sendMessage(id, { text: '❗ Solo los administradores pueden usar este comando.' }, { quoted: m });

    const timeArg = args[0];
    if (!timeArg || !/^\d+(s|m|h|d)$/.test(timeArg))
      return conn.sendMessage(id, { text: '❗ Debes ingresar un tiempo válido (Ej: 10s, 5m, 1h, 1d).' }, { quoted: m });

    const timeValue = parseInt(timeArg);
    const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[timeArg.slice(-1)];
    const duration = timeValue * unit;

    await conn.groupSettingUpdate(id, 'announcement');
    await conn.sendMessage(id, { text: `✅ El grupo ha sido cerrado durante ${timeArg}.` }, { quoted: m });

    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(id, 'not_announcement');
        await conn.sendMessage(id, { text: '✅ El grupo ha sido reabierto.' });
      } catch (e) {
        console.error('Error al reabrir el grupo:', e);
        await conn.sendMessage(id, { text: '❌ Error al intentar reabrir el grupo.' });
      }
    }, duration);
  }
};