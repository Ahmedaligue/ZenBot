import { exec } from 'child_process';

export default {
  command: ['$'],
  help: ['$ (𝙲𝙾𝙼𝙰𝙽𝙳𝙾)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { isOwner, text }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');
    if (!text) return m.reply('*¿𝐐𝐮𝐞́ 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐞𝐬𝐞𝐚𝐬 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫?*');

    exec(text, (err, stdout, stderr) => {
      if (err) {
        console.error('Error al ejecutar el comando:', err);
        return m.reply('[ ❌ ] *𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:*\n' + stderr);
      }

      m.reply(stdout || '[ ✅ ] *𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐝𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞.*');
    });
  }
};