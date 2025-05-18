import yts from 'yt-search';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { File } from 'megajs';
import mimeTypes from 'mime-types';
import { search, ytmp3, ytmp4 } from '@vreden/youtube_scraper';

// --- Funciones ---

export async function play(titulo, tipo = 'audio') {
  try {
    const isLink = titulo.includes('https://');
    let pesquisaR;
    if (!isLink) {
      const searchResults = await yts(titulo);
      pesquisaR = searchResults.videos[0];
    } else {
      pesquisaR = { url: titulo };
    }

    let mediaData;
    if (tipo == 'audio') {
      mediaData = await ytmp3(pesquisaR.url);
    } else {
      mediaData = await ytmp4(pesquisaR.url);
    }

    return {
      title: mediaData.metadata.title,
      canal: mediaData.metadata.author.name,
      duration: mediaData.metadata.timestamp,
      views: mediaData.metadata.views,
      thumb: mediaData.metadata.thumbnail,
      audio: mediaData.download.url,
      video: mediaData.download.url,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function mediafireDl(url) {
  try {
    // URL traducida para evitar bloqueos regionales
    const translatedUrl = `https://www-mediafire-com.translate.goog/${url.replace(
      'https://www.mediafire.com/',
      ''
    )}${url.includes('?') ? '&' : '?'}_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=wapp`;

    const res = await axios.get(translatedUrl);
    const $ = cheerio.load(res.data);

    // Extraer link de descarga
    let link = $('#downloadButton').attr('href');
    if (!link) {
      throw new Error('Download link not found.');
    }

    if (link.startsWith('https://www.mediafire.com')) {
      console.log('Retrying download...');
      return await mediafireDl(url);
    }

    // Extraer nombre y tamaño
    const name = $('div.promoDownloadName.notranslate > div')
      .attr('title')
      .trim()
      .replace(/\s+/g, '');
    const size = $('#downloadButton')
      .text()
      .replace(/Download|||\s+/g, '')
      .trim();

    // Obtener MIME type con HEAD
    let mime = '';
    const headRes = await axios.head(link);
    mime = headRes.headers['content-type'];

    return { name, size, mime, link };
  } catch (error) {
    console.error('Error fetching Mediafire download:', error.message);
    return null;
  }
}

export async function ApkPure(text) {
  const response = await axios.get(
    `https://apkpure.com/api/v2/search?q=${encodeURIComponent(text)}`
  );
  const response2 = await axios.get(
    `https://apkpure.com/api/v2/download?id=${response[0].id}`
  );
  return response2.data;
}

export async function pinterest(texto) {
  const url = 'https://br.pinterest.com/search/pins/?q=' + texto;
  const config = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 10; SM-G975F Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36',
    },
  };
  try {
    const response = await axios.get(url, config);
    const $ = cheerio.load(response.data);
    const fotos = [];
    $('.hCL').each((index, element) => {
      const url = $(element).attr('src');
      if (url.startsWith('https://i.pinimg.com/236x')) {
        fotos.push(url.replace(/236/g, '736'));
      }
    });
    return fotos;
  } catch (error) {
    console.error('Erro ao obter o HTML da página:', error);
    return { status: false, error: 'Erro ao obter as imagens' };
  }
}

export async function googleImage(query) {
  try {
    const response = await axios.get(
      `https://www.google.com/search?q=${query}&tbm=isch`
    );
    const $ = cheerio.load(response.data);
    const imageUrls = [];
    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src');
      if (imageUrl && imageUrl.startsWith('https')) {
        imageUrls.push(imageUrl);
      }
    });
    return imageUrls;
  } catch (error) {
    console.log('Error:', error);
    return { status: false };
  }
}

export async function stickerSearch(text) {
  try {
    const response = await axios.get(
      `https://getstickerpack.com/stickers?query=${text}`
    );
    const $ = cheerio.load(response.data);
    const packs = $('.sticker-pack-block');
    if (packs.length === 0)
      return { status: false, text: 'nenhum resultado encontrado' };
    const randomIndex = Math.floor(Math.random() * packs.length);
    const selectedPack = $(packs[randomIndex]);
    const title = selectedPack.find('.title').text().trim();
    const creator = selectedPack.find('.username').text().trim();
    const packLink = selectedPack.closest('a').attr('href');
    const packResponse = await axios.get(packLink);
    const packHtml = cheerio.load(packResponse.data);
    const images = packHtml('.sticker-pack-cols img');
    const totalImages = images.length;
    const imageArray = [];
    images.each((i, img) => {
      if (i < 10) imageArray.push(packHtml(img).attr('src'));
    });
    return { status: true, nome: title, criador: creator, total: totalImages, fotos: imageArray };
  } catch (error) {
    return { status: false, text: 'Erro ao acessar o site' };
  }
}