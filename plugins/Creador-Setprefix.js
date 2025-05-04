import { config } from '../config.js';

export default {
  command: ['cambiarprefijo', 'setprefix'],
  help: ['𝚂𝙴𝚃𝙿𝚁𝙴𝙵𝙸𝚇 <𝙽𝚄𝙴𝙾_𝙿𝚁𝙴𝙵𝙸𝙹𝙾>'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { conn, args, isOwner }) => {
    if (!isOwner) {
      await m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');
      return;
    }

    if (args.length === 0) {
      await m.reply('[ ❌ ] *Por favor, ingresa el nuevo prefijo.*');
      return;
    }

    const nuevoPrefijo = args[0];

    if (nuevoPrefijo.trim() === '') {
      await m.reply('[ ❌ ] *El prefijo no puede estar vacío.*');
      return;
    }

    config.prefix = nuevoPrefijo;

    await m.reply(`[ ✅ ] *El prefijo ha sido cambiado a: ${nuevoPrefijo}*`);
    console.log(`El prefijo ha sido cambiado a: ${nuevoPrefijo}`);
  }
};