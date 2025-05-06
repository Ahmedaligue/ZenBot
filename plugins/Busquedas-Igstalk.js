import axios from 'axios';

export default {
  command: ['igstalk'],
  help: ['𝙸𝙶𝚂𝚃𝙰𝙻𝙺 <𝚞𝚜𝚞𝚊𝚛𝚒𝚘>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],
  run: async (m, { text, conn, prefix, command, chatId }) => {
    if (!text) return m.reply(`Uso: ${prefix + command} usuario`);

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

      const msg = `✨ *INSTAGRAM STALK* ✨\n\n` +
        `👤 *Usuario:* @${username}\n` +
        `📛 *Nombre:* ${user.full_name || 'No disponible'}\n` +
        `👥 *Seguidores:* ${user.edge_followed_by.count.toLocaleString()}\n` +
        `➡️ *Siguiendo:* ${user.edge_follow.count.toLocaleString()}\n` +
        `🖼️ *Publicaciones:* ${user.edge_owner_to_timeline_media.count}\n` +
        `📝 *Biografía:* ${user.biography || 'Sin biografía'}\n` +
        `🔗 *Perfil:* https://instagram.com/${username}`;

      await conn.sendMessage(chatId, {
        image: { url: user.profile_pic_url_hd },
        caption: msg
      }, { quoted: m });

    } catch (err) {
      console.error(err.response?.data || err);
      m.reply('❌ No se encontró información del perfil o Instagram bloqueó la petición.');
    }
  }
};