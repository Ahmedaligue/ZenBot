import os from 'os';

export default {
  command: ['stats', 'estado', 'botinfo'],
  help: ['𝚂𝚃𝙰𝚃𝚂'],
  tags: ['🤖 𝗜𝗡𝗙𝗢𝗕𝗢𝗧'],
  owner: true,
  run: async (m, { conn, plugins }) => {
    const mem = process.memoryUsage();
    const uptime = Math.floor(process.uptime());

    const formatoTiempo = (segundos) => {
      const h = Math.floor(segundos / 3600);
      const m = Math.floor((segundos % 3600) / 60);
      const s = segundos % 60;
      return `${h}h ${m}m ${s}s`;
    };

    const msg = `
*⏱️ 𝙀𝙨𝙩𝙖𝙙𝙤 𝙙𝙚𝙡 𝘽𝙤𝙩 — 𝙕𝙚𝙣𝘽𝙤𝙩*
━━━━━━━━━━━━━━━
*📊 RAM ᴜsᴀᴅᴀ:* ${(mem.rss / 1024 / 1024).toFixed(2)} MB
*🧠 CPU (1ᴍɪɴ):* ${(os.loadavg()[0]).toFixed(2)}
*📦 ᴘʟᴜɢɪɴs ᴀᴄᴛɪᴠᴏs:* ${plugins?.length || 0}
*⚡ ᴜᴘᴛɪᴍᴇ:* ${formatoTiempo(uptime)}
━━━━━━━━━━━━━━━
*🧑‍💻 ᴄʀᴇᴀᴅᴏʀ:* AxelDev
*🤖 ᴠᴇʀsɪᴏ́ɴ:* 1.0.0
*💻 ᴘʟᴀᴛᴀғᴏʀᴍᴀ:* ${os.platform()}
`;

    await m.reply(msg);
  }
};