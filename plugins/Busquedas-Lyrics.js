import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default {
  command: ['lyrics', 'letra', 'letras'],
  help: ['*Ⓛʏʀɪᴄs <ᴛɪ́ᴛᴜʟᴏ ᴏ ᴛɪ́ᴛᴜʟᴏ + ᴀʀᴛɪsᴛᴀ> [--ᴇs]*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, prefix, command }) => {
    if (!text) return m.reply(`*[ ❗ ] ɪɴɢʀᴇsᴀ́ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ᴜɴᴀ ᴄᴀɴᴄɪᴏ́ɴ. (ᴇᴊ: ${prefix + command} Shivers - Ed Sheeran)*`);

    const traducir = text.toLowerCase().endsWith('--es') || text.toLowerCase().endsWith('-es');
    const consulta = traducir ? text.replace(/--?es$/i, '').trim() : text.trim();

    try {
      const query = encodeURIComponent(consulta);
      const searchUrl = `https://genius.com/api/search/multi?per_page=5&q=${query}`;
      const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const searchJson = await searchRes.json();

      const songSection = searchJson.response.sections.find(s => s.type === 'song');
      if (!songSection || songSection.hits.length === 0) {
        return m.reply('*[ ❌ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜɴᴀ ᴄᴀɴᴄɪᴏ́ɴ ᴠᴀ́ʟɪᴅᴀ ᴇɴ ɢᴇɴɪᴜs.*');
      }

      const songUrl = songSection.hits[0].result.url;
      const songPageRes = await fetch(songUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const songPageHtml = await songPageRes.text();
      const $ = cheerio.load(songPageHtml);

      const lyricContainers = $('div.Lyrics__Container, div.lyrics, div[class^="Lyrics__Container"]');
      let letra = '';

      lyricContainers.each((i, el) => {
        const htmlContent = $(el).html();

        if (htmlContent) {
          const textoFormateado = htmlContent
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/?[^>]+(>|$)/g, '')
            .trim();

          if (textoFormateado.length > 0) {
            letra += textoFormateado + '\n\n';
          }
        }
      });

      letra = letra.trim();
      const lines = letra.split('\n');
      const startIndex = lines.findIndex(line => line.match(/^.*/) || (line.trim().length > 0 && !line.toLowerCase().includes('contributors') && !line.toLowerCase().includes('translations')));

      if (startIndex > 0) {
        letra = lines.slice(startIndex).join('\n').trim();
      }

      if (!letra || letra.length < 10) return m.reply('*[ ❌ ] ɴᴏ ᴘᴜᴅᴇ ᴇxᴛʀᴀᴇʀ ʟᴀ ʟᴇᴛʀᴀ ᴅᴇ ɢᴇɴɪᴜs.*');

      if (traducir) {
        const res = await fetch('https://libretranslate.de/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: letra,
            source: 'en',
            target: 'es',
            format: 'text'
          })
        });

        const data = await res.json();
        if (data && data.translatedText) {
          letra = data.translatedText;
        } else {
          return m.reply('*[ ⚠️ ] ɴᴏ sᴇ ᴘᴜᴅᴏ ᴛʀᴀᴅᴜᴄɪʀ ʟᴀ ʟᴇᴛʀᴀ.*');
        }
      }

      const mensaje = `🎵 *${consulta}*${traducir ? ' (Letra traducida)' : ''}\n\n${letra.length > 4000 ? letra.slice(0, 4000) + '\n\n[Letra recortada...]' : letra}\n\n🔗 ${songUrl}`;
      await m.reply(mensaje);

    } catch (e) {
      console.error(e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};