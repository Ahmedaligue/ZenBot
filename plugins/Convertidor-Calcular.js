export default {
  command: ['calcular', 'calc'],
  help: ['*ⓒᴀʟᴄᴜʟᴀʀ <ᴇxᴘʀᴇsɪᴏ́ɴ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { text, command, prefix }) => {
    if (!text) return m.reply(`*[ ❗ ] ᴜsᴀ́ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴀsɪ́:*\n${prefix + command} (12 + 8) * 2`);

    try {
      if (!/^[\d+\-*/().\s]+$/.test(text)) {
        return m.reply('*[❗] sᴏʟᴏ ᴘᴏᴅᴇs ᴜsᴀʀ ɴᴜ́ᴍᴇʀᴏs ʏ ᴏᴘᴇʀᴀᴅᴏʀᴇs ᴍᴀᴛᴇᴍᴀ́ᴛɪᴄᴏs.*');
      }

      const resultado = eval(text);
      m.reply(`🧮 *ʀᴇsᴜʟᴛᴀᴅᴏ:*\n\n${text} = ${resultado}`);
    } catch (err) {
      m.reply('*[❗] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴀʟ ᴄᴀʟᴄᴜʟᴀʀ ʟᴀ ᴇxᴘʀᴇsɪᴏ́ɴ.*');
    }
  }
};