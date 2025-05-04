import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
  command: ['addplugin', 'agregarplugin', 'añadirplugin', 'ap'],
  help: ['𝙰𝙳𝙳𝙿𝙻𝚄𝙶𝙸𝙽 (𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 .𝙹𝚂)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],
  owner: true,
  run: async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');

    const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ||
                      m.message?.documentMessage;

    if (!quotedMsg || !quotedMsg.fileName.endsWith('.js')) {
      return await m.reply('[ ❌ ] *Respondé a un archivo `.js` válido para agregar como plugin.*');
    }

    const stream = await downloadContentFromMessage(quotedMsg, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.join('./plugins', quotedMsg.fileName);
    fs.writeFileSync(filePath, buffer);
    
    await m.reply(`[ ✅ ] *Plugin guardado como ${quotedMsg.fileName}.*\n*Recargando...*`);

    setTimeout(async () => {
      const { loadPlugins } = await import('../../lib/handler.js');
      await loadPlugins();
    }, 500);
  }
};