import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'url';
import { config } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let plugins = [];
const ownersFile = path.join(__dirname, 'owners.json');
let ownerList = [];

// Cargar la lista de owners desde archivo
export const loadOwners = () => {
  if (fs.existsSync(ownersFile)) {
    try {
      const data = fs.readFileSync(ownersFile, 'utf-8');
      ownerList = JSON.parse(data);
      console.log(chalk.greenBright('[INFO] Lista de owners cargada:') + ` ${ownerList}`);
    } catch (e) {
      console.error(chalk.red('[ERROR] Error leyendo owners.json:'), e);
      ownerList = [];
    }
  } else {
    try {
      fs.writeFileSync(ownersFile, JSON.stringify([config.owner], null, 2), 'utf-8');
      ownerList = [config.owner];
      console.log(chalk.green('[INFO] Archivo owners.json creado con owner inicial.'));
    } catch (e) {
      console.error(chalk.red('[ERROR] No se pudo crear owners.json:'), e);
    }
  }
};
loadOwners();

// Cargar plugins desde la carpeta de plugins
export const loadPlugins = async () => {
  const folder = path.join(__dirname, '../plugins');
  const files = fs.readdirSync(folder).filter(file => file.endsWith('.js'));

  console.log(chalk.blueBright('Cargando plugins...'));
  plugins = [];

  for (const file of files) {
    try {
      const pluginPath = pathToFileURL(path.join(folder, file)).href + `?update=${Date.now()}`;
      const plugin = await import(pluginPath);

      if (Array.isArray(plugin?.default?.command) && typeof plugin.default.run === 'function') {
        plugins.push({ ...plugin.default, file });
        console.log(chalk.greenBright(`Plugin cargado: ${file}`));
      } else {
        console.warn(chalk.keyword('orange')(`Archivo no válido: ${file}`));
      }
    } catch (e) {
      console.error(chalk.redBright(`Error cargando plugin ${file}:`), e);
    }
  }

  console.log(chalk.cyanBright(`Plugins cargados: ${plugins.length}\n`));
};

const pluginsFolder = path.join(__dirname, '../plugins');
let reloadTimeout;

fs.watch(pluginsFolder, (eventType, filename) => {
  if (filename && filename.endsWith('.js')) {
    if (reloadTimeout) clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(async () => {
      const pluginPath = path.join(pluginsFolder, filename);
      const exists = fs.existsSync(pluginPath);

      if (exists) {
        console.log(chalk.yellowBright(`Plugin modificado: ${filename}`));
        try {
          const newPluginModule = await import(pathToFileURL(pluginPath).href + `?update=${Date.now()}`);
          if (Array.isArray(newPluginModule?.default?.command) && typeof newPluginModule.default.run === 'function') {
            plugins = plugins.filter(p => p.file !== filename);
            plugins.push({ ...newPluginModule.default, file: filename });
            console.log(chalk.greenBright(`Plugin recargado: ${filename}`));
          } else {
            console.warn(chalk.hex('#FF4500')(`Archivo no válido: ${filename}. No se recargó.`));
          }
        } catch (e) {
          console.error(chalk.redBright(`Error recargando plugin ${filename}:`), e);
        }
      } else {
        plugins = plugins.filter(p => p.file !== filename);
        console.log(chalk.redBright(`Plugin eliminado: ${filename}`));
      }
    }, 300);
  }
});

// Handler principal que procesa los mensajes
export const handler = async (m, axl) => {
  if (!m || !m.message || m.key.remoteJid === 'status@broadcast') {
    return;
  }

  const msg = m.message || {};
  const mtype = Object.keys(msg)[0];
  let text = '';

  try {
    text =
      mtype === 'interactiveResponseMessage'
        ? JSON.parse(msg[mtype].nativeFlowResponseMessage.paramsJson)?.id || ''
        : mtype === 'conversation'
        ? msg.conversation || ''
        : mtype === 'deviceSentMessage'
        ? msg.deviceSentMessage?.message?.extendedTextMessage?.text || ''
        : mtype === 'imageMessage'
        ? msg.imageMessage?.caption || ''
        : mtype === 'videoMessage'
        ? msg.videoMessage?.caption || ''
        : mtype === 'extendedTextMessage'
        ? msg.extendedTextMessage?.text || ''
        : mtype === 'buttonsResponseMessage'
        ? msg.buttonsResponseMessage?.selectedButtonId || ''
        : mtype === 'listResponseMessage'
        ? msg.listResponseMessage?.singleSelectReply?.selectedRowId || ''
        : mtype === 'templateButtonReplyMessage'
        ? msg.templateButtonReplyMessage?.selectedId || ''
        : mtype === 'documentWithCaptionMessage'
        ? msg.documentWithCaptionMessage?.message?.documentMessage?.caption || ''
        : mtype === 'buttonsMessage'
        ? msg.buttonsMessage?.imageMessage?.caption || ''
        : mtype === 'viewOnceMessageV2'
        ? (
            msg.viewOnceMessageV2?.message?.imageMessage?.caption ||
            msg.viewOnceMessageV2?.message?.videoMessage?.caption ||
            ''
          )
        : msg.buttonsResponseMessage?.selectedButtonId ||
          msg.listResponseMessage?.singleSelectReply?.selectedRowId ||
          m.text ||
          '';
  } catch (e) {
    text = '';
  }

  m.text = text;

  const ZenBot = {
    key: {
      participant: "13135550002@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false
    },
    message: {
      contactMessage: {
        displayName: "Meta AI",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Meta AI;;;\nFN:Meta AI\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Celular\nEND:VCARD`,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true
        }
      }
    }
  };

  // Funciones para enviar contenido
  m.reply = m.reply || ((message) => axl.sendMessage(m.key.remoteJid, { text: message }, { quoted: ZenBot }));
  m.sendAudio = m.sendAudio || ((audio) => axl.sendMessage(m.key.remoteJid, { audio: audio, mimetype: 'audio/mp4' }, { quoted: ZenBot }));
  m.sendVideo = m.sendVideo || ((video) => axl.sendMessage(m.key.remoteJid, { video: video, caption: 'Video enviado', mimetype: 'video/mp4' }, { quoted: ZenBot }));
  m.sendImage = m.sendImage || ((image, caption = '', options = {}) => axl.sendMessage(m.key.remoteJid, { image: image, caption: caption, ...options }, { quoted: ZenBot }));
  m.sendDocumento = m.sendDocumento || ((document) => axl.sendMessage(m.key.remoteJid, { document: document, fileName: 'documento.pdf' }, { quoted: ZenBot }));
  m.sendSticker = m.sendSticker || ((sticker) => axl.sendMessage(m.key.remoteJid, { sticker: sticker }, { quoted: ZenBot }));

  const prefixes = config.prefixes;
  if (typeof text !== 'string') return;

  const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const prefixUsed = prefixes.find(p =>
    normalizedText.startsWith(p.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  );
  if (!prefixUsed) return;

  const prefix = prefixUsed;
  const args = text.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();
  if (!command) return;

  // ✅ FILTRO de comandos vacíos, raros o basura
  if (command.length < 2 || /[^a-zA-Z0-9]/.test(command)) return;

  if (m.key.participant === axl.user?.id) return;

  const sender = m.key.participant || m.key.remoteJid;
  const chatId = m.chat || m.key.remoteJid || m.key.participant;
  const userName = m.pushName || 'Desconocido';
  const isGroup = m.key.remoteJid.endsWith('@g.us');
  const groupId = m.key.remoteJid;
  const timestamp = new Date().toLocaleString('es-AR');
  const mentionedJid = msg.extendedTextMessage?.contextInfo?.mentionedJid || [];

  // Log de comandos recibidos
  console.log(`
${chalk.greenBright.bold('[INFO]')} ${chalk.white('Comando recibido:')}
${chalk.blueBright('┏━━━━━━━━━━━━━━━━━━━━━━━━━━')}
${chalk.blueBright('┃')} اسم المستخدم     : ${chalk.yellowBright(userName)}
${chalk.blueBright('┃')} الرقم     : ${chalk.cyanBright(sender.split('@')[0])}
${chalk.blueBright('┃')} النوع        : ${chalk.magentaBright(isGroup ? 'Grupo' : 'Privado')}
${chalk.blueBright('┃')} الامر     : ${chalk.greenBright(command)}
${chalk.blueBright('┃')} Fecha       : ${chalk.gray(timestamp)}
${chalk.blueBright('┗━━━━━━━━━━━━━━━━━━━━━━━━━━')}
`);

  let found = false;

  m.tutorial = m.tutorial || ((message) =>
    axl.sendMessage(
      m.key.remoteJid,
      {
        text: message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: 'زاوفان بوت - احمد ايشيغامي',
            body: 'sɪɢᴜᴇᴍᴇ ᴇɴ ɪɢ',
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: true,
            thumbnailUrl: 'https://i.ibb.co/m5nsCN5P/Menu-Zen-Bot.png',
            sourceUrl: 'https://instagram.com/g_boy072'
          }
        }
      },
      { quoted: ZenBot }
    )
  );

  for (const plugin of plugins) {
    if (Array.isArray(plugin.command) && plugin.command.includes(command)) {
      found = true;
      try {
        const groupMetadata = isGroup ? await axl.groupMetadata(groupId) : null;
        const participants = groupMetadata?.participants || [];
        const senderId = sender.endsWith('@s.whatsapp.net') ? sender : sender + '@s.whatsapp.net';
        const botNumber = axl.user?.id?.split(':')?.[0] + '@s.whatsapp.net';
        const botParticipant = participants.find(p => p.id === botNumber);

        const isAdmin = participants.find(p => p.id === senderId)?.admin || false;
        const isBotAdmin = botParticipant?.admin || false;
        const isOwner = ownerList.includes(sender.split('@')[0]);
        const isPrivado = !isGroup;

        await plugin.run(m, {
          conn: axl,
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
          sendTutorial: m.tutorial,
          sendImage: m.sendImage,
          sendVideo: m.sendVideo,
          sendAudio: m.sendAudio,
          sendSticker: m.sendSticker,
          sendDocumento: m.sendDocumento,
          mText: m.text,
          mReply: m.reply,
          prefix,
          command,
          ownerList,
          chatId,
          saveOwner: (number) => {
            if (!ownerList.includes(number)) {
              ownerList.push(number);
              try {
                fs.writeFileSync(ownersFile, JSON.stringify(ownerList, null, 2));
                console.log(chalk.greenBright(`[INFO] Nuevo owner guardado: ${number}`));
              } catch (e) {
                console.error(chalk.red('[ERROR] Error guardando owner:'), e);
              }
            }
          },
        });
      } catch (err) {
        console.error(chalk.red(`[ERROR] Error ejecutando ${plugin.file}:`), err);
        await m.reply('❌ Ocurrió un error al ejecutar el comando.');
      }
    }
  }

  if (!found) {
    console.log(chalk.yellowBright(`[WARN] Comando no encontrado: "${command}"`));
  }
};
