import fs from 'fs';

export default {
  help: ['𝚃𝙾𝙿5𝙾𝚃𝙰𝙺𝚄𝚂'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5otakus', 'otakus', 'otaku'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] Este comando necesita al menos 5 miembros en el grupo.');
    }

    const topOtakus = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
🏯 *TOP 5 OTAKUS DEL GRUPO* 🏯

1️⃣ *@${topOtakus[0].split('@')[0]}* — *Vive en un shōnen eterno. ¿Se baña? Mmm......* 🤧  
2️⃣ *@${topOtakus[1].split('@')[0]}* — *Tiene más waifus que contactos.* ❤️‍🔥  
3️⃣ *@${topOtakus[2].split('@')[0]}* — *Se emociona más con un capítulo que con su cumpleaños.* 🎉  
4️⃣ *@${topOtakus[3].split('@')[0]}* — *Tiene más animes vistos que días vividos.* ⌛  
5️⃣ *@${topOtakus[4].split('@')[0]}* — *Lo vieron llorar con el final de Clannad.* 😭
`;

    const imagen = fs.readFileSync('./media/top5otakus.jpg');

    await conn.sendMessage(groupId, {
      image: imagen,
      caption: mensaje,
      mentions: topOtakus
    }, { quoted: m });
  }
};