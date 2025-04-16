export default {
  help: ['𝙲𝙴𝚁𝚁𝙰𝚁𝙶𝚁𝚄𝙿𝙾 1𝚜/1𝚖/1𝚑'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['cerrargrupo', 'closegroup'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin }) => {
    const id = m.key.remoteJid;

    if (!isGroup)
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');

    if (!isAdmin)
      return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    if (!isBotAdmin)
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const timeArg = args[0];
    if (!timeArg || !/^\d+(s|m|h|d)$/.test(timeArg))
      return m.reply('[ ❗ ] 𝐃𝐞𝐛𝐞𝐬 𝐢𝐧𝐠𝐫𝐞𝐬𝐚𝐫 𝐮𝐧 𝐭𝐢𝐞𝐦𝐩𝐨 𝐯𝐚́𝐥𝐢𝐝𝐨 (𝐄𝐣: 10s, 5m, 1h, 1d).');

    const timeValue = parseInt(timeArg);
    const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[timeArg.slice(-1)];
    const duration = timeValue * unit;

    await conn.groupSettingUpdate(id, 'announcement');
    await m.reply(`[ 🔒 ] 𝐄𝐥 𝐠𝐫𝐮𝐩𝐨 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐜𝐞𝐫𝐫𝐚𝐝𝐨 𝐝𝐮𝐫𝐚𝐧𝐭𝐞 ${timeArg}.`);

    setTimeout(async () => {
      try {
        await conn.groupSettingUpdate(id, 'not_announcement');
        await m.reply('[ ⏱️ ] *𝐄𝐥 𝐠𝐫𝐮𝐩𝐨 𝐡𝐚 𝐬𝐢𝐝𝐨 𝐫𝐞𝐚𝐛𝐢𝐞𝐫𝐭𝐨.*');
      } catch (e) {
        console.error('Error al reabrir el grupo:', e);
        await m.reply('[ ❌ ] *𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐫𝐞𝐚𝐛𝐫𝐢𝐫 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*');
      }
    }, duration);
  }
};