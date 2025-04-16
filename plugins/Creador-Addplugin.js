import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
  command: ['addplugin', 'agregarplugin', 'añadirplugin', 'ap'],
  help: ['𝙰𝙳𝙳𝙿𝙻𝚄𝙶𝙸𝙽 (𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝚄𝙽 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 .𝙹𝚂)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],
  owner: true,
  run: async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');

    const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ||
                      m.message?.documentMessage;

    if (!quotedMsg || !quotedMsg.fileName.endsWith('.js')) {
      return await m.reply('[ ❌ ] *𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐮𝐧 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 `.𝐣𝐬` 𝐯𝐚́𝐥𝐢𝐝𝐨 𝐩𝐚𝐫𝐚 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐜𝐨𝐦𝐨 𝐩𝐥𝐮𝐠𝐢𝐧.*');
    }

    const stream = await downloadContentFromMessage(quotedMsg, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.join('./plugins', quotedMsg.fileName);
    fs.writeFileSync(filePath, buffer);
    
    await m.reply(`[ ✅ ] *𝐏𝐥𝐮𝐠𝐢𝐧 𝐠𝐮𝐚𝐫𝐝𝐚𝐝𝐨 𝐜𝐨𝐦𝐨 ${quotedMsg.fileName}.*\n*𝘙𝘦𝘤𝘢𝘳𝘨𝘢𝘯𝘥𝘰...*`);

    setTimeout(async () => {
      const { loadPlugins } = await import('../../lib/handler.js');
      await loadPlugins();
    }, 500);
  }
};