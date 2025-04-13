export default {
  command: ['menu', 'menú', 'help', 'ayuda', 'allmenu', 'menucompleto', 'menúcompleto'],
  help: ['𝙼𝙴𝙽𝚄𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙾'],
  tags: ['🤖 INFOBOT'],

  run: async (m, { conn, plugins, userName }) => {
    const hora = new Date().getHours();
    let saludo = '👋 Hola';
    if (hora >= 5 && hora < 12) saludo = '🌅 Buenos días';
    else if (hora >= 12 && hora < 18) saludo = '🌞 Buenas tardes';
    else saludo = '🌙 Buenas noches';

    const sender = m.sender || m.key.participant || m.key.remoteJid;
    const userTag = '@' + sender.split('@')[0];

    const uptime = process.uptime() * 1000;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / (1000 * 60)) % 60;
    const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(uptime / (1000 * 60 * 60 * 24 * 30));

    let activeTime = '';

    if (months > 0) activeTime = `${months} mes${months !== 1 ? 'es' : ''}`;
    else if (days > 0) activeTime = `${days} día${days !== 1 ? 's' : ''}`;
    else if (hours > 0) activeTime = `${hours} hora${hours !== 1 ? 's' : ''}`;
    else if (minutes > 0) activeTime = `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    else activeTime = `${seconds} segundo${seconds !== 1 ? 's' : ''}`;

    const categorias = {};
    for (const plugin of plugins) {
      if (!plugin?.help || !plugin.tags) continue;
      for (const tag of plugin.tags) {
        if (!categorias[tag]) categorias[tag] = [];
        categorias[tag].push(...plugin.help.map(cmd => `/${cmd}`));
      }
    }

    let menuCategorias = '';
    for (const [cat, cmds] of Object.entries(categorias)) {
      menuCategorias += `
╭──〔 *${cat.toUpperCase()}* 〕
${cmds.map(cmd => `│• ${cmd}`).join('\n')}
╰──────────────\n`;
    }

    const menu = `
${saludo}, ${userTag}!

🤖 *ZenBot - Panel Principal*
╭─────────────✧
│• ⏱️ Tiempo activo: ${activeTime}
│• 🔖 Versión: 1.0.0
│• 👤 Creador: AxelDev
│• ⚙️ Prefijo: /
╰─────────────✧

${menuCategorias}`.trim();

    const fs = await import('fs');
    const path = await import('path');
    const imgPath = path.join('./media/ZenBot.png');

    const fakeQuoted = {
      key: {
        remoteJid: m.chat,
        fromMe: false,
        id: 'ZenBot-Fake',
        participant: '0@s.whatsapp.net',
      },
      message: {
        imageMessage: {
          caption: '🤖 ZenBot - Tu asistente confiable.',
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