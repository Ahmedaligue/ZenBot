import { config } from '../config.js';

export default {
  command: ['addowner', 'addcreador', 'adddueño', 'addpropietario'],
  help: ['*Ⓐᴅᴅᴏᴡɴᴇʀ <ɴᴜ́ᴍᴇʀᴏ>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { sender, args, saveOwner }) => {
    const number = args[0]?.replace(/[^0-9]/g, '');

    if (sender.split('@')[0] !== config.owner) {
      return m.reply('*[ ⚠️ ] sᴏʟᴏ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ᴘʀɪɴᴄɪᴘᴀʟ ᴘᴜᴇᴅᴇ ᴀɢʀᴇɢᴀʀ ᴏᴡɴᴇʀs.*');
    }

    if (!number) {
      return m.reply('*[ ⚠️ ] ᴅᴇʙᴇs ɪɴɢʀᴇsᴀʀ ᴜɴ ɴᴜ́ᴍᴇʀᴏ ᴠᴀ́ʟɪᴅᴏ.*');
    }

    if (typeof saveOwner !== 'function') {
      return m.reply('*[ ❌ ] ᴇʀʀᴏʀ ɪɴᴛᴇʀɴᴏ: sᴀᴠᴇᴏᴡɴᴇʀ ɴᴏ ᴇs ᴜɴᴀ ғᴜɴᴄɪᴏ́ɴ.*');
    }

    saveOwner(number);
    m.reply(`*[ ✅ ] ᴇʟ ɴᴜ́ᴍᴇʀᴏ ${number} ᴀʜᴏʀᴀ ᴇs ᴜɴ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*`);
  }
};