import { config } from '../config.js';

export default {
  command: ['creador', 'owner', 'dueño'],
  help: ['𝙲𝚁𝙴𝙰𝙳𝙾𝚁'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],

  run: async (m, { conn }) => {
    const number = config.owner.replace('+', '');

    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${config.ownerName}
FN:${config.ownerName}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
ORG:Creador de ZenBot
TITLE:Creador del bot
URL:${config.atom}
NOTE:atom: ${config.atom}
END:VCARD`;

    const chat = m.key.remoteJid;
    if (!chat) return;

    await conn.sendMessage(chat, {
      contacts: {
        displayName: config.ownerName,
        contacts: [{ vcard }]
      }
    });
  }
};