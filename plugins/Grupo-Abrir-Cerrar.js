export default {
  help: ['𝙶𝚁𝚄𝙿𝙾 𝙰𝙱𝚁𝙸𝚁/𝙲𝙴𝚁𝚁𝙰𝚁'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['grupo', 'group'],

  run: async (m, { conn, args, isGroup, sender, isAdmin, isBotAdmin, prefix }) => {
    const id = m.key.remoteJid;

    if (!isGroup) {
      return await m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    if (!isAdmin) {
      return await m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');
    }

    if (!isBotAdmin) {
      return await m.reply('*[ ❗ ] El bot necesita ser admin para ejecutar este comando.*');
    }

    const accion = args[0]?.toLowerCase();
    if (!accion || !['abrir', 'cerrar'].includes(accion)) {
      return await m.reply(`*✳️ Usa el comando así:*\n\n• ${prefix}grupo abrir\n• ${prefix}grupo cerrar`);
    }

    const groupMetadata = await conn.groupMetadata(id);
    const isClosed = groupMetadata.announce;

    if (accion === 'cerrar' && isClosed) {
      return await m.reply('*[ ⚠️ ] El grupo ya está cerrado.*');
    }

    if (accion === 'abrir' && !isClosed) {
      return await m.reply('*[ ⚠️ ] El grupo ya está abierto.*');
    }

    await conn.groupSettingUpdate(id, accion === 'abrir' ? 'not_announcement' : 'announcement');
    await m.reply(`*[ ✅ ] Grupo ${accion === 'abrir' ? 'abierto' : 'cerrado'} correctamente.*`);
  }
};