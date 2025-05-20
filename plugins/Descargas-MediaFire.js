import { mediafireDl } from '../lib/scraping/scraper.js';

export default {
command: ['mediafire', 'mf', 'mfire', 'mediafiredl'],
help: ['𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴 <𝚕𝚒𝚗𝚔>'],
tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

run: async (m, { conn, text, chatId }) => {
if (!text || !text.includes("mediafire.com")) {
return m.reply('✳️ Pasame un link válido de Mediafire, che.');
}

await m.reply('⏳ *Descargando tu archivo, bancá un toque...*');  

try {  
  const data = await mediafireDl(text);  
  if (!data || !data.link) {  
    return m.reply('❌ *No encontré ningún archivo en ese link.*');  
  }  

  await conn.sendMessage(chatId, {  
    document: { url: data.link },  
    mimetype: data.mime || 'application/octet-stream',  
    fileName: data.name || 'archivo',  
    caption: `✅ *Archivo descargado con éxito!*  
    📄 *Nombre:* ${data.name}  
    📦 *Tamaño:* ${data.size}  
    ¡Listo para usar!  
    `.trim()  
  }, { quoted: m });  

} catch (error) {  
  console.error('❌ Error en comando Mediafire:', error);  
  m.reply(`

⚠️ Ocurrió un error al descargar desde Mediafire.

Probá lo siguiente:
➤ Verificá que el link esté activo.
➤ Asegurate de que sea un archivo público.
➤ Volvé a intentar más tarde.
`);
}
}
};

