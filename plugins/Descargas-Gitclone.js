import fetch from 'node-fetch';

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/([^\/]+)(?:.git)?/i;

export default {
  command: ['gitclone', 'git', 'repositorio', 'repo'],
  help: ['𝙶𝙸𝚃𝙲𝙻𝙾𝙽𝙴 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙶𝚒𝚝𝚑𝚞𝚋>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text }) => {
    if (!text || !regex.test(text)) {
      return m.reply('✳️ *Pasá un enlace válido de GitHub.*');
    }

    let [_, user, repo] = text.match(regex);
    let url = `https://github.com/${user}/${repo}/archive/refs/heads/master.zip`;

    m.reply('⏳ *Descargando repositorio...*');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudo acceder al repositorio');

      const buffer = await res.buffer();

      await conn.sendMessage(m.chat, {
        document: buffer,
        mimetype: 'application/zip',
        fileName: `${repo}.zip`,
        caption: `✅ *Repositorio descargado:* ${repo}`
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply('❌ *Error al descargar el repositorio.*');
    }
  }
};