import fs from 'fs';

export default {
  help: ['𝚃𝙾𝙿5𝙻𝙸𝙽𝙳𝙾𝚂'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['top5lindos', 'lindos', 'top5lindo'],

  run: async (m, { conn, isGroup, metadata, groupId }) => {
    if (!isGroup || !metadata) {
      return m.reply('*[ ❗ ] Este comando solo funciona en grupos.*');
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 5) {
      return m.reply('[ ❗ ] Este comando necesita al menos 5 miembros en el grupo.');
    }

    const topLindos = participantes.sort(() => Math.random() - 0.5).slice(0, 5);

    const mensaje = `
✨ *TOP 5 LINDOS DEL GRUPO* ✨

1️⃣ *@${topLindos[0].split('@')[0]}* — *¡Dios/a griego/a bajado del Olimpo!* 😍  
2️⃣ *@${topLindos[1].split('@')[0]}* — *¡El motivo por el que varios suspiran!* 🥵  
3️⃣ *@${topLindos[2].split('@')[0]}* — *¡Con esa carita se gana el mundo!* 🫦  
4️⃣ *@${topLindos[3].split('@')[0]}* — *¡Su belleza causa bugs en WhatsApp!* 🪄  
5️⃣ *@${topLindos[4].split('@')[0]}* — *¡Hermoso/a hasta en stickers pixelados!* 📱
`;

    const imagen = fs.readFileSync('./media/top5lindo.jpg');

    await conn.sendMessage(groupId, {
      image: imagen,
      caption: mensaje,
      mentions: topLindos
    }, { quoted: m });
  }
};