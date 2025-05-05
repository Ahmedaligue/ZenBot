import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export async function pinterestSearch(query) {
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
        // Convertir a versión original si es posible
        const highRes = src.replace(/\/\d+x\//, '/originals/');
        imageUrls.push(highRes);
      }
    });

    const unique = [...new Set(imageUrls)];
    return unique;
  } catch (e) {
    console.error('Error en pinterestSearch:', e);
    return [];
  }
}