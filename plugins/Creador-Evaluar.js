import { VM } from 'vm2';

export default {
  command: ['>'],
  help: ['> (𝙴𝚇𝙿𝚁𝙴𝚂𝙸𝙾́𝙽)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { text, isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');
    if (!text) return m.reply('*¿Qué quieres evaluar?*');

    const vm = new VM({
      timeout: 1000,
      sandbox: {}
    });

    try {
      const result = vm.run(text);
      m.reply(`✅ *Resultado:*\n${result}`);
    } catch (error) {
      m.reply(`❌ *Error:*\n${error.message}`);
    }
  }
};