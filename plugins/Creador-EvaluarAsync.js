import util from 'util';

export default {
  command: ['=>'],
  help: ['=> (CÓDIGO ASYNC)'],
  tags: ['👑 𝗖𝗥𝗘𝗔𝗗𝗢𝗥'],

  run: async (m, { text, conn, isOwner }) => {
    if (!isOwner) return m.reply('[ ⚠️ ] *Este comando solo lo puede usar el propietario del bot.*');
    if (!text) return m.reply('*¿Qué quieres evaluar?*');
    try {
      let evaled = await (async () => eval(text))();
      if (typeof evaled !== 'string') evaled = util.inspect(evaled);
      m.reply(evaled);
    } catch (err) {
      m.reply('❌ *Error:*\n' + err);
    }
  }
};