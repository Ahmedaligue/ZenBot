import config from '../config.js';
import fs from 'fs';
import path from 'path';

export default {
  command: ['menu', 'menú', 'help', 'ayuda', 'allmenu', 'menucompleto', 'menúcompleto'],
  help: ['𝙼𝙴𝙽𝚄𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙾'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],

  run: async (m, { conn, plugins, prefix, sender }) => {
    const hora = new Date().getHours();
    const saludo = hora >= 5 && hora < 12 ? '🌅 Buenos días' : hora >= 12 && hora < 18 ? '🌞 Buenas tardes' : '🌙 Buenas noches';
    const userTag = '@' + (m.pushName || sender.split('@')[0]);
    const uptime = process.uptime() * 1000;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / (1000 * 60)) % 60;
    const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(uptime / (1000 * 60 * 60 * 24 * 30));
    const activeTime = months > 0 ? `${months} mes${months !== 1 ? 'es' : ''}`  
                    : days > 0 ? `${days} día${days !== 1 ? 's' : ''}`  
                    : hours > 0 ? `${hours} hora${hours !== 1 ? 's' : ''}`  
                    : minutes > 0 ? `${minutes} minuto${minutes !== 1 ? 's' : ''}`  
                    : `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
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
      menuCategorias += `\n╭──  ׁ    ◌  ۪ ${cat.toUpperCase()}\nㅤ     ┈───┈  ─┈─  ┈───┈\n${cmds.map(cmd => ` ׄ 🍂ׅ  ⤾ ${cmd}`).join('\n')}\n   ㅤ ┈───┈  ─┈─  ┈───┈\n╰──  ׅ     ׁ   >ZEN-BOT<\n`;
      totalCommands += cmds.length;
    });

    const menu = `

${saludo}, ${userTag}!
╭─────────────✧
│• ⏱️ Tiempo activo: ${activeTime}
│• 🔖 Versión: 1.0.0
│• 👤 Creador: AxelDev
│• ⚙️ Prefijo: ${prefix}
│• 📦 Total de comandos: ${totalCommands}
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
          newsletterName: 'ZenBot - AxelDev09',
          newsletterJid: "120363167110224267@newsletter",
        },
        externalAdReply: {
          title: `𝘚𝘜𝘗𝘌𝘙 𝘉𝘖𝘛 𝘋𝘌 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗 ✅`,
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