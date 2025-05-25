import * as baileys from '@whiskeysockets/baileys';
import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { handler, loadPlugins } from './lib/handler.js';
const bienvenidaPath = path.join('lib', 'database', 'welcome.json');
if (!fs.existsSync(bienvenidaPath)) fs.writeFileSync(bienvenidaPath, '[]');

function loadBienvenidaList() {
  return JSON.parse(fs.readFileSync(bienvenidaPath));
}

const { makeWASocket, useMultiFileAuthState, DisconnectReason } = baileys;
const logger = pino({ level: 'silent' });
const AUTH_FOLDER = 'session';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise(res => rl.question(q, res));
const isValidPhoneNumber = (num) => /^\+?\d{10,15}$/.test(num);

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
  const conn = makeWASocket({ auth: state, printQRInTerminal: false, logger });
  conn.ev.on('creds.update', saveCreds);

  const hasSession = fs.existsSync(path.join(AUTH_FOLDER, 'creds.json'));
  let connectingTimeout;

  if (!hasSession && !conn.authState.creds.registered) {
    let phone = '';
    do {
      phone = await question(chalk.blueBright('[ZENBOT] INGRESÁ TU NÚMERO CON CÓDIGO DE PAÍS (EJ: +54911XXXXXX): '));
      phone = phone.replace(/\D/g, '');
      if (!phone.startsWith('+')) phone = `+${phone}`;
    } while (!isValidPhoneNumber(phone));

    try {
      let code = await conn.requestPairingCode(phone.replace(/\D/g, ''));
      code = code?.match(/.{1,4}/g)?.join('-') || code;
      console.log(chalk.bgMagenta.bold.white('[ZENBOT] CÓDIGO DE EMPAREJAMIENTO GENERADO:'), chalk.cyan.bold(code));
    } catch (e) {
      console.error(chalk.bgRed.bold.white('[ZENBOT] ❌ ERROR AL GENERAR EL CÓDIGO DE EMPAREJAMIENTO:'), chalk.red.bold(e.message || e));
    }
  }

  conn.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (connection === 'close') {
      clearTimeout(connectingTimeout);
      const code = lastDisconnect?.error?.output?.statusCode;
      const reason = DisconnectReason[code] || 'DESCONOCIDO';

      if (code === DisconnectReason.loggedOut) {
        console.log(chalk.bgRed.bold.white('[ZENBOT] SESIÓN CERRADA. POR FAVOR, ELIMINÁ LA CARPETA "SESSION" PARA INICIAR SESIÓN NUEVAMENTE. ❌'));
        process.exit(0);
      } else if (code === DisconnectReason.connectionClosed || code === DisconnectReason.connectionLost) {
        console.log(chalk.bgYellowBright.black('[ZENBOT] ES NECESARIO REINICIAR, REINICIANDO... ⚠️'));
        startBot();
      } else if (code === DisconnectReason.timedOut) {
        console.log(chalk.bgYellowBright.black('[ZENBOT] TIEMPO DE CONEXIÓN AGOTADO. VERIFICÁ TU INTERNET. RECONECTANDO... ⚠️'));
        startBot();
      } else {
        console.log(chalk.bgRed.white(`[ZENBOT] CONEXIÓN CERRADA INESPERADAMENTE (MOTIVO: ${reason}). REINTENTANDO... ❌`));
        startBot();
      }
    }

    if (connection === 'connecting') {
      console.log(chalk.bgBlueBright.white('[ZENBOT] CONECTANDO AL SERVIDOR DE WHATSAPP... ⏳'));

      connectingTimeout = setTimeout(() => {
        console.log(chalk.bgRedBright.white('[ZENBOT] CONEXIÓN AGOTADA, REINICIANDO... ⚠️'));
        process.exit(1);
      }, 20000);
    }

    if (connection === 'open') {
      clearTimeout(connectingTimeout);
      console.log(chalk.bgGreenBright.bold.black('[ZENBOT] BOT CONECTADO CON ÉXITO. ✅'));
      loadPlugins();
    }

    if (qr) {
      console.log(chalk.bgMagenta.white('[ZENBOT] ESCANEÁ EL CÓDIGO QR PARA EMPAREJAR EL DISPOSITIVO. 📲'));
    }
  });

  conn.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key?.remoteJid === 'status@broadcast') return;
    await handler(m, conn);
  });

  conn.ev.on('group-participants.update', async ({ id, participants, action }) => {
    try {
      const bienvenidaList = loadBienvenidaList();
      if (!bienvenidaList.includes(id)) return;

      const usuario = participants[0];
      const nombre = usuario.split('@')[0];

      let fotoPerfil;
      try {
        fotoPerfil = await conn.profilePictureUrl(usuario, 'image');
      } catch {
        fotoPerfil = 'https://telegra.ph/file/b5427ea4b8701bc47e751.jpg';
      }

      if (action === 'add') {
        const texto = `*_Tenemos un nuevo integrante en la familia_*\n*NOMBRE:* @${nombre}\n\n¡Bienvenido(a) 🌹🌹`;
        await conn.sendMessage(id, {
          image: { url: fotoPerfil },
          caption: texto,
          mentions: [usuario]
        });
      }

      if (action === 'remove') {
        const texto = `*_Un integrante ha salido del grupo_*\n*NOMBRE:* @${nombre}\n\n¡Te deseamos lo mejor!`;
        await conn.sendMessage(id, {
          image: { url: fotoPerfil },
          caption: texto,
          mentions: [usuario]
        });
      }
    } catch (err) {
      console.log(chalk.red('[ZENBOT] Error en bienvenida/despedida:'), err);
    }
  });
}

startBot();