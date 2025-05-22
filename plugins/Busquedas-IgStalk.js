import axios from 'axios';

export default {
  command: ['igstalk', 'stalkearig'],
  help: ['*Ⓘɢsᴛᴀʟᴋ <ᴜsᴜᴀʀɪᴏ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],
  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) return m.tutorial(`*[ 👤] ᴇsᴄʀɪʙᴇ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇʟ ᴜsᴜᴀʀɪᴏ ϙᴜᴇ ϙᴜɪᴇʀᴀs sᴛᴀʟᴋᴇᴀʀ.* (ᴇᴊ: *${prefix + command}* _Usuario_)`);

    const username = text.trim().replace(/^@/, '');
    const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'X-IG-App-ID': '936619743392459',
          'Accept': '*/*',
          'Accept-Language': 'es-ES,es;q=0.9'
        }
      });

      const user = data.data.user;

      const isPrivate = user.is_private ? '*🔒 sɪ́*' : '*🔓 ɴᴏ*';
      const isVerified = user.is_verified ? '*✔️ ᴠᴇʀɪғɪᴄᴀᴅᴏ*' : '*❌ ɴᴏ ᴠᴇʀɪғɪᴄᴀᴅᴏ*';

      const msg = `✨ *𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐒𝐓𝐀𝐋𝐊𝐄𝐑* ✨\n\n` +
        `👤 *ᴜsᴜᴀʀɪᴏ:* @${username}\n` +
        `📛 *ɴᴏᴍʙʀᴇ:* ${user.full_name || '*sɪɴ ɴᴏᴍʙʀᴇ*'}\n` +
        `👥 *sᴇɢᴜɪᴅᴏʀᴇs:* ${user.edge_followed_by.count.toLocaleString()}\n` +
        `➡️ *sɪɢᴜɪᴇɴᴅᴏ:* ${user.edge_follow.count.toLocaleString()}\n` +
        `🖼️ *ᴘᴜʙʟɪᴄᴀᴄɪᴏɴᴇs:* ${user.edge_owner_to_timeline_media.count}\n` +
        `🔐 *ᴘʀɪᴠᴀᴅᴏ:* ${isPrivate}\n` +
        `✔️ *ᴇsᴛᴀᴅᴏ:* ${isVerified}\n` +
        `📝 *ʙɪᴏ:* ${user.biography || '*sɪɴ ʙɪᴏɢʀᴀғɪ́ᴀ*'}\n` +
        `🔗 *ʟɪɴᴋ:* https://instagram.com/${username}`;

      await conn.sendMessage(chatId, {
        image: { url: user.profile_pic_url_hd },
        caption: msg
      }, { quoted: m });

    } catch (err) {
      console.error(err.response?.data || err);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};