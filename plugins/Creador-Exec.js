import { exec } from 'child_process';

export default {
  command: ['$'],
  help: ['$ (COMANDO)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { isOwner, text }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');
    if (!text) return m.reply('*¿Qué comando deseas ejecutar?*');

    exec(text, (err, stdout, stderr) => {
      if (err) {
        console.error('Error al ejecutar el comando:', err);
        return m.reply('[ ❌ ] *Error al ejecutar el comando:*\n' + stderr);
      }

      m.reply(stdout || '[ ✅ ] *Comando ejecutado correctamente.*');
    });
  }
};