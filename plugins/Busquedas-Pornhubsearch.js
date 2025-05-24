import axios from 'axios';
import * as cheerio from 'cheerio';

export default {
  command: ['pornhubsearch', 'phsearch'],
  help: ['*Ⓟᴏʀɴʜᴜʙsᴇᴀʀᴄʜ <ᴛᴇʀᴍɪɴᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { args, conn, chatId, prefix, command }) => {
    const query = args.join(' ');
    if (!query) {
      return m.reply(`*[ 🔍 ] ᴇsᴄʀɪʙɪ́ ᴀʟɢᴏ ᴘᴀʀᴀ ʙᴜsᴄᴀʀ.*\n(ᴇᴊ: *${prefix + command}* _Lana rhoades_)`);
    }

    const url = `https://www.pornhub.com/video/search?search=${encodeURIComponent(query)}`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      const $ = cheerio.load(data);
      const results = [];

      $('li.videoBox').each((i, el) => {
        const a = $(el).find('a.linkVideoThumb');
        const href = a.attr('href');
        const img = a.find('img').attr('data-thumb_url') || a.find('img').attr('src');
        const title = $(el).find('span.title').text().trim();
        const duration = $(el).find('.duration').text().trim();

        if (href && img && title) {
          results.push({
            title,
            duration,
            link: 'https://www.pornhub.com' + href,
            img,
          });
        }
      });

      if (!results.length) return m.reply('*[ ❌ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ʀᴇsᴜʟᴛᴀᴅᴏs ᴘᴀʀᴀ ᴇsᴀ ʙᴜ́sϙᴜᴇᴅᴀ.*');

      const mensaje = results.slice(0, 12).map((res, i) => {
        return `*${i + 1}.* *${res.title}*\n⏱️ ᴅᴜʀᴀᴄɪᴏ́ɴ: _${res.duration}_\n🔗 [ᴠᴇʀ ᴠɪᴅᴇᴏ](${res.link})`;
      }).join('\n━━━━━━━━━━━━━━\n');

      await conn.sendMessage(chatId, {
        image: { url: results[0].img },
        caption: `🔞 *𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 𝐃𝐄 𝐁𝐔́𝐒𝐐𝐔𝐄𝐃𝐀 𝐏𝐀𝐑𝐀:* _${query}_\n━━━━━━━━━━━━━━\n\n${mensaje}`,
      });

    } catch (err) {
      console.error('Error al buscar:', err.message);
      m.reply('*[ ⚠️ ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ. ᴘʀᴏʙᴀ́ ᴅᴇ ɴᴜᴇᴠᴏ ᴍᴀ́s ᴛᴀʀᴅᴇ.*');
    }
  }
};