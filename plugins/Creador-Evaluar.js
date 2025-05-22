import { VM } from 'vm2';

export default {
  command: ['>'],
  help: ['*> (ᴇxᴘʀᴇsɪᴏ́ɴ)*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { text, isOwner }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');
    if (!text) return m.reply('*¿ϙᴜᴇ́ ϙᴜɪᴇʀᴇs ᴇᴠᴀʟᴜᴀʀ?*');

    const vm = new VM({
      timeout: 1000,
      sandbox: {}
    });

    try {
      const result = vm.run(text);
      m.reply(`*[ ✅ ] ʀᴇsᴜʟᴛᴀᴅᴏ:*\n${result}`);
    } catch (error) {
      m.reply(`*[ ❌ ] ᴇʀʀᴏʀ:*\n${error.message}`);
    }
  }
};