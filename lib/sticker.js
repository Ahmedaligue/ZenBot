import { writeFile, readFile, unlink } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import axios from 'axios';

const tmp = tmpdir();

/** Convierte URL de imagen a sticker webp (solo imagen) */
export async function stickerBufferFromUrl(url, pack = 'Stickers Bot', author = 'Leo') {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  const inputPath = path.join(tmp, `${uuidv4()}.jpg`);
  const outputPath = inputPath.replace('.jpg', '.webp');

  await writeFile(inputPath, res.data);

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-i', inputPath,
      '-vcodec', 'libwebp',
      '-filter:v', 'fps=fps=15',
      '-lossless', '1',
      '-compression_level', '6',
      '-qscale', '75',
      '-preset', 'default',
      '-loop', '0',
      '-an', '-vsync', '0',
      '-s', '512:512',
      outputPath
    ]);

    ffmpeg.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error('Error al convertir con ffmpeg'));
    });
  });

  const buffer = await readFile(outputPath);
  await unlink(inputPath);
  await unlink(outputPath);
  return buffer;
}

/** Detecta tipo básico por firma de buffer */
function detectFileType(buffer) {
  if (!buffer || buffer.length < 4) return null;
  const signature = buffer.toString('hex', 0, 4);
  const types = {
    '89504e47': { ext: 'png', mime: 'image/png' },
    'ffd8ffe0': { ext: 'jpg', mime: 'image/jpeg' },
    'ffd8ffe1': { ext: 'jpg', mime: 'image/jpeg' },
    '66747970': { ext: 'mp4', mime: 'video/mp4' },
    '00000018': { ext: 'mp4', mime: 'video/mp4' },
    '52494646': { ext: 'webp', mime: 'image/webp' },
  };
  return types[signature] || null;
}

/** Ejecuta ffmpeg para crear sticker */
function runFFmpeg(inputPath, outputPath, isVideo = false, watermarkText = '') {
  return new Promise((resolve, reject) => {
    const fontFile = '/system/fonts/DroidSans.ttf'; // Cambiar si no existe o sacar watermark
    const safeText = watermarkText.replace(/:/g, '\\:').replace(/'/g, "\\'");
    const drawtext = watermarkText
      ? `drawtext=fontfile=${fontFile}:text='${safeText}':fontcolor=white:fontsize=24:borderw=2:bordercolor=black:x=(w-text_w)/2:y=h-th-10`
      : '';
    const vfFilter = isVideo
      ? `scale=512:512:force_original_aspect_ratio=decrease${drawtext ? ',' + drawtext : ''}`
      : `scale=512:512:force_original_aspect_ratio=decrease,fps=15${drawtext ? ',' + drawtext : ''}`;
    const args = isVideo
      ? ['-i', inputPath, '-vf', vfFilter, '-ss', '00:00:00.0', '-t', '00:00:09.0', '-f', 'webp', '-an', '-vsync', '0', outputPath]
      : ['-i', inputPath, '-vf', vfFilter, '-f', 'webp', outputPath];

    const ffmpeg = spawn('ffmpeg', args);

    let stderr = '';
    ffmpeg.stderr.on('data', (data) => { stderr += data.toString(); });
    ffmpeg.on('error', reject);

    ffmpeg.on('close', async (code) => {
      if (code !== 0) return reject(new Error(`ffmpeg error code: ${code}\n${stderr}`));
      try {
        const stickerBuffer = await readFile(outputPath);
        resolve(stickerBuffer);
      } catch (e) {
        reject(e);
      }
    });
  });
}

/** Convierte Buffer imagen a sticker y envía */
export async function sendImageAsSticker(conn, jid, buffer, m, watermarkText = '') {
  const type = detectFileType(buffer);
  if (!type || !type.mime.startsWith('image')) throw new Error('No es una imagen válida');
  const inputPath = path.join(tmp, `input.${type.ext}`);
  const outputPath = path.join(tmp, `output.webp`);
  fs.writeFileSync(inputPath, buffer);
  const stickerBuffer = await runFFmpeg(inputPath, outputPath, false, watermarkText);
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);
  return await conn.sendMessage(jid, { sticker: stickerBuffer }, { quoted: m });
}

/** Convierte Buffer video a sticker y envía */
export async function sendVideoAsSticker(conn, jid, buffer, m, watermarkText = '') {
  const type = detectFileType(buffer);
  if (!type || !type.mime.startsWith('video')) throw new Error('No es un video válido');
  const inputPath = path.join(tmp, `input.${type.ext}`);
  const outputPath = path.join(tmp, `output.webp`);
  fs.writeFileSync(inputPath, buffer);
  const stickerBuffer = await runFFmpeg(inputPath, outputPath, true, watermarkText);
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);
  return await conn.sendMessage(jid, { sticker: stickerBuffer }, { quoted: m });
}

/** Convierte un sticker webp a imagen PNG */
export async function toImg(buffer) {
  const inputPath = path.join(tmp, `${uuidv4()}.webp`);
  const outputPath = inputPath.replace('.webp', '.png');

  await writeFile(inputPath, buffer);

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-i', inputPath, outputPath]);

    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error('Error al convertir sticker a imagen'));
    });
  });

  const imageBuffer = await readFile(outputPath);
  await unlink(inputPath);
  await unlink(outputPath);
  return imageBuffer;
}