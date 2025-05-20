import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export async function getFileBuffer(message, mediaType) {
  try {
    if (!message) throw new Error('No se recibió mensaje para descargar.');

    if (!mediaType) {
      if (message.message?.imageMessage) mediaType = 'image';
      else if (message.message?.videoMessage) mediaType = 'video';
      else if (message.message?.audioMessage) mediaType = 'audio';
      else if (message.message?.stickerMessage) mediaType = 'sticker';
      else if (message.message?.documentMessage) mediaType = 'document';
      else throw new Error('Tipo de media no reconocido en el mensaje.');
    }

    const media = message.message?.[`${mediaType}Message`];
    if (!media || !media.mediaKey) {
      throw new Error(`Mensaje no contiene mediaKey para tipo ${mediaType}.`);
    }

    const stream = await downloadContentFromMessage(message, mediaType);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  } catch (err) {
    console.error('[ERROR getFileBuffer]:', err);
    throw new Error('No se pudo obtener el archivo del mensaje.');
  }
}

export function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function formatNumber(number) {
  return Intl.NumberFormat('es-AR').format(number);
}

export function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}