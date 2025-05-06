import { ytSearch } from '../lib/scraping/Zen-Yt-search.js';

export default {
  command: ['ytsearch', 'ytbuscar', 'buscaryt', 'yts'],
  help: ['𝚈𝚃𝚂𝙴𝙰𝚁𝙲𝙷 <𝚝𝚎𝚇𝚝𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { conn, text, chatId }) => {
    if (!text) return m.reply('🔍 Escribí algo para buscar en YouTube.');

    try {
      const results = await ytSearch(text);
      if (!results.length) return m.reply('❌ No se encontraron resultados.');

      const [first, ...others] = results;

      const caption = `
✨ *Resultados para:* _${text}_

🎬 *${first.title}*
📺 Canal: ${first.channel}
⏱️ Duración: ${first.duration}
🔗 ${first.url}

${others.map(video => 
`━━━━━━━━━━━━━━
🎬 *${video.title}*
📺 Canal: ${video.channel}
⏱️ Duración: ${video.duration}
🔗 ${video.url}`).join('\n')}
      `.trim();

      await conn.sendMessage(chatId, {
        image: { url: first.thumbnail },
        caption
      }, { quoted: m });

    } catch (e) {
      console.error('Error en ytsearch plugin:', e);
      m.reply('⚠️ Ocurrió un error al buscar en YouTube.');
    }
  }
};