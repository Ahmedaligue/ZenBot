import fs from 'fs';

export default {
  help: ['𝚃𝙾𝙿𝟻𝙵𝙴𝙾𝚂'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5feos', 'feos', 'top5feo'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] Este comando necesita al menos 5 miembros en el grupo.');
    }

    const topFeos = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
🚨 *TOP 5 FEOS DEL GRUPO* 🚨

1️⃣ *@${topFeos[0].split('@')[0]}* — ¡El verdadero monstruo del grupo! 😱  
2️⃣ *@${topFeos[1].split('@')[0]}* — ¡Lo siento, pero esa cara necesita un filtro! 😂  
3️⃣ *@${topFeos[2].split('@')[0]}* — ¡La cara más rechazada por el filtro bella! 💄  
4️⃣ *@${topFeos[3].split('@')[0]}* — ¡Es el primer lugar, pero al revés! 😅  
5️⃣ *@${topFeos[4].split('@')[0]}* — Te queremos igual... ¡pero por dentro! 💖
`;

    const imagen = fs.readFileSync('./media/top5feos.jpg');

    await conn.sendMessage(groupId, {
      image: imagen,
      caption: mensaje,
      mentions: topFeos
    }, { quoted: m });
  }
};