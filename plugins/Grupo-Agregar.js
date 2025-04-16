export default {
  help: ['𝙰𝙶𝚁𝙴𝙶𝙰𝚁 (𝙽𝚄́𝙼𝙴𝚁𝙾)'],
  tags: ['🧩 𝗣𝗔𝗥𝗔 𝗚𝗥𝗨𝗣𝗢𝗦'],
  command: ['add', 'agregar', 'añadir'],

  run: async (m, { conn, args, isGroup, metadata, botParticipant, prefix }) => {
    if (!isGroup) {
      return m.reply('*[ ❗ ] 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬.*');
    }

    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) {
      return m.reply(`[ ⚠️ ] *𝐃𝐞𝐛𝐞𝐬 𝐞𝐬𝐜𝐫𝐢𝐛𝐢𝐫 𝐮𝐧 𝐧𝐮́𝐦𝐞𝐫𝐨 𝐯𝐚́𝐥𝐢𝐝𝐨 𝐩𝐚𝐫𝐚 𝐚𝐠𝐫𝐞𝐠𝐚𝐫.*\n\n*𝐄𝐣:* \`${prefix}add 1123456789\``);
    }

    if (!botParticipant?.admin) {
      return m.reply('*[ ❗ ] 𝐄𝐥 𝐛𝐨𝐭 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐬𝐞𝐫 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫 𝐩𝐚𝐫𝐚 𝐞𝐣𝐞𝐜𝐮𝐭𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.*');
    }

    const userJid = `${number}@s.whatsapp.net`;

    try {
      const res = await conn.groupParticipantsUpdate(m.key.remoteJid, [userJid], 'add');
      const result = res[0];
      const status = result?.status;

      if (status === 200 || status === '200') {
        return m.reply(`[ ✅ ]*¡𝕌𝕤𝕦𝕒𝕣𝕚𝕠 𝕒𝕘𝕣𝕖𝕘𝕒𝕕𝕠 𝕔𝕠𝕟 𝕖́𝕩𝕚𝕥𝕠!*\n\n@${number} 𝘢𝘩𝘰𝘳𝘢 𝘧𝘰𝘳𝘮𝘢 𝘱𝘢𝘳𝘵𝘦 𝘥𝘦𝘭 𝘨𝘳𝘶𝘱𝘰.`, { mentions: [userJid] });
      }

      if (status === 403 || result?.error === '403') {
        const invite = await conn.groupInviteCode(m.key.remoteJid);
        await conn.sendMessage(userJid, {
          text: `👋 *¡𝐇𝐨𝐥𝐚!* 𝐓𝐞 𝐞𝐧𝐯𝐢𝐚𝐫𝐨𝐧 𝐮𝐧𝐚 𝐢𝐧𝐯𝐢𝐭𝐚𝐜𝐢𝐨́𝐧 𝐩𝐚𝐫𝐚 𝐮𝐧𝐢𝐫𝐭𝐞 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨:\n\n🔗 https://chat.whatsapp.com/${invite}\n\n_𝖯𝗎𝗅𝗌𝖺 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾 𝗉𝖺𝗋𝖺 𝗎𝗇𝗂𝗋𝗍𝖾._`,
        });

        return m.reply(`[ 🚫 ] *𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐝𝐢𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐚 @${number}.*\n✉️ 𝐒𝐞 𝐥𝐞 𝐡𝐚 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐮𝐧𝐚 *𝐢𝐧𝐯𝐢𝐭𝐚𝐜𝐢𝐨́𝐧 𝐩𝐫𝐢𝐯𝐚𝐝𝐚* 𝐩𝐚𝐫𝐚 𝐮𝐧𝐢𝐫𝐬𝐞 𝐚𝐥 𝐠𝐫𝐮𝐩𝐨.`, { mentions: [userJid] });
      }

      return m.reply(`[ ❌ ] *𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨..*\n𝐂𝐨́𝐝𝐢𝐠𝐨 𝐝𝐞 𝐞𝐫𝐫𝐨𝐫: ${status}`);

    } catch (err) {
      console.error('[❌ ERROR AL AGREGAR]:', err);
      return m.reply('[ ❌ ]*𝐎𝐜𝐮𝐫𝐫𝐢𝐨́ 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫 𝐢𝐧𝐞𝐬𝐩𝐞𝐫𝐚𝐝𝐨 𝐚𝐥 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚𝐥 𝐮𝐬𝐮𝐚𝐫𝐢𝐨.*');
    }
  }
};