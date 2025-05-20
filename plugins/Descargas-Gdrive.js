import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export default {
  command: ['gdrive'],
  help: ['𝙶𝙳𝚁𝙸𝚅𝙴 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙶𝙳𝚛𝚒𝚟𝚎> <𝚎𝚡𝚝𝚎𝚗𝚜𝚒ó𝚗>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { text, conn, chatId }) => {
    if (!text) 
      return m.reply('✳️ Che, usá: *gdrive <link> <extensión>* para bajarte el archivo.');

    const [url, ext] = text.split(' ');
    if (!url || !ext) 
      return m.reply('✳️ Tenés que poner el link y la extensión (ej: mp4, mp3, apk, etc).');

    const outputDir = './lib/gdrive';
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const fileName = `gdrive_${Date.now()}.${ext}`;
    const filePath = path.join(outputDir, fileName);

    await m.reply('📥 Bajando el archivo, aguanta un cachito...');

    const gdown = spawn('gdown', ['--fuzzy', '-O', filePath, url]);

    gdown.stderr.on('data', (data) => {
      console.error(`❗ gdown error: ${data.toString().trim()}`);
    });

    gdown.on('close', async (code) => {
      if (code !== 0) return m.reply('❎ Ups, hubo un error bajando el archivo.');

      if (!fs.existsSync(filePath)) 
        return m.reply('🔍 No pude encontrar el archivo que descargué.');

      const stat = fs.statSync(filePath);
      if (stat.size === 0) {
        fs.unlinkSync(filePath);
        return m.reply('⚠️ El archivo que bajé está vacío. Probá con otro link.');
      }

      await conn.sendMessage(chatId, {
        document: { url: filePath },
        fileName,
        mimetype: ext === 'mp3' ? 'audio/mpeg' 
                : ext === 'mp4' ? 'video/mp4' 
                : ext === 'zip' ? 'application/zip' 
                : 'application/octet-stream',
      }, { quoted: m });

      fs.unlinkSync(filePath);
      console.log(`✅ Archivo ${fileName} enviado y borrado de temp.`);
    });
  }
};