import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'lib', 'database', 'warns.json');
let warns = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};

function saveWarns() {
  fs.writeFileSync(dbPath, JSON.stringify(warns, null, 2));
}

export default {
  command: ['warn'],
  help: ['𝚆𝙰𝚁𝙽 @𝚝𝚊𝚐'],
  tags: ['⚠️ 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔𝗦'],

  run: async (m, { isGroup, isAdmin, isBotAdmin, args, conn, metadata, groupId }) => {
    if (!isGroup) return m.reply('*[ ❌ ] Este comando solo funciona en grupos.*');
    if (!isAdmin) return m.reply('*[ ❗ ] Solo los administradores pueden usar este comando.*');
    if (!isBotAdmin) return m.reply('*[ ❗ ] El bot necesita ser administrador para ejecutar este comando.*');

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentioned) return m.reply('*[ ⚠️ ] Debes mencionar a un usuario para advertir.*');

    if (!warns[groupId]) warns[groupId] = {};
    if (!warns[groupId][mentioned]) warns[groupId][mentioned] = 0;

    warns[groupId][mentioned]++;
    saveWarns();

    if (warns[groupId][mentioned] >= 3) {
      await m.reply(`*[ ❗ ] El usuario ha sido advertido 3 veces y será eliminado del grupo.*`);
      await conn.groupParticipantsUpdate(groupId, [mentioned], 'remove');
      warns[groupId][mentioned] = 0;
      saveWarns();
    } else {
      await m.reply(`*[ ⚠️ ] Advertencia ${warns[groupId][mentioned]}/3 para @${mentioned.split('@')[0]}`, {
        mentions: [mentioned]
      });
    }
  }
};