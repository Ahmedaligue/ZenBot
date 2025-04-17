import { getRandom } from '../lib/func.js'

export default {
  help: ['𝙿𝙿𝚃 <𝙿𝙸𝙴𝙳𝚁𝙰|𝙿𝙰𝙿𝙴𝙻|𝚃𝙸𝙹𝙴𝚁𝙰>'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['ppt'],

  run: async (m, { args, prefix, }) => {
    const opciones = ['piedra', 'papel', 'tijera'];
    const resultados = {
      piedra: { gana: 'ᴛɪᴊᴇʀᴀ', pierde: 'ᴘᴀᴘᴇʟ' },
      papel: { gana: 'ᴘɪᴇᴅʀᴀ', pierde: 'ᴛɪᴊᴇʀᴀ' },
      tijera: { gana: 'ᴘᴀᴘᴇʟ', pierde: 'ᴘɪᴇᴅʀᴀ' },
    };

    if (!args[0]) {
      return m.reply(`*[ 🕹️ ] 𝐔𝐬𝐚́ 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐚𝐬𝐢́::*\n*${prefix}ppt piedra*`);
    }

    const userChoice = args[0].toLowerCase();
    if (!opciones.includes(userChoice)) {
      return m.reply('*[ ❌ ] 𝐎𝐩𝐜𝐢𝐨́𝐧 𝐢𝐧𝐯𝐚́𝐥𝐢𝐝𝐚. 𝐄𝐥𝐞𝐠𝐢́ 𝐞𝐧𝐭𝐫𝐞: piedra, papel o tijera.*');
    }

    const botChoice = getRandom(opciones);

    let resultado = '';
    if (userChoice === botChoice) {
      resultado = '¡𝗘𝗺𝗽𝗮𝘁𝗲!';
    } else if (resultados[userChoice].gana === botChoice) {
      resultado = '¡𝗚𝗮𝗻𝗮𝘀𝘁𝗲!';
    } else {
      resultado = '¡𝗣𝗲𝗿𝗱𝗶𝘀𝘁𝗲!';
    }

    m.reply(`*🎮 𝐄𝐥𝐞𝐠𝐢𝐬𝐭𝐞:* ${userChoice}\n*🤖 𝐘𝐨 𝐞𝐥𝐞𝐠𝐢́:* ${botChoice}\n\n*${resultado}*`);
  }
};