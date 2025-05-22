import { getRandom } from '../lib/myfunc.js'

export default {
  command: ['ppt'],
  help: ['*Ⓟᴘᴛ <ᴘɪᴇᴅʀᴀ|ᴘᴀᴘᴇʟ|ᴛɪᴊᴇʀᴀ>*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { args }) => {
    const opciones = ['piedra', 'papel', 'tijera'];
    const resultados = {
      piedra: { gana: 'tijera', pierde: 'papel' },
      papel: { gana: 'piedra', pierde: 'tijera' },
      tijera: { gana: 'papel', pierde: 'piedra' },
    };

    if (!args[0]) {
      return m.reply(`*[ 🕹️ ] ᴜsᴀ́ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴀsɪ́: ${prefix + command} piedra|papel|tijera`);
    }

    const userChoice = args[0].toLowerCase();
    if (!opciones.includes(userChoice)) {
      return m.reply('*[ ❌ ] ᴏᴘᴄɪᴏ́ɴ ɪɴᴠᴀ́ʟɪᴅᴀ. ᴇʟᴇɢɪ́ ᴇɴᴛʀᴇ: ᴘɪᴇᴅʀᴀ, ᴘᴀᴘᴇʟ ᴏ ᴛɪᴊᴇʀᴀ.*');
    }

    const botChoice = getRandom(opciones);

    let resultado = '';
    if (userChoice === botChoice) {
      resultado = '¡𝐄𝐌𝐏𝐀𝐓𝐄!';
    } else if (resultados[userChoice].gana === botChoice) {
      resultado = '¡𝐆𝐀𝐍𝐀𝐒𝐓𝐄!';
    } else {
      resultado = '¡𝐏𝐄𝐑𝐃𝐈𝐒𝐓𝐄!';
    }

    m.reply(`*[ 🎮 ] ᴇʟᴇɢɪsᴛᴇ: "${userChoice}"*\n*[ 🤖 ] ʏᴏ ᴇʟᴇɢɪ́:: ${botChoice}\n\n${resultado}*`);
  }
};