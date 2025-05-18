import { writeFile, readFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'child_process';
import axios from 'axios';

export const stickerBuffer = async (url, pack = 'Stickers Bot', author = 'Leo') => {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  const inputPath = join(tmpdir(), `${uuidv4()}.jpg`);
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
      if (code === 0) return resolve();
      reject(new Error('Error al convertir con ffmpeg'));
    });
  });

  const buffer = await readFile(outputPath);
  await unlink(inputPath);
  await unlink(outputPath);
  return buffer;
};