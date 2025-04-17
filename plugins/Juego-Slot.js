export default {
  help: ['slot'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['slot'],

  run: async (m) => {
    const emojis = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎'];
    const getRandom = () => emojis[Math.floor(Math.random() * emojis.length)];

    const slot1 = getRandom();
    const slot2 = getRandom();
    const slot3 = getRandom();

    let resultado;
    if (slot1 === slot2 && slot2 === slot3) {
      resultado = '🎉 ¡𝗝𝗔𝗖𝗞𝗣𝗢𝗧! ¡𝗚𝗮𝗻𝗮𝘀𝘁𝗲!';
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      resultado = '✨ ¡𝐂𝐚𝐬𝐢! 𝐓𝐞 𝐥𝐥𝐞𝐯𝐚́𝐬 𝐮𝐧 𝐩𝐫𝐞𝐦𝐢𝐨 𝐩𝐞𝐪𝐮𝐞𝐧̃𝐨.';
    } else {
      resultado = '💔 𝐌𝐚𝐥𝐚 𝐬𝐮𝐞𝐫𝐭𝐞... ¡𝐈𝐧𝐭𝐞𝐧𝐭𝐚́ 𝐝𝐞 𝐧𝐮𝐞𝐯𝐨!';
    }

    const mensaje = `
🎰 SLOT MACHINE 🎰

| ${slot1} | ${slot2} | ${slot3} |

${resultado}
    `.trim();

    await m.reply(mensaje);
  }
};