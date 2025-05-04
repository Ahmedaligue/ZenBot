import { getRandom } from '../lib/func.js'

export default {
  help: ['𝙿𝙿𝚃 <𝙿𝙸𝙴𝙳𝚁𝙰|𝙿𝙰𝙿𝙴𝙻|𝚃𝙸𝙹𝙴𝚁𝙰>'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['ppt'],

  run: async (m, { args }) => {
    const opciones = ['piedra', 'papel', 'tijera'];
    const resultados = {
      piedra: { gana: 'tijera', pierde: 'papel' },
      papel: { gana: 'piedra', pierde: 'tijera' },
      tijera: { gana: 'papel', pierde: 'piedra' },
    };

    if (!args[0]) {
      return m.reply(`🕹️ Usá el comando así:\n/ppt piedra`);
    }

    const userChoice = args[0].toLowerCase();
    if (!opciones.includes(userChoice)) {
      return m.reply('❌ Opción inválida. Elegí entre: piedra, papel o tijera.');
    }

    const botChoice = getRandom(opciones);

    let resultado = '';
    if (userChoice === botChoice) {
      resultado = '¡Empate!';
    } else if (resultados[userChoice].gana === botChoice) {
      resultado = '¡Ganaste!';
    } else {
      resultado = '¡Perdiste!';
    }

    m.reply(`🎮 Elegiste: ${userChoice}\n🤖 Yo elegí: ${botChoice}\n\n${resultado}`);
  }
};