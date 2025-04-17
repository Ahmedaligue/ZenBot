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
    if (!isGroup) return m.reply('*[ ❌ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    if (!isAdmin) return m.reply('*[ ❗ ]  𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    if (!isBotAdmin) return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentioned) return m.reply('*[ ⚠️ ] 𝐃𝐞𝐛𝐞́𝐬 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐯𝐞𝐫𝐭𝐢𝐫.*');

    if (!warns[groupId]) warns[groupId] = {};
    if (!warns[groupId][mentioned]) warns[groupId][mentioned] = 0;

    warns[groupId][mentioned]++;
    saveWarns();

    if (warns[groupId][mentioned] >= 3) {
      await m.reply(`*[ ❗ ] 𝐄𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐟𝐮𝐞 𝐚𝐝𝐯𝐞𝐫𝐭𝐢𝐝𝐨 𝟑 𝐯𝐞𝐜𝐞𝐬 𝐲 𝐬𝐞𝐫𝐚́ 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐝𝐨 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.*`);
      await conn.groupParticipantsUpdate(groupId, [mentioned], 'remove');
      warns[groupId][mentioned] = 0;
      saveWarns();
    } else {
      await m.reply(`*[ ⚠️ ] 𝘈𝘥𝘷𝘦𝘳𝘵𝘦𝘯𝘤𝘪𝘢 ${warns[groupId][mentioned]}/3 𝘱𝘢𝘳𝘢 @${mentioned.split('@')[0]}`, {
        mentions: [mentioned]
      });
    }
  }
};