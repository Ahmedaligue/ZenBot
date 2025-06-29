import { config } from '../config.js';
import fs from 'fs';
import path from 'path';

export default {
  command: ['menu', 'menú', 'help', 'ayuda', 'allmenu', 'menucompleto', 'menúcompleto'],
  help: ['*Ⓜᴇɴᴜ*'],
  tags: ['*𝕀ℕ𝔽𝕆𝔹𝕆𝕋*'],

  run: async (m, { conn, chatId, plugins, prefix, sender }) => {
    const hora = new Date().getHours();
    const saludo = hora >= 5 && hora < 12
      ? '🌅 ʙᴜᴇɴᴏs ᴅɪ́ᴀs'
      : hora >= 12 && hora < 18
      ? '🌞 ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs'
      : '🌙 ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs';

    const userTag = '@' + (m.pushName || sender.split('@')[0]);
    const uptime = process.uptime() * 1000;
    const segundos = Math.floor(uptime / 1000) % 60;
    const minutos = Math.floor(uptime / (1000 * 60)) % 60;
    const horas = Math.floor(uptime / (1000 * 60 * 60)) % 24;
    const días = Math.floor(uptime / (1000 * 60 * 60 * 24)) % 30;
    const meses = Math.floor(uptime / (1000 * 60 * 60 * 24 * 30));

    const activeTime = meses > 0 ? `${meses} ᴍᴇs${meses !== 1 ? 'ᴇs' : ''}`
      : días > 0 ? `${días} ᴅɪ́ᴀ${días !== 1 ? 's' : ''}`
      : horas > 0 ? `${horas} ʜᴏʀᴀ${horas !== 1 ? 's' : ''}`
      : minutos > 0 ? `${minutos} ᴍɪɴᴜᴛᴏ${minutos !== 1 ? 's' : ''}`
      : `${segundos} sᴇɢᴜɴᴅᴏ${segundos !== 1 ? 's' : ''}`;

    const categorias = plugins.reduce((acc, plugin) => {
      if (plugin?.help && plugin?.tags) {
        plugin.tags.forEach(tag => {
          if (!acc[tag]) acc[tag] = [];
          acc[tag].push(...plugin.help.map(cmd => `${prefix}${cmd}`));
        });
      }
      return acc;
    }, {});

    let totalCommands = 0;
    let menuCategorias = Object.entries(categorias).map(([cat, cmds]) => {
      totalCommands += cmds.length;
      return `
╭━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╮
┝⊰ ➪ ${cat.toUpperCase()}
┃${cmds.map(cmd => `┝⋆⃟ۜ📓 ${cmd}`).join('\n┃')}
┃╰━━━─────━━━╯
╰━°𖠁°✮•| ⪧𖠁⊰ |•✮°𖠁°━╯`.trim();
    }).join('\n\n');

    const menu = `
${saludo}, ${userTag}!
╭─────────────✧
│• ⏱️ *ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* ${activeTime}
│• 🔖 *ᴠᴇʀsɪᴏ́ɴ:* 1.0.0
│• 👤 *ᴄʀᴇᴀᴅᴏʀ:* ᴀxᴇʟᴅᴇᴠ
│• ⚙️ *ᴘʀᴇғɪᴊᴏ:* ${prefix}
│• 📦 *ᴄᴏᴍᴀɴᴅᴏs:* ${totalCommands}
╰─────────────✧

${menuCategorias}
`.trim();

    const thumbPath = path.join('./media/Menu-ZenBot.png');
    if (!fs.existsSync(thumbPath)) {
      return m.reply('*⚠️ No se encontró el archivo:* `./media/Menu-ZenBot.png`');
    }

    await conn.sendMessage(chatId, {
      text: menu,
      mentions: [sender],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `ᴏғɪᴄɪᴀʟ ᴢᴇɴʙᴏᴛ`,
          body: 'ˢⁱ́ᵍᵘᴇ ᴀ ᴀxᴇʟᴅᴇᴠ ᴇɴ ɪɴsᴛᴀɢʀᴀᴍ',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnail: fs.readFileSync(thumbPath),
          sourceUrl: config.instagram
        }
      }
    });
  }
};