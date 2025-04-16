export default {
  command: ['listplugins'],
  help: ['𝙻𝙸𝚂𝚃𝙿𝙻𝚄𝙶𝙸𝙽𝚂'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { conn, isOwner, plugins }) => {
    if (!isOwner) {
      return m.reply('[ ⚠️ ] *𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*');
    }

    if (!plugins || plugins.length === 0) {
      return m.reply('[ ❌ ] *𝐍𝐨 𝐡𝐚𝐲 𝐩𝐥𝐮𝐠𝐢𝐧𝐬 𝐜𝐚𝐫𝐠𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐦𝐨𝐦𝐞𝐧𝐭𝐨.*');
    }

    let pluginList = '📂 *𝕃𝕀𝕊𝕋𝔸 𝔻𝔼 ℙ𝕃𝕌𝔾𝕀ℕ𝕊 ℂ𝔸ℝ𝔾𝔸𝔻𝕆𝕊:*\n\n';
    plugins.forEach((plugin, i) => {
      pluginList += `🔹 ${plugin.file || 'ᴘʟᴜɢɪɴ sɪɴ ɴᴏᴍʙʀᴇ'}\n`;
    });

    await conn.sendMessage(m.key.remoteJid, { text: pluginList });
  }
};