import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
  command: ['addplugin'],
  help: ['addplugin (responde a un archivo .js)'],
  tags: ['owner'],
  owner: true,
  run: async (m, { conn, isOwner }) => {
    if (!isOwner) return;

    const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ||
                      m.message?.documentMessage;

    if (!quotedMsg || !quotedMsg.fileName.endsWith('.js')) {
      return await conn.sendMessage(m.key.remoteJid, { text: '❌ Responde a un archivo `.js` válido para agregar como plugin.' }, { quoted: m });
    }

    const stream = await downloadContentFromMessage(quotedMsg, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.join('./plugins', quotedMsg.fileName);
    fs.writeFileSync(filePath, buffer);
    await conn.sendMessage(m.key.remoteJid, { text: `✅ Plugin guardado como ${quotedMsg.fileName}.\nRecargando...` }, { quoted: m });

    // Espera 500ms para evitar colisiones con la recarga automática
    setTimeout(async () => {
      const { loadPlugins } = await import('../../lib/handler.js');
      await loadPlugins();
    }, 500);
  }
};