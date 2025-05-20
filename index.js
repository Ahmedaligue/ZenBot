import * as baileys from '@whiskeysockets/baileys';
import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import { handler, loadPlugins } from './lib/handler.js';

const { makeWASocket, useMultiFileAuthState, DisconnectReason } = baileys;
const logger = pino({ level: 'silent' });

const authFile = 'session';
const mid = {
  phNumber2: () => 'Ingresá tu número con código de país (ej: +54911xxxxxx): ',
  pairingCode: 'Código de emparejamiento generado:',
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise(resolve => rl.question(text, resolve));

async function isValidPhoneNumber(number) {
  return /^\+?\d{10,15}$/.test(number);
}

async function startBot() {
  console.log(chalk.bgCyan.bold.white('🌟 ZenBot Iniciado 🌟'));

  const { state, saveCreds } = await useMultiFileAuthState(authFile);
  const conn = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger
  });

  conn.ev.on('creds.update', saveCreds);

  const hasSession = fs.existsSync(path.join(authFile, 'creds.json'));

  if (!hasSession && !conn.authState.creds.registered) {
    let phoneNumber = '';
    let addNumber;

    do {
      phoneNumber = await question(chalk.bgBlueBright(chalk.bold.white(mid.phNumber2())));
      phoneNumber = phoneNumber.replace(/\D/g, '');
      if (!phoneNumber.startsWith('+')) phoneNumber = `+${phoneNumber}`;
    } while (!await isValidPhoneNumber(phoneNumber));

    addNumber = phoneNumber.replace(/\D/g, '');

    try {
      let codeBot = await conn.requestPairingCode(addNumber);
      codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
      console.log(chalk.bgMagenta.bold.white(mid.pairingCode), chalk.bold.cyan(codeBot));
    } catch (err) {
      console.log(chalk.bgRed.bold.white('❌ Error al generar el código de emparejamiento:'), chalk.bold.red(err.message || err));
    }
  }

  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = code !== DisconnectReason.loggedOut;

      if (hasSession) {
        console.log(chalk.bgYellow.black('⚠️ Ya hay una sesión activa.'));
        console.log(chalk.bgYellowBright.black('🚨 Para conectar nuevamente, elimina la carpeta "session" y vuelve a intentar.'));
      }

      console.log(chalk.bgRed.white('❌ Conexión cerrada. Reintentando...'));

      if (shouldReconnect) startBot();
    }

    if (connection === 'open') {
      console.log(chalk.bgGreenBright.bold.black('✅ Bot conectado con éxito.'));
      await loadPlugins();
    }
  });

  conn.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key?.remoteJid === 'status@broadcast') return;
    await handler(m, conn);
  });
}

startBot();