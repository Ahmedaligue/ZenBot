import { config } from '../config.js';

export default {
  command: ['delowner'],
  help: ['*Ⓓᴇʟᴏᴡɴᴇʀ <ɴᴜ́ᴍᴇʀᴏ>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { isOwner, args, ownerList }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');

    const raw = args[0];
    const number = raw?.replace(/[^0-9]/g, '');

    if (!number) return m.reply('*[ ⚠️ ] ᴅᴇʙᴇs ɪɴɢʀᴇsᴀʀ ᴜɴ ɴᴜ́ᴍᴇʀᴏ ᴠᴀ́ʟɪᴅᴏ.*');

    if (number === config.owner) {
      return m.reply('*[ ❌ ] ɴᴏ ᴘᴜᴇᴅᴇs ᴇʟɪᴍɪɴᴀʀ ᴀʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴘʀɪɴᴄɪᴘᴀʟ ᴅᴇʟ ʙᴏᴛ.*');
    }

    if (!ownerList.includes(number)) {
      return m.reply(`*[ ❌ ] ᴇʟ ɴᴜ́ᴍᴇʀᴏ ${number} ɴᴏ ᴇsᴛᴀ́ ᴇɴ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏs.*`);
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
        m.reply(`*[ ✅ ] ᴇʟ ɴᴜ́ᴍᴇʀᴏ ${number} ғᴜᴇ ᴇʟɪᴍɪɴᴀᴅᴏ ᴅᴇ ʟᴏs ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏs.*`);
      } catch (e) {
        console.error(e);
        m.reply('*[ ❌ ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴀʟ ɢᴜᴀʀᴅᴀʀ ʟᴀ ɴᴜᴇᴠᴀ ʟɪsᴛᴀ ᴅᴇ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏs.*');
      }
    } else {
      m.reply('*[ ❌ ] ᴇʟ ɴᴜ́ᴍᴇʀᴏ ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴏ́ ᴇɴ ʟᴀ ʟɪsᴛᴀ.*');
    }
  }
};