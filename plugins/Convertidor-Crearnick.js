import axios from 'axios';

export default {
  command: ['crearnick', 'hacernick', 'nick'],
  help: ['*Ⓝɪᴄᴋ <ᴛᴇxᴛᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text) {
      return m.reply(`*[ ⚠️ ] ᴅᴇʙᴇ́s ᴇsᴄʀɪʙɪʀ ᴜɴ ᴛᴇxᴛᴏ ᴘᴀʀᴀ ɢᴇɴᴇʀᴀʀ ɴɪᴄᴋɴᴀᴍᴇs ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴏs.*\n\n📌 ᴇᴊᴇᴍᴘʟᴏ: *${prefix + command} AxelDev*`);
    }

    try {
      const res = await axios.get('https://nodz-apis.com.br/api/outras/fazer/nick', {
        params: {
          query: text,
          apiKey: '3e39fa09b0'
        }
      });

      const resultado = res.data?.resultado || [];

      if (!resultado.length) {
        return m.reply('*[ ❌ ] ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴏ́ ɴɪɴɢᴜ́ɴ ʀᴇsᴜʟᴛᴀᴅᴏ.*');
      }

      const lista = resultado.map(n => `🖌 *ғᴜᴇɴᴛᴇ:* ${n.fonte}\n✏️ *ɴɪᴄᴋ:* ${n.nome}`).join('\n\n');

      await conn.sendMessage(chatId, { text: lista }, { quoted: m });

    } catch (e) {
      console.error('Error:', e);
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};