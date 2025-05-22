import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
  command: ['addplugin', 'agregarplugin', 'añadirplugin', 'ap'],
  help: ['*Ⓐᴅᴅᴘʟᴜɢɪɴ <ʀᴘᴅ ᴀ ᴜɴ ᴀʀᴄʜɪᴠᴏ .ᴊs>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ʟᴏ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.*');

    const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ||
                      m.message?.documentMessage;

    if (!quotedMsg || !quotedMsg.fileName.endsWith('.js')) {
      return await m.reply('*[ ❌ ] ʀᴇsᴘᴏɴᴅᴇ́ ᴀ ᴜɴ ᴀʀᴄʜɪᴠᴏ `.ᴊs` ᴠᴀ́ʟɪᴅᴏ ᴘᴀʀᴀ ᴀɢʀᴇɢᴀʀ ᴄᴏᴍᴏ ᴘʟᴜɢɪɴ.*');
    }

    const stream = await downloadContentFromMessage(quotedMsg, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.join('./plugins', quotedMsg.fileName);
    fs.writeFileSync(filePath, buffer);
    
    await m.reply(`*[ ✅ ] ᴘʟᴜɢɪɴ ɢᴜᴀʀᴅᴀᴅᴏ ᴄᴏᴍᴏ ${quotedMsg.fileName}.*\n*ʀᴇᴄᴀʀɢᴀɴᴅᴏ...*`);

    setTimeout(async () => {
      const { loadPlugins } = await import('../../lib/handler.js');
      await loadPlugins();
    }, 500);
  }
};