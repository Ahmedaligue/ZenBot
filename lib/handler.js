import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'url';
import { config } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let plugins = [];

export const loadPlugins = async () => {
  const folder = path.join(__dirname, '../plugins');
  const files = fs.readdirSync(folder).filter(file => file.endsWith('.js'));

  console.log(chalk.cyan('\n📦 Cargando plugins...\n'));
  plugins = [];

  for (const file of files) {
    try {
      const pluginPath = pathToFileURL(path.join(folder, file)).href + `?update=${Date.now()}`;
      const plugin = await import(pluginPath);
      if (plugin?.default?.command && typeof plugin.default.run === 'function') {
        plugins.push({ ...plugin.default, file });
        console.log(chalk.greenBright(`✅ ${file} cargado correctamente.`));
      } else {
        console.warn(chalk.yellow(`⚠️  ${file} no es un plugin válido.`));
      }
    } catch (e) {
      console.error(chalk.red(`❌ Error cargando ${file}:`), e);
    }
  }

  console.log(chalk.magenta(`\n✅ Total de plugins cargados: ${plugins.length}`));
  console.log(chalk.gray('────────────────────────────────────────────\n'));
};

const pluginsFolder = path.join(__dirname, '../plugins');
let reloadTimeout;

fs.watch(pluginsFolder, (eventType, filename) => {
  if (filename && filename.endsWith('.js')) {
    if (reloadTimeout) clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(() => {
      console.log(chalk.yellow(`📝 Plugin actualizado: ${filename}. Recargando...`));
      loadPlugins();
    }, 300);
  }
});

export const handler = async (m, sock) => {
  if (!m.message) {
    console.log(chalk.red('[❌ ERROR] No se encontró el mensaje.'));
    return;
  }

  let text = '';
  const msg = m.message;

  if (msg.conversation) text = msg.conversation;
  else if (msg.extendedTextMessage?.text) text = msg.extendedTextMessage.text;
  else if (msg.imageMessage?.caption) text = msg.imageMessage.caption;
  else if (msg.videoMessage?.caption) text = msg.videoMessage.caption;
  else {
    console.log(chalk.red('[❌ ERROR] Tipo de mensaje no soportado.'));
    return;
  }

  const prefix = config.prefix;
  if (!text.startsWith(prefix)) return;

  const args = text.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();
  if (!command) return;

  if (m.key.participant === sock.user.id) return;

  const sender = m.key.participant || m.key.remoteJid;
  const userName = m.pushName || 'Desconocido';
  const isGroup = m.key.remoteJid.endsWith('@g.us');
  const groupId = m.key.remoteJid;
  const timestamp = new Date().toLocaleString('es-AR');

  console.log(chalk.cyanBright(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🛠️  Comando recibido
┣━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 👤 Usuario   : ${chalk.bold(userName)}
┃ ☎️ Número    : ${chalk.bold(sender.split('@')[0])}
┃ 💬 Chat      : ${chalk.bold(isGroup ? 'Grupo' : 'Privado')}
┃ 📦 Comando   : ${chalk.bold(command)}
┃ 🕒 Fecha     : ${chalk.gray(timestamp)}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━
`));

  let found = false;

  const sendReply = async (message) => {
    if (m.reply && typeof m.reply === 'function') {
      return m.reply(message);
    } else {
      return sock.sendMessage(m.key.remoteJid, { text: message }, { quoted: m });
    }
  };

  for (const plugin of plugins) {
    if (plugin.command.includes(command)) {
      found = true;
      try {
        const groupMetadata = isGroup ? await sock.groupMetadata(groupId) : null;
        const participants = groupMetadata?.participants || [];

        const senderId = sender.endsWith('@s.whatsapp.net') ? sender : sender + '@s.whatsapp.net';
        const botNumber = sock.user?.id?.split(':')?.[0] + '@s.whatsapp.net';
        const botParticipant = participants.find(p => p.id === botNumber);

        const isAdmin = participants.find(p => p.id === senderId)?.admin || false;
        const isBotAdmin = botParticipant?.admin || false;
        const isOwner = config.owner.includes(sender.split('@')[0]);
        const isPrivado = !isGroup;

        await plugin.run(m, {
          conn: sock,
          args,
          text: args.join(' '),
          sender,
          isGroup,
          isAdmin,
          isBotAdmin,
          isOwner,
          isPrivado,
          userName,
          plugins: plugins.filter(p => p.help && p.tags),
          metadata: groupMetadata,
          botNumber,
          botParticipant,
          groupId
        });

        console.log(chalk.green(`✅ Plugin ejecutado: ${plugin.file}`));
      } catch (err) {
        console.error(chalk.red(`❌ Error ejecutando ${plugin.file}:`), err);
        await sendReply('❌ Ocurrió un error al ejecutar el comando.');
      }
    }
  }

  if (!found) {
    console.log(chalk.yellow(`🚫 Comando no encontrado: "${command}"`));
  }
};