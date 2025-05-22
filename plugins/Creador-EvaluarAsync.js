import util from 'util';

export default {
  command: ['=>'],
  help: ['*=> (ᴄᴏ́ᴅɪɢᴏ ᴀsʏɴᴄ)*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { text, conn, isOwner }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');
    if (!text) return m.reply('*¿ϙᴜᴇ́ ϙᴜɪᴇʀᴇs ᴇᴠᴀʟᴜᴀʀ?*');
    try {
      let evaled = await (async () => eval(text))();
      if (typeof evaled !== 'string') evaled = util.inspect(evaled);
      m.reply(evaled);
    } catch (err) {
      m.reply('*[ ❌ ] ᴇʀʀᴏʀ:*\n' + err);
    }
  }
};