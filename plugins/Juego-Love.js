export default {
  help: ['𝙲𝚄𝙰𝙽𝚃𝙾𝚃𝙴𝚀𝚄𝙸𝙴𝚁𝙴 @𝚝𝚊𝚐'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['cuantotequiere', 'love'],

  run: async (m, { conn, isGroup }) => {
    if (!isGroup)
      return m.reply('[ ❗ ] Este comando solo funciona en grupos.');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] Tenés que mencionar o responder a alguien para saber cuánto te quiere.');

    const porcentaje = Math.floor(Math.random() * 101);

    let mensajeHumor = '';

    if (porcentaje === 0) {
      mensajeHumor = '😂 Parece que hay cero interés. Mejor busquen otras opciones.';
    } else if (porcentaje <= 10) {
      mensajeHumor = '😅 Un poquito... muy poquito, pero algo es algo. A seguir buscando.';
    } else if (porcentaje <= 20) {
      mensajeHumor = '😬 Hmm, la cosa no pinta muy bien, pero al menos hay algo de esperanza.';
    } else if (porcentaje <= 30) {
      mensajeHumor = '🙄 Hay algo, pero no es suficiente. ¡Más acción!';
    } else if (porcentaje <= 40) {
      mensajeHumor = '🤔 No está mal... pero hay mucho camino por recorrer.';
    } else if (porcentaje <= 50) {
      mensajeHumor = '😏 Ya empiezan a gustarse. Quizás un poco más de tiempo juntos.';
    } else if (porcentaje <= 60) {
      mensajeHumor = '😊 Está tomando forma. Un poquito más y será algo serio.';
    } else if (porcentaje <= 70) {
      mensajeHumor = '💖 Esto está casi listo para un romance. ¿Qué tal una cita?';
    } else if (porcentaje <= 90) {
      mensajeHumor = '😍 El amor está al máximo. ¿Te vas a declarar o qué?';
    } else {
      mensajeHumor = '✨ ¡Están hechos el uno para el otro!';
    }

    m.reply(`❤️ El amor entre vos y *@${target.split('@')[0]}* es de *${porcentaje}%*\n\n${mensajeHumor}`, null, {
      mentions: [target]
    });
  },
};