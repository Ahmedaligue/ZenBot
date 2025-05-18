import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const pinterestSearch = async (query) => {
  try {
    const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
      }
    });

    const html = await res.text();
    const $ = cheerio.load(html);
    const imageUrls = [];

    $('img').each((i, el) => {
      const src = $(el).attr('src') || '';
      if (src.includes('i.pinimg.com') && /\.(jpg|jpeg|png)/.test(src)) {
        const highRes = src.replace(/\/\d+x\//, '/originals/');
        imageUrls.push(highRes);
      }
    });

    return [...new Set(imageUrls)];
  } catch (e) {
    console.error('Error en pinterestSearch:', e);
    return [];
  }
};

export { pinterestSearch };