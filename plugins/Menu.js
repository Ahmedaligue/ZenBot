import { config } from '../config.js';
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

export default {
  command: ['menu', 'menú', 'help', 'ayuda', 'allmenu', 'menucompleto', 'menúcompleto'],
  help: ['𝙼𝙴𝙽𝚄𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙾'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],

  run: async (m, { conn, plugins, prefix }) => {
    const hora = new Date().getHours();
    let saludo = '👋 ʜᴏʟᴀ';
    if (hora >= 5 && hora < 12) saludo = '🌅 ʙᴜᴇɴᴏs ᴅɪ́ᴀs';
    else if (hora >= 12 && hora < 18) saludo = '🌞 ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs';
    else saludo = '🌙 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs';

    const sender = m.sender || m.key.participant || m.key.remoteJid;
    const userTag = '@' + sender.split('@')[0];

    const uptime = process.uptime() * 1000;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / (1000 * 60)) % 60;
    const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(uptime / (1000 * 60 * 60 * 24 * 30));

    let activeTime = '';
    if (months > 0) activeTime = `${months} ᴍᴇs${months !== 1 ? 'ᴇs' : ''}`;
    else if (days > 0) activeTime = `${days} ᴅɪ́ᴀ${days !== 1 ? 's' : ''}`;
    else if (hours > 0) activeTime = `${hours} ʜᴏʀᴀ${hours !== 1 ? 's' : ''}`;
    else if (minutes > 0) activeTime = `${minutes} ᴍɪɴᴜᴛᴏ${minutes !== 1 ? 's' : ''}`;
    else activeTime = `${seconds} sᴇɢᴜɴᴅᴏ${seconds !== 1 ? 's' : ''}`;

    const categorias = {};
    for (const plugin of plugins) {
      if (!plugin?.help || !plugin.tags) continue;
      for (const tag of plugin.tags) {
        if (!categorias[tag]) categorias[tag] = [];
        categorias[tag].push(...plugin.help.map(cmd => `${prefix}${cmd}`));
      }
    }

    let menuCategorias = '';
    let totalCommands = 0;
    for (const [cat, cmds] of Object.entries(categorias)) {
      menuCategorias += `\n╭──〔 ${cat.toUpperCase()} 〕\n${cmds.map(cmd => `│• ${cmd}`).join('\n')}\n╰──────────────\n`;
      totalCommands += cmds.length;
    }

    const menu = `
${saludo}, ${userTag}!
╭─────────────✧
│• ⏱️ ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ: *${activeTime}*
│• 🔖 ᴠᴇʀsɪᴏ́ɴ: *${pkg.version}*
│• 👤 ᴄʀᴇᴀᴅᴏʀ: *${config.ownerName || 'ᴅᴇsᴄᴏɴᴏᴄɪᴅᴏ'}*
│• ⚙️ ᴘʀᴇғɪᴊᴏ: *${prefix}*
│• 📦 ᴛᴏᴛᴀʟ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs: *${totalCommands}*
╰─────────────✧
${menuCategorias}`.trim();

    const fs = await import('fs');
    const path = await import('path');
    const imgPath = path.join('./media/Menu-ZenBot.png');

    const fakeQuoted = {
      key: {
        remoteJid: m.chat,
        fromMe: false,
        id: 'ZenBot-Fake',
        participant: '0@s.whatsapp.net',
      },
      message: {
        imageMessage: {
          caption: '🤖 𝘡𝘦𝘯𝘉𝘰𝘵 - 𝘗𝘢𝘯𝘦𝘭 𝘗𝘳𝘪𝘯𝘤𝘪𝘱𝘢𝘭',
          mimetype: 'image/jpeg',
          jpegThumbnail: fs.readFileSync(imgPath),
        }
      }
    };

    await conn.sendMessage(m.key.remoteJid, {
      image: fs.readFileSync(imgPath),
      caption: menu,
      mentions: [sender]
    }, { quoted: fakeQuoted });
  }
};