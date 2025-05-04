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
*⏱️ Estado del Bot — ZenBot*
━━━━━━━━━━━━━━━━
*📊 RAM usada:* ${(mem.rss / 1024 / 1024).toFixed(2)} MB
*🧠 CPU (1 min):* ${(os.loadavg()[0]).toFixed(2)}
*📦 Plugins activos:* ${plugins?.length || 0}
*⚡ Uptime:* ${formatoTiempo(uptime)}
━━━━━━━━━━━━━━━━
*🧑‍💻 Creador:* AxelDev
*🤖 Versión:* 1.0.0
*💻 Plataforma:* ${os.platform()}
`;

    await m.reply(msg);
  }
};