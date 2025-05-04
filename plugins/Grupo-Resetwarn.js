import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'lib', 'database', 'warns.json');
let warns = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};

function saveWarns() {
  fs.writeFileSync(dbPath, JSON.stringify(warns, null, 2));
}

export default {
  command: ['resetwarn'],
  help: ['𝚁𝙴𝚂𝙴𝚃𝚆𝙰𝚁𝙽 @𝚝𝚊𝚐'],
  tags: ['⚠️ 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔𝗦'],

  run: async (m, { isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup) return m.reply('*[ ❌ ] Este comando solo funciona en grupos.*');
    if (!isAdmin) return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');
    if (!isBotAdmin) return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentioned) return m.reply('*[ ⚠️ ] Debes mencionar a un usuario para resetear sus advertencias.*');

    if (warns[groupId]?.[mentioned]) {
      warns[groupId][mentioned] = 0;
      saveWarns();
      m.reply(`*[ ❗ ] Se reiniciaron las advertencias de* @${mentioned.split('@')[0]}`, {
        mentions: [mentioned]
      });
    } else {
      m.reply('*[ ❗ ] Este usuario no tiene advertencias.*');
    }
  }
};