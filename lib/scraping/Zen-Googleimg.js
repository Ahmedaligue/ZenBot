// Archivo: mi-fg.js
import axios from 'axios';
import * as cheerio from 'cheerio';

async function googleImage(query) {
  let url = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(query);
  let { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const $ = cheerio.load(data);
  let resultados = [];

  $('img').each((i, el) => {
    let src = $(el).attr('src');
    if (src && src.startsWith('http')) resultados.push(src);
  });

  return resultados;
}

export default {
  googleImage
};