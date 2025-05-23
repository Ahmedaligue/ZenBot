export default {
  command: ['entrabot', 'join'],
  help: ['*Ⓔɴᴛʀᴀʙᴏᴛ <ʟɪɴᴋ>*'],
  tags: ['*ℂℝ𝔼𝔸𝔻𝕆ℝ*'],

  run: async (m, { isOwner, conn, text }) => {
    if (!isOwner) return m.reply('*[ ⚠️ ] Este comando solo lo puede usar el propietario del bot.*');

    let link = text?.trim();
    if (!link && m.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      const quoted = m.message.extendedTextMessage.contextInfo.quotedMessage;
      if (quoted.extendedTextMessage?.text) link = quoted.extendedTextMessage.text;
      else if (quoted.conversation) link = quoted.conversation;
      else if (quoted.text) link = quoted.text;
      else if (quoted.buttonsMessage?.contentText) link = quoted.buttonsMessage.contentText;
    }

    if (!link) return m.reply('*[❗] Debés escribir o responder a un link de grupo válido.*');

    const match = link.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/i);
    if (!match) return m.reply('*[❗] El link no es válido. Asegurate de que sea un link de grupo de WhatsApp.*');

    const inviteCode = match[1];

    try {
      await conn.groupAcceptInvite(inviteCode);
      m.reply('*✅ Listo, entré al grupo correctamente.*');
    } catch (e) {
      console.error(e);
      m.reply('*[❗] No pude entrar al grupo. Puede que el link esté vencido o haya un error.*');
    }
  }
};