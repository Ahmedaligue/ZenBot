import { config } from '../config.js';

export default {
  command: ['delowner'],
  help: ['𝙳𝙴𝙻𝙾𝚆𝙽𝙴𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { isOwner, args, ownerList }) => {
    if (!isOwner) return m.reply('[ ❌ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫𝐥𝐨 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨.*');

    const raw = args[0];
    const number = raw?.replace(/[^0-9]/g, '');

    if (!number) return m.reply('[ ⚠️ ] *𝐃𝐞𝐛𝐞𝐬 𝐢𝐧𝐠𝐫𝐞𝐬𝐚𝐫 𝐮𝐧 𝐧𝐮́𝐦𝐞𝐫𝐨 𝐯𝐚́𝐥𝐢𝐝𝐨.*');

    if (number === config.owner) {
      return m.reply('[ ❌ ] *𝐍𝐨 𝐩𝐮𝐞𝐝𝐞𝐬 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫 𝐚𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐩𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥 𝐝𝐞𝐥 𝐛𝐨𝐭.*');
    }

    if (!ownerList.includes(number)) {
      return m.reply(`[ ❌ ] *𝐄𝐥 𝐧𝐮́𝐦𝐞𝐫𝐨 ${number} 𝐧𝐨 𝐞𝐬𝐭𝐚́ 𝐞𝐧 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨𝐬.*`);
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
        m.reply(`[ ✅ ] *𝐄𝐥 𝐧𝐮́𝐦𝐞𝐫𝐨 ${number} 𝐟𝐮𝐞 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐝𝐨 𝐝𝐞 𝐥𝐨𝐬 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨𝐬.*`);
      } catch (e) {
        console.error(e);
        m.reply('[ ❌ ] *𝐇𝐮𝐛𝐨 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐚𝐥 𝐠𝐮𝐚𝐫𝐝𝐚𝐫 𝐥𝐚 𝐧𝐮𝐞𝐯𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨𝐬.*');
      }
    } else {
      m.reply('[ ❌ ] *𝐄𝐥 𝐧𝐮́𝐦𝐞𝐫𝐨 𝐧𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐨́ 𝐞𝐧 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚.*');
    }
  }
};