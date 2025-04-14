import { exec } from 'child_process';

export default {
  command: ['$'],
  help: ['$ comando'],
  tags: ['owner'],
  owner: true,
  run: async (m, { isOwner, text }) => {
    if (!isOwner) return m.reply('✋ Este comando solo puede usarlo *mi creador*.');
    if (!text) return m.reply('¿Qué comando deseas ejecutar?');
    
    exec(text, (err, stdout, stderr) => {
      if (err) return m.reply('❌ Error al ejecutar el comando:\n' + stderr);
      m.reply(stdout || '✅ Comando ejecutado correctamente.');
    });
  }
};