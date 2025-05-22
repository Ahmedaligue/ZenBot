import { exec } from 'child_process';

export default {
  command: ['$'],
  help: ['*$ (ᴄᴏᴍᴀɴᴅᴏ)*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { isOwner, text }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');
    if (!text) return m.reply('*¿ϙᴜᴇ́ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇsᴇᴀs ᴇᴊᴇᴄᴜᴛᴀʀ??*');

    exec(text, (err, stdout, stderr) => {
      if (err) {
        console.error('Error:', err);
        return m.reply('*[ ❌ ] ᴇʀʀᴏʀ ᴀʟ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ:*\n' + stderr);
      }

      m.reply(stdout || '*[ ✅ ] ᴄᴏᴍᴀɴᴅᴏ ᴇᴊᴇᴄᴜᴛᴀᴅᴏ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ.*');
    });
  }
};