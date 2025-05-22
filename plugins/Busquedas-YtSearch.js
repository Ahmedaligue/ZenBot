import { ytSearch } from '../lib/scraping/Zen-Yt-search.js';

export default {
  command: ['ytsearch', 'ytbuscar', 'buscaryt', 'yts'],
  help: ['*Ⓨᴛsᴇᴀʀᴄʜ <ᴛᴇʀᴍɪɴᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],
  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text) return m.tutorial(`*[ ❗ ] ᴇsᴄʀɪʙᴇ ᴀʟɢᴏ ᴘᴀʀᴀ ʙᴜsᴄᴀʀ ᴇɴ ʏᴏᴜᴛᴜʙᴇ.* (ᴇᴊ: *${prefix + command}* _Termino de búsqueda_`);

    try {
      const results = await ytSearch(text);
      if (!results.length) return m.reply('*[ ❌ ] ʟᴏ sɪᴇɴᴛᴏ, ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴᴀᴅᴀ ʀᴇʟᴀᴄɪᴏɴᴀᴅᴏ ᴄᴏɴ ᴇsᴏ.*');

      const [first, ...others] = results;

      const caption = `
✨ *𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 𝐏𝐀𝐑𝐀:* _${text}_

🎬 *${first.title}*
*📺 ᴄᴀɴᴀʟ:* ${first.channel}
*⏱️ ᴅᴜʀᴀᴄɪᴏ́ɴ:* ${first.duration}
*🔗 ᴜʀʟ:* ${first.url}

${others.map(video => 
`━━━━━━━━━━━━━━
🎬 *${video.title}*
*📺 ᴄᴀɴᴀʟ:* ${video.channel}
*⏱️ ᴅᴜʀᴀᴄɪᴏ́ɴ:* ${video.duration}
*🔗 ᴜʀʟ:* ${video.url}`).join('\n')}
      `.trim();

      await conn.sendMessage(chatId, {
        image: { url: first.thumbnail },
        caption
      }, { quoted: m });

    } catch (e) {
      console.error('Error:', e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};