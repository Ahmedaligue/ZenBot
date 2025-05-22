import os from 'os';

export default {
  command: ['stats', 'estado', 'botinfo'],
  help: ['*Ⓢᴛᴀᴛs*'],
  tags: ['*𝕀ℕ𝔽𝕆𝔹𝕆𝕋*'],
  owner: true,
  run: async (m, { conn, plugins }) => {
    const mem = process.memoryUsage();
    const uptime = Math.floor(process.uptime());

    const formatoTiempo = (segundos) => {
      const h = Math.floor(segundos / 3600);
      const m = Math.floor((segundos % 3600) / 60);
      const s = segundos % 60;
      return `${h}ʜ ${m}ᴍ ${s}s`;
    };

    const msg = `
*⏱️ 𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓 — 𝐙𝐄𝐍𝐁𝐎𝐓*
━━━━━━━━━━━━━━━━
*📊 RAM ᴜsᴀᴅᴀ:* ${(mem.rss / 1024 / 1024).toFixed(2)} MB
*🧠 CPU (1 ᴍɪɴ):* ${(os.loadavg()[0]).toFixed(2)}
*📦 ᴘʟᴜɢɪɴs ᴀᴄᴛɪᴠᴏs:* ${plugins?.length || 0}
*⚡ ᴜᴘᴛɪᴍᴇ:* ${formatoTiempo(uptime)}
━━━━━━━━━━━━━━━━
*🧑‍💻 ᴄʀᴇᴀᴅᴏʀ:* ᴀxᴇʟᴅᴇᴠ
*🤖 Vᴇʀsɪᴏ́ɴ:* 1.0.0
*💻 ᴘʟᴀᴛᴀғᴏʀᴍᴀ:* ${os.platform()}
`;

    await m.reply(msg);
  }
};