import os from 'os';

export default {
  command: ['stats', 'estado', 'botinfo'],
  help: ['stats'],
  tags: ['owner'],
  owner: true,
  run: async (m, { conn }) => {
    const mem = process.memoryUsage();
    const usuarios = Object.keys(global.db?.data?.users || {}).length;
    const plugins = Object.keys(global.plugins).length;
    const uptime = Math.floor(process.uptime());

    const formatoTiempo = (segundos) => {
      const h = Math.floor(segundos / 3600);
      const m = Math.floor((segundos % 3600) / 60);
      const s = segundos % 60;
      return `${h}h ${m}m ${s}s`;
    };

    const msg = `
*⏱️ Estado del Bot — ZenBot*
━━━━━━━━━━━━━━━
*📊 RAM usada:* ${(mem.rss / 1024 / 1024).toFixed(2)} MB
*🧠 CPU (1min):* ${(os.loadavg()[0]).toFixed(2)}
*👥 Usuarios:* ${usuarios}
*📦 Plugins activos:* ${plugins}
*⚡ Uptime:* ${formatoTiempo(uptime)}
━━━━━━━━━━━━━━━
*🧑‍💻 Creador:* Leo
*🤖 Versión:* 1.0.0
*💻 Plataforma:* ${os.platform()}
`;

    await m.reply(msg);
  }
};