export default {
  help: ['𝚂𝙻𝙾𝚃'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['slot', 'casino'],

  run: async (m) => {
    const emojis = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎'];
    const getRandom = () => emojis[Math.floor(Math.random() * emojis.length)];

    const slot1 = getRandom();
    const slot2 = getRandom();
    const slot3 = getRandom();

    let resultado;
    if (slot1 === slot2 && slot2 === slot3) {
      resultado = '🎉 ¡JACKPOT! ¡Ganaste!';
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      resultado = '✨ ¡Casi! Te llevás un premio pequeño.';
    } else {
      resultado = '💔 Mala suerte... ¡Intentá de nuevo!';
    }

    const mensaje = `
🎰 SLOT MACHINE 🎰

| ${slot1} | ${slot2} | ${slot3} |

${resultado}
    `.trim();

    await m.reply(mensaje);
  }
};