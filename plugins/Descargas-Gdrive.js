import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export default {
  command: ['gdrive'],
  help: ['gdrive <link de Google Drive> <extensión>'],
  tags: ['descargas'],

  run: async (m, { text, conn, chatId }) => {
    if (!text) return m.reply('Usa: gdrive <link> <extensión>');
    const [url, ext] = text.split(' ');
    if (!url || !ext) return m.reply('Debes poner link y extensión (mp4, mp3, apk, etc)');

    const outputDir = './temp';
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const fileName = `gdrive_${Date.now()}.${ext}`;
    const filePath = path.join(outputDir, fileName);

    await m.reply('Descargando archivo, espera un momento...');

    const gdown = spawn('gdown', ['--fuzzy', '-O', filePath, url]);

    gdown.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    gdown.on('close', async (code) => {
      if (code !== 0) return m.reply('Error al descargar archivo.');

      if (!fs.existsSync(filePath)) return m.reply('No se encontró el archivo descargado.');

      const stat = fs.statSync(filePath);
      if (stat.size === 0) {
        fs.unlinkSync(filePath);
        return m.reply('El archivo descargado está vacío.');
      }

      await conn.sendMessage(chatId, { 
        document: { url: filePath },
        fileName,
        mimetype: ext === 'mp3' ? 'audio/mpeg' : ext === 'mp4' ? 'video/mp4' : ext === 'zip' ? 'application/zip' : 'application/octet-stream',
      }, { quoted: m });

      fs.unlinkSync(filePath);
    });
  }
};