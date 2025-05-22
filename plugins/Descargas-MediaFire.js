import { mediafireDl } from '../lib/scraping/scraper.js';

export default {
command: ['mediafire', 'mf', 'mfire', 'mediafiredl'],
help: ['*Ⓜᴇᴅɪᴀғɪʀᴇ <ʟɪɴᴋ>*'],
tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

run: async (m, { conn, text, chatId }) => {
if (!text || !text.includes("mediafire.com")) {
return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴠᴀ́ʟɪᴅᴏ ᴅᴇ ᴍᴇᴅɪᴀғɪʀᴇ.* (ᴇᴊ: *${prefix + command}* _https://mediafire.com/_)`);
}

await m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴛᴜ ᴀʀᴄʜɪᴠᴏ...*');  

try {  
  const data = await mediafireDl(text);  
  if (!data || !data.link) {  
    return m.reply('*[ 🔍 ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜ́ɴ ᴀʀᴄʜɪᴠᴏ ᴇɴ ᴇsᴇ ʟɪɴᴋ.*');  
  }  

  await conn.sendMessage(chatId, {  
    document: { url: data.link },  
    mimetype: data.mime || 'application/octet-stream',  
    fileName: data.name || 'archivo',  
    caption: `*📂 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄𝐋 𝐀𝐑𝐂𝐇𝐈𝐕𝐎:*  
    📄 *ɴᴏᴍʙʀᴇ:* ${data.name}  
    📦 *ᴛᴀᴍᴀɴ̃ᴏ:* ${data.size}  
    ᴍᴀᴅᴇ ʙʏ: ᴢᴇɴʙᴏᴛ 
    `.trim()  
  }, { quoted: m });  

} catch (error) {  
  console.error('Error:', error);  
  m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
}
}
};

