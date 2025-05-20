import fs from 'fs';                 
import PDFDocument from 'pdfkit';   
import path from 'path';            

export default {
  help: ['𝙲𝚁𝙴𝙰𝚁𝙿𝙳𝙵 <𝚝𝚎𝚡𝚝𝚘>'],
  tags: ['⚙️ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗗𝗢𝗥'],
  command: ['crearpdf', 'pdf'],

  run: async (m, { args, conn, chatId }) => {
    const texto = args.join(' ');
    if (!texto) return m.reply('⚠️ *¡Ups!* Tenés que escribir algo para convertir en PDF. ✍️');

    const doc = new PDFDocument();
    const filePath = `./tmp/archivo_${Date.now()}.pdf`;
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(14).text(texto);
    doc.end();

    stream.on('finish', async () => {
      const buffer = fs.readFileSync(filePath);
      await conn.sendMessage(
        chatId,
        {
          document: buffer,
          mimetype: 'application/pdf',
          fileName: '📄 archivo.pdf'
        },
        { quoted: m }
      );
      fs.unlinkSync(filePath);
    });

    stream.on('error', (err) => {
      console.error(err);
      m.reply('❌ *Error:* Ocurrió un problema al generar el PDF. Intentá de nuevo más tarde. 🛠️');
    });
  }
};