import { config } from '../config.js';

export default {
  command: ['delowner'],
  help: ['𝙳𝙴𝙻𝙾𝚆𝙽𝙴𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { isOwner, args, ownerList }) => {
    if (!isOwner) return m.reply('[ ❌ ] *Este comando solo lo puede usar el propietario.*');

    const raw = args[0];
    const number = raw?.replace(/[^0-9]/g, '');

    if (!number) return m.reply('[ ⚠️ ] *Debes ingresar un número válido.*');

    if (number === config.owner) {
      return m.reply('[ ❌ ] *No puedes eliminar al propietario principal del bot.*');
    }

    if (!ownerList.includes(number)) {
      return m.reply(`[ ❌ ] *El número ${number} no está en la lista de propietarios.*`);
    }

    const index = ownerList.indexOf(number);
    if (index !== -1) {
      ownerList.splice(index, 1);
      try {
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const ownersPath = path.join(__dirname, '../lib/owners.json');

        fs.writeFileSync(ownersPath, JSON.stringify(ownerList, null, 2));
        m.reply(`[ ✅ ] *El número ${number} fue eliminado de los propietarios.*`);
      } catch (e) {
        console.error(e);
        m.reply('[ ❌ ] *Hubo un error al guardar la nueva lista de propietarios.*');
      }
    } else {
      m.reply('[ ❌ ] *El número no se encontró en la lista.*');
    }
  }
};