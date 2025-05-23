import fs from 'fs';
import PDFDocument from 'pdfkit';

export default {
  command: ['crearpdf', 'pdf'],
  help: ['*Ⓒʀᴇᴀʀᴘᴅғ <ᴛᴇxᴛᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ/𝕆𝕋ℝ𝕆𝕊*'],

  run: async (m, { args, conn, chatId, prefix, command }) => {
    const texto = args.join(' ');
    if (!texto) return m.tutorial(`*[ ❗ ] ᴇsᴄʀɪʙᴇ ᴀʟɢᴏ ᴘᴀʀᴀ ᴄᴏɴᴠᴇʀᴛɪʀʟᴏ ᴀ ᴘᴅғ.* (ᴇᴊ: *${prefix + command}* _Texto_`);

    const nombreArchivo = `archivo_${Date.now()}.pdf`;
    const filePath = `./lib/pdf/${nombreArchivo}`;

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(14).text(texto, { lineGap: 4 });
    doc.end();

    stream.on('finish', async () => {
      const buffer = fs.readFileSync(filePath);
      await conn.sendMessage(chatId, {
        document: buffer,
        mimetype: 'application/pdf',
        fileName: nombreArchivo,
        caption: '📄 *¡ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴛᴜ ᴘᴅғ!*'
      }, { quoted: m });

      fs.unlinkSync(filePath);
    });

    stream.on('Error', (err) => {
      console.error(err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    });
  }
};