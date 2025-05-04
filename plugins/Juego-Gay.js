export default {
  help: ['𝙲𝚄𝙰𝙽𝚃𝙾𝙶𝙰𝚈 @𝚝𝚊𝚐'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['cuantogay', 'gay'],
  group: true,

  run: async (m, { conn, isGroup }) => {
    if (!isGroup) return m.reply('[ ⚠️ ] Este comando solo se puede usar en grupos.');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target)
      return m.reply('[ ⚠️ ] Tenés que mencionar o responder a alguien para calcular qué tan gay es. 😜💯');

    const porcentaje = Math.floor(Math.random() * 101);
    let mensaje = '';

    switch (true) {
      case (porcentaje === 0):
        mensaje = '💀 No tiene ni un brillo gay... ¿seguro que está vivo?';
        break;
      case (porcentaje <= 10):
        mensaje = '😐 Algo se sospecha, pero todavía se hace el duro.';
        break;
      case (porcentaje <= 20):
        mensaje = '🤔 Tiene más pluma un ladrillo, pero algo hay.';
        break;
      case (porcentaje <= 30):
        mensaje = '🎤 No es gay, solo canta Dua Lipa en la ducha.';
        break;
      case (porcentaje <= 40):
        mensaje = '👀 Un pie adentro, otro afuera... sospechoso.';
        break;
      case (porcentaje <= 50):
        mensaje = '⚧️ Bisexual vibes activadas, pero medio apagadas.';
        break;
      case (porcentaje <= 60):
        mensaje = '🌈 Tiene más arcoíris en el alma que la bandera LGBT.';
        break;
      case (porcentaje <= 70):
        mensaje = '💅 Ese ya se declara fan de RuPaul sin vergüenza.';
        break;
      case (porcentaje <= 90):
        mensaje = '🦄 Sale a la calle y los unicornios lo saludan.';
        break;
      case (porcentaje < 100):
        mensaje = '👛 Revolea la cartera como si fuera superpoder.';
        break;
      case (porcentaje === 100):
        mensaje = '👑 ¡Confirmadísimo! Este usuario es el presidente del club gay oficial.';
        break;
    }

    m.reply(`🌈 Nivel de gay de @${target.split('@')[0]}: ${porcentaje}%\n\n${mensaje}`, null, { mentions: [target] });
  }
};