export default {
  help: ['𝙶𝙰𝚈 @𝚝𝚊𝚐'],
  tags: ['🎮 𝗝𝗨𝗘𝗚𝗢𝗦'],
  command: ['gay'],
  group: true,

  run: async (m, { conn, isGroup }) => {
    if (!isGroup) return m.reply('[ ❗ ] Este comando solo se puede usar en grupos.');

    const target =
      m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      m.message?.extendedTextMessage?.contextInfo?.participant;

    if (!target) return m.reply('[ ⚠️ ] Tenés que mencionar o responder a alguien para usar este comando.');

    const name = (conn.getName ? await conn.getName(target) : target.split('@')[0]);
    const avatar = await conn.profilePictureUrl(target, 'image').catch(() => 'https://i.ibb.co/1ZxrXKJ/avatar-contact.jpg');
    const url = `https://some-random-api.com/canvas/gay?avatar=${encodeURIComponent(avatar)}`;

    const porcentaje = Math.floor(Math.random() * 101);
    let mensaje = '';

    switch (true) {
      case (porcentaje === 0):
        mensaje = '💀  No tiene ni un brillo gay... ¿Seguro que está vivo?';
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
        mensaje = '⚧️ Bisexual, pero con ganas de ser más activo.';
        break;
      case (porcentaje <= 60):
        mensaje = '🌈 Tiene más arcoiris en el alma que la bandera LGBT.';
        break;
      case (porcentaje <= 70):
        mensaje = '💅 Ese ya se declara fan de RuPaul sin vergüenza.';
        break;
      case (porcentaje <= 90):
        mensaje = '🦄 Sale a la calle y los unicornios lo saludan.';
        break;
      case (porcentaje < 100):
        mensaje = '👛 Revoléa la cartera como si fuera un superpoder.';
        break;
      case (porcentaje === 100):
        mensaje = '👑 ¡Confirmadísimo! Este usuario es el presidente del club gay oficial.';
        break;
    }

    const text = `🏳️‍🌈 *Nivel de gay de @${target.split('@')[0]}: ${porcentaje}%*\n\n${mensaje}`;

    try {
      await conn.sendMessage(m.chat, {
        image: { url },
        caption: text,
        mentions: [target]
      }, { quoted: m });
    } catch {
      m.reply('❌ No se pudo generar la imagen.');
    }
  }
};