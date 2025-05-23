import axios from 'axios';

let lastMemeId = null; // para evitar repetir el último

export default {
  command: ['meme', 'memardo'],
  help: ['*Ⓜᴇᴍᴇ*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { conn, chatId }) => {
    await m.reply('*[ ⏳ ] ʙᴜsᴄᴀɴᴅᴏ ᴍᴇᴍᴇ...*');

    try {
      const res = await axios.get('https://www.reddit.com/r/memesenespanol/hot.json?limit=30', {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });

      const posts = res.data.data.children
        .filter(post => post.data.post_hint === 'image' && post.data.id !== lastMemeId);

      if (!posts.length) return m.reply('*[ ⚠️ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ᴍᴇᴍᴇs ɴᴜᴇᴠᴏs.*');

      const random = posts[Math.floor(Math.random() * posts.length)];
      const { title, url, id } = random.data;
      lastMemeId = id;

      await conn.sendMessage(chatId, {
        image: { url },
        caption: `🎭 *ᴍᴇᴍᴇ*\n\n• 📛 *ᴛɪ́ᴛᴜʟᴏ:* ${title}`
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('*[ ❗ ] Error al obtener el meme.*');
    }
  }
};