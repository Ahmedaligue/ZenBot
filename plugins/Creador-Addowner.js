import { config } from '../config.js';

export default {
  command: ['addowner', 'addcreador', 'adddueño', 'addpropietario'],
  help: ['𝙰𝙳𝙳𝙾𝚆𝙽𝙴𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { sender, args, saveOwner }) => {
    const number = args[0]?.replace(/[^0-9]/g, '');

    if (sender.split('@')[0] !== config.owner) {
      return m.reply('[ ⚠️ ] *Solo el creador principal puede agregar owners.*');
    }

    if (!number) {
      return m.reply('[ ⚠️ ] *Debes ingresar un número válido.*');
    }

    if (typeof saveOwner !== 'function') {
      return m.reply('[ ❌ ] *Error interno: saveOwner no es una función.*');
    }

    saveOwner(number);
    m.reply(`[ ✅ ] *El número ${number} ahora es un propietario del bot.*`);
  }
};