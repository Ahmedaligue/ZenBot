import axios from 'axios';

export default {
  command: ['igstalk'],
  help: ['𝙸𝙶𝚂𝚃𝙰𝙻𝙺 <𝚞𝚜𝚞𝚊𝚛𝚒𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) return m.reply(`❗ *Che, pasame un usuario para stalkear.*\nEjemplo: ${prefix + command} nasa`);

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

      const isPrivate = user.is_private ? '🔒 Sí' : '🔓 No';
      const isVerified = user.is_verified ? '✔️ Verificado' : '❌ No verificado';

      const msg = `✨ *INSTAGRAM STALKER* ✨\n\n` +
        `👤 *Usuario:* @${username}\n` +
        `📛 *Nombre:* ${user.full_name || 'Sin nombre'}\n` +
        `👥 *Seguidores:* ${user.edge_followed_by.count.toLocaleString()}\n` +
        `➡️ *Siguiendo:* ${user.edge_follow.count.toLocaleString()}\n` +
        `🖼️ *Publicaciones:* ${user.edge_owner_to_timeline_media.count}\n` +
        `🔐 *Privado:* ${isPrivate}\n` +
        `✔️ *Estado:* ${isVerified}\n` +
        `📝 *Bio:* ${user.biography || 'Sin biografía'}\n` +
        `🔗 *Link:* https://instagram.com/${username}`;

      await conn.sendMessage(chatId, {
        image: { url: user.profile_pic_url_hd },
        caption: msg
      }, { quoted: m });

    } catch (err) {
      console.error(err.response?.data || err);
      m.reply('❌ No encontré ese perfil o Instagram me bloqueó la jugada.');
    }
  }
};