import { config } from '../config.js';

export default {
  command: ['cambiarprefijo', 'setprefix', 'nuevoprefix', 'nuevoprefijo'],
  help: ['*Ⓢᴇᴛᴘʀᴇғɪx <ɴᴜᴇᴠᴏ ᴘʀᴇғɪᴊᴏ>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { conn, args, isOwner }) => {
    if (!isOwner) {
      await m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');
      return;
    }

    if (args.length === 0) {
      await m.reply('*[ ❌ ] ᴘᴏʀ ғᴀᴠᴏʀ, ɪɴɢʀᴇsᴀ ᴇʟ ɴᴜᴇᴠᴏ ᴘʀᴇғɪᴊᴏ.*');
      return;
    }

    const nuevoPrefijo = args[0];

    if (nuevoPrefijo.trim() === '') {
      await m.reply('*[ ❌ ] ᴇʟ ᴘʀᴇғɪᴊᴏ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴏ.*');
      return;
    }

    config.prefix = nuevoPrefijo;

    await m.reply(`[ ✅ ] *ᴇʟ ᴘʀᴇғɪᴊᴏ ʜᴀ sɪᴅᴏ ᴄᴀᴍʙɪᴀᴅᴏ ᴀ: ${nuevoPrefijo}*`);
  }
};