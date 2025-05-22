import { config } from '../config.js';
import fs from 'fs';
import path from 'path';

export default {
  command: ['menu', 'menú', 'help', 'ayuda', 'allmenu', 'menucompleto', 'menúcompleto'],
  help: ['*Ⓜᴇɴᴜ*'],
  tags: ['*𝕀ℕ𝔽𝕆𝔹𝕆𝕋*'],

  run: async (m, { conn, plugins, prefix, sender }) => {
    const hora = new Date().getHours();
    const saludo = hora >= 5 && hora < 12 ? '🌅 ʙᴜᴇɴᴏs ᴅɪ́ᴀs' : hora >= 12 && hora < 18 ? '🌞 ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs' : '🌙 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs';
    const userTag = '@' + (m.pushName || sender.split('@')[0]);
    const uptime = process.uptime() * 1000;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / (1000 * 60)) % 60;
    const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(uptime / (1000 * 60 * 60 * 24 * 30));
    const activeTime = months > 0 ? `${months} ᴍᴇs${months !== 1 ? 'ᴇs' : ''}`  
                    : days > 0 ? `${days} ᴅɪ́ᴀ${days !== 1 ? 's' : ''}`  
                    : hours > 0 ? `${hours} ʜᴏʀᴀ${hours !== 1 ? 's' : ''}`  
                    : minutes > 0 ? `${minutes} ᴍɪɴᴜᴛᴏ${minutes !== 1 ? 's' : ''}`  
                    : `${seconds} sᴇɢᴜɴᴅᴏ${seconds !== 1 ? 's' : ''}`;
    const categorias = plugins.reduce((acc, plugin) => {
      if (plugin?.help && plugin?.tags) {
        plugin.tags.forEach(tag => {
          if (!acc[tag]) acc[tag] = [];
          acc[tag].push(...plugin.help.map(cmd => `${prefix}${cmd}`));
        });
      }
      return acc;
    }, {});
    let menuCategorias = '';
    let totalCommands = 0;
    Object.entries(categorias).forEach(([cat, cmds]) => {
      menuCategorias += `\n╭──  ׁ    ◌  ۪ ${cat.toUpperCase()}\nㅤ     ┈───┈  ─┈─  ┈───┈\n${cmds.map(cmd => ` ׄ 💙ׅ  ⤾ ${cmd}`).join('\n')}\n   ㅤ ┈───┈  ─┈─  ┈───┈\n╰──  ׅ     ׁ   >ＺＥＮ-ＢＯＴ<\n`;
      totalCommands += cmds.length;
    });

    const menu = `

${saludo}, ${userTag}!
╭─────────────✧
│• ⏱️ *ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ: ${activeTime}*
│• 🔖 *ᴠᴇʀsɪᴏ́ɴ: 1.0.0*
│• 👤 *ᴄʀᴇᴀᴅᴏʀ: ᴀxᴇʟᴅᴇᴠ*
│• ⚙️ *ᴘʀᴇғɪᴊᴏ: ${prefix}*
│• 📦 *ᴛᴏᴛᴀʟ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs: ${totalCommands}*
╰─────────────✧
${menuCategorias}`.trim();

    const imgPath = path.join('./media/Menu-ZenBot.jpg');
    const thumbPath = path.join('./media/Menu-ZenBot.png');

    await conn.sendMessage(m.key.remoteJid, {
      image: fs.readFileSync(imgPath),
      caption: menu,
      mentions: [sender],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝒁𝒆𝒏𝑩𝒐𝒕 - 𝑨𝒙𝒆𝒍𝑫𝒆𝒗⁰⁹',
          newsletterJid: "120363167110224267@newsletter",
        },
        externalAdReply: {
          title: `ᴏʀɪɢɪɴᴀʟ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ✅`,
          body: 'ˢⁱ́ᵍᵘᵉᵐᵉ ᵉⁿ ⁱⁿˢᵗᵃᵍʳᵃᵐ',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnail: fs.readFileSync(thumbPath),
          sourceUrl: config.instagram
        }
      }
    });
  }
};