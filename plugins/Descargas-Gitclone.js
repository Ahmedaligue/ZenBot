import fetch from 'node-fetch';

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/([^\/]+)(?:.git)?/i;

export default {
  command: ['gitclone', 'git', 'repositorio', 'repo', 'gitc'],
  help: ['𝙶𝙸𝚃𝙲 <𝚕𝚒𝚗𝚔 𝚍𝚎 𝙶𝚒𝚝𝚑𝚞𝚋>'],
  tags: ['📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦'],

  run: async (m, { conn, text, chatId }) => {
    if (!text || !regex.test(text)) {
      return m.reply('✳️ *Pasame un enlace válido de GitHub, capo.*');
    }

    let [_, user, repo] = text.match(regex);
    let url = `https://github.com/${user}/${repo}/archive/refs/heads/master.zip`;

    m.reply('⏳ *Descargando el repo, aguantá un toque...*');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudo acceder al repo');

      const buffer = await res.buffer();

      await conn.sendMessage(chatId, {
        document: buffer,
        mimetype: 'application/zip',
        fileName: `${repo}.zip`,
        caption: `✅ *Acá tenés el repo:* ${repo}`
      }, { quoted: m });

      console.log(`✅ Repositorio ${repo} enviado con éxito.`);

    } catch (err) {
      console.error('❌ Error:', err);
      m.reply('❌ *No se pudo descargar el repositorio. Probá con otro link o revisá si existe.*');
    }
  }
};