export default {
  command: ['acortar', 'shorturl'],
  help: ['*Ⓐᴄᴏʀᴛᴀʀ <ᴜʀʟ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`*[❗] ᴜsᴀ́ ᴀsɪ́:* ${prefix + command} https://example.com/link-largo`);

    if (!/^https?:\/\//i.test(text)) {
      return m.reply('*[❗] ᴇsᴏ ɴᴏ ᴘᴀʀᴇᴄᴇ ᴜɴᴀ ᴜʀʟ ᴠᴀ́ʟɪᴅᴀ.*');
    }

    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
      const short = await res.text();
      m.reply(`🔗 *ᴇsᴛᴇ ᴇs ᴛᴜ ʟɪɴᴋ ᴀᴄᴏʀᴛᴀᴅᴏ:*\n${short}`);
    } catch (err) {
      console.error(err);
      m.reply('*[❗] ɴᴏ sᴇ ᴘᴜᴅᴏ ᴀᴄᴏʀᴛᴀʀ ʟᴀ ᴜʀʟ.*');
    }
  }
};