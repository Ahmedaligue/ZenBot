import fetch from 'node-fetch';

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/([^\/]+)(?:.git)?/i;

export default {
  command: ['gitclone', 'git', 'repositorio', 'repo', 'gitc'],
  help: ['*Ⓖɪᴛᴄʟᴏɴᴇ <ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text || !regex.test(text)) {
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ʀᴇᴘᴏsɪᴛᴏʀɪᴏ ᴠᴀ́ʟɪᴅᴏ ᴅᴇ ɢɪᴛʜᴜʙ.* (ᴇᴊ: *${prefix + command}* _https://github.com/_)`);
    }

    let [_, user, repo] = text.match(regex);
    let url = `https://github.com/${user}/${repo}/archive/refs/heads/master.zip`;

    m.reply('*[ ⏳ ] ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴛᴜ ʀᴇᴘᴏ, ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ...*');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('*[ 🥺 ] ɴᴏ ʜᴇ ᴘᴏᴅɪᴅᴏ ᴀᴄᴄᴇᴅᴇʀ ᴀʟ ʀᴇᴘᴏsɪᴛᴏʀɪᴏ.*');

      const buffer = await res.buffer();

      await conn.sendMessage(chatId, {
        document: buffer,
        mimetype: 'application/zip',
        fileName: `${repo}.zip`,
        caption: `*[ ✅ ] ᴀϙᴜɪ́ ᴛɪᴇɴᴇs ᴇʟ ʀᴇᴘᴏ:* ${repo}`
      }, { quoted: m });

    } catch (err) {
      console.error('Error:', err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};