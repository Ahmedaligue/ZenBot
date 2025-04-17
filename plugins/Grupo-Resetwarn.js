// plugins/resetwarn.js
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

  run: async (m, { isGroup, isAdmin, isBotAdmin, args, groupId }) => {
    if (!isGroup) return m.reply('*[ ❌ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    if (!isAdmin) return m.reply('*[ ❗ ] 𝐒𝐨𝐥𝐨 𝐥𝐨𝐬 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬 𝐩𝐮𝐞𝐝𝐞𝐧 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    if (!isBotAdmin) return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentioned) return m.reply('*[ ⚠️ ] 𝐃𝐞𝐛𝐞́𝐬 𝐦𝐞𝐧𝐜𝐢𝐨𝐧𝐚𝐫 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐩𝐚𝐫𝐚 𝐫𝐞𝐬𝐞𝐭𝐞𝐚𝐫 𝐚𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚𝐬.*');

    if (warns[groupId]?.[mentioned]) {
      warns[groupId][mentioned] = 0;
      saveWarns();
      m.reply(`*[ ❗ ] 𝘚𝘦 𝘳𝘦𝘪𝘯𝘪𝘤𝘪𝘢𝘳𝘰𝘯 𝘭𝘢𝘴 𝘢𝘥𝘷𝘦𝘳𝘵𝘦𝘯𝘤𝘪𝘢𝘴 𝘥𝘦* @${mentioned.split('@')[0]}`, {
        mentions: [mentioned]
      });
    } else {
      m.reply('*[ ❗ ] 𝐄𝐬𝐞 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐧𝐨 𝐭𝐢𝐞𝐧𝐞 𝐚𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚𝐬.*');
    }
  }
};