export default {
  command: ['desencriptar'],
  help: ['*Ⓓᴇsᴇɴᴄʀɪᴘᴛᴀʀ <ᴛᴇxᴛᴏ ᴄᴏᴅɪғɪᴄᴀᴅᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`*[ ❗ ] ᴜsᴀ́ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴀsɪ́:*\n${prefix + command} <texto>\n\n*𝐓𝐈𝐏𝐎𝐒 𝐒𝐎𝐏𝐎𝐑𝐓𝐀𝐃𝐎𝐒:*\n• base64\n• hex\n• rot13\n• url\n• binario\n• unicode`);

    function esTextoLegible(str) {
      return typeof str === 'string' && str.length > 0 && /^[\x20-\x7E\s]*$/.test(str);
    }

    try {
      const base64 = Buffer.from(text, 'base64').toString('utf-8');
      if (esTextoLegible(base64)) return m.reply(`📦 *ʙᴀsᴇ64:*\n${base64}`);
    } catch {}

    try {
      const hex = Buffer.from(text, 'hex').toString('utf-8');
      if (esTextoLegible(hex)) return m.reply(`#️⃣ *ʜᴇxᴀᴅᴇᴄɪᴍᴀʟ:*\n${hex}`);
    } catch {}

    try {
      if (/^[01\s]+$/.test(text)) {
        const binario = text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
        if (esTextoLegible(binario)) return m.reply(`⚙️ *ʙɪɴᴀʀɪᴏ:*\n${binario}`);
      }
    } catch {}

    try {
      const urlDecoded = decodeURIComponent(text);
      if (urlDecoded !== text && esTextoLegible(urlDecoded)) return m.reply(`🌐 *ᴜʀʟ ᴄᴏᴅɪғɪᴄᴀᴅᴀ:*\n${urlDecoded}`);
    } catch {}

    try {
      if (/\\u[\dA-F]{4}/i.test(text)) {
        const unicode = text.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/, ''), 16)));
        if (esTextoLegible(unicode)) return m.reply(`✨ *ᴜɴɪᴄᴏᴅᴇ:*\n${unicode}`);
      }
    } catch {}

    try {
      const rot13 = text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
      });
      if (rot13 !== text && esTextoLegible(rot13)) return m.reply(`🔄 *ʀᴏᴛ13:*\n${rot13}`);
    } catch {}

    return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
  }
};