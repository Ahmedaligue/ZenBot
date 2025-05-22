import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'lib', 'database', 'warns.json');
let warns = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};

function saveWarns() {
  fs.writeFileSync(dbPath, JSON.stringify(warns, null, 2));
}

export default {
  command: ['resetwarn'],
  help: ['*Ⓡᴇsᴇᴛᴡᴀʀɴ <ᴍᴇɴᴄɪᴏɴᴀʀ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { isGroup, isAdmin, isBotAdmin, groupId }) => {
    if (!isGroup) return m.reply('*[ ❌ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    
    if (!isAdmin) return m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    
    if (!isBotAdmin) return m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentioned) return m.reply('*[ ⚠️ ] ᴅᴇʙᴇs ᴍᴇɴᴄɪᴏɴᴀʀ ᴀ ᴜɴ ᴜsᴜᴀʀɪᴏ ᴘᴀʀᴀ ʀᴇsᴇᴛᴇᴀʀ sᴜs ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀs.*');

    if (warns[groupId]?.[mentioned]) {
      warns[groupId][mentioned] = 0;
      saveWarns();
      m.reply(`*[ ❗ ] sᴇ ʀᴇɪɴɪᴄɪᴀʀᴏɴ ʟᴀs ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀs ᴅᴇ* @${mentioned.split('@')[0]}`, {
        mentions: [mentioned]
      });
    } else {
      m.reply('*[ ❗ ] ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ ɴᴏ ᴛɪᴇɴᴇ ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀs.*');
    }
  }
};