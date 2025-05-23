export default {
  command: ['encriptar'],
  help: ['*Ⓔɴᴄʀɪᴘᴛᴀʀ <ᴛɪᴘᴏ>: <ᴛᴇxᴛᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { text, prefix, command }) => {
    if (!text) {
      return m.reply(`*[ ❗ ] ᴜsᴀ́ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴀsɪ́:*\n${prefix + command} base64: hola mundo\n\n*𝐓𝐈𝐏𝐎𝐒 𝐒𝐎𝐏𝐎𝐑𝐓𝐀𝐃𝐎𝐒:*\n• base64\n• hex\n• rot13\n• url\n• binario\n• unicode`);
    }

    const partes = text.match(/^([a-zA-Z0-9]+)\s*[:>\-|=>]\s*(.+)$/);
    if (!partes || partes.length < 3) {
      return m.reply(`*[❗] ғᴏʀᴍᴀᴛᴏ ɪɴᴄᴏʀʀᴇᴄᴛᴏ*\n\nᴜsᴀ́ ᴀsɪ́:\n${prefix + command} base64: hola mundo`);
    }

    const tipo = partes[1].trim().toLowerCase();
    const mensaje = partes[2].trim();

    let resultado;

    try {
      switch (tipo) {
        case 'base64':
          resultado = Buffer.from(mensaje).toString('base64');
          break;
        case 'hex':
          resultado = Buffer.from(mensaje).toString('hex');
          break;
        case 'rot13':
          resultado = mensaje.replace(/[a-zA-Z]/g, c =>
            String.fromCharCode(
              (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13)
                ? c
                : c - 26
            )
          );
          break;
        case 'url':
          resultado = encodeURIComponent(mensaje);
          break;
        case 'binario':
          resultado = mensaje.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          break;
        case 'unicode':
          resultado = mensaje.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
          break;
        default:
          return m.reply(`*[❗] ᴛɪᴘᴏ ɴᴏ sᴏᴘᴏʀᴛᴀᴅᴏ.*\n\nᴛɪᴘᴏs: base64, hex, rot13, url, binario, unicode`);
      }

      m.reply(`🔐 *ʀᴇsᴜʟᴛᴀᴅᴏ (${tipo}):*\n\n${resultado}`);
    } catch (err) {
      console.error(err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};