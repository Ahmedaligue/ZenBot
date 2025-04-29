import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'url';
import { config } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let plugins = [];
const ownersFile = path.join(__dirname, 'owners.json');
let ownerList = [];

export const loadOwners = () => {
  if (fs.existsSync(ownersFile)) {
    try {
      const data = fs.readFileSync(ownersFile, 'utf-8');
      ownerList = JSON.parse(data);
      console.log(chalk.greenBright('✅ Lista de owners cargada:'), ownerList);
    } catch (e) {
      console.error(chalk.red('❌ Error leyendo owners.json:'), e);
      ownerList = [];
    }
  } else {
    try {
      fs.writeFileSync(ownersFile, JSON.stringify([config.owner], null, 2), 'utf-8');
      ownerList = [config.owner];
      console.log(chalk.green('✅ Archivo owners.json creado con el owner inicial.'));
    } catch (e) {
      console.error(chalk.red('❌ No se pudo crear owners.json:'), e);
    }
  }
};
loadOwners();

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

  console.log(chalk.greenBright(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ ✅ ${chalk.bold('Total de plugins cargados')}: ${plugins.length}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━
`));
  console.log(chalk.gray('────────────────────────────────────────────\n'));
};

const pluginsFolder = path.join(__dirname, '../plugins');
let reloadTimeout;

fs.watch(pluginsFolder, (eventType, filename) => {
  if (filename && filename.endsWith('.js')) {
    if (reloadTimeout) clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(async () => {
      console.log(chalk.yellow(`📝 Plugin: ${filename} actualizado. `));

      const pluginPath = pathToFileURL(path.join(pluginsFolder, filename)).href + `?update=${Date.now()}`;

      try {
        const newPluginModule = await import(pluginPath);
        if (newPluginModule?.default?.command && typeof newPluginModule.default.run === 'function') {
          // Quitamos el viejo
          plugins = plugins.filter(p => p.file !== filename);
          // Agregamos el nuevo
          plugins.push({ ...newPluginModule.default, file: filename });
          console.log(chalk.greenBright(`✅ Plugin ${filename} recargado correctamente.`));
        } else {
          console.warn(chalk.redBright(`⚠️  ${filename} no es un plugin válido. No se recargó.`));
        }
      } catch (e) {
        console.error(chalk.red(`❌ Error recargando ${filename}:`), e);
      }

      console.log(chalk.gray('────────────────────────────────────────────\n'));
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
  else return;

  m.text = text;
  m.reply = (message) => sock.sendMessage(m.key.remoteJid, { text: message }, { quoted: m });

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
  const mentionedJid = msg.extendedTextMessage?.contextInfo?.mentionedJid || [];

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
    return m.reply(message);
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
        const isOwner = ownerList.includes(sender.split('@')[0]);
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
          groupId,
          mentionedJid,
          sendReply,
          mText: m.text,
          mReply: m.reply,
          prefix,
          command,
          ownerList,
          saveOwner: (number) => {
            if (!ownerList.includes(number)) {
              ownerList.push(number);
              try {
                fs.writeFileSync(ownersFile, JSON.stringify(ownerList, null, 2));
                console.log(chalk.greenBright(`✅ Nuevo owner guardado: ${number}`));
              } catch (e) {
                console.error(chalk.red('❌ Error guardando owner:'), e);
              }
            }
          }
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
