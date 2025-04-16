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
  const { state, saveCreds } = await useMultiFileAuthState(authFile);
  const conn = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger
  });

  conn.ev.on('creds.update', saveCreds);

  if (!fs.existsSync(path.join(authFile, 'creds.json'))) {
    if (!conn.authState.creds.registered) {
      let phoneNumber = '';
      let addNumber;

      do {
        phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(mid.phNumber2())));
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (!phoneNumber.startsWith('+')) phoneNumber = `+${phoneNumber}`;
      } while (!await isValidPhoneNumber(phoneNumber));

      addNumber = phoneNumber.replace(/\D/g, '');

      try {
        let codeBot = await conn.requestPairingCode(addNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        console.log(chalk.bold.white(chalk.bgMagenta(mid.pairingCode)), chalk.bold.white(codeBot));
      } catch (err) {
        console.log(chalk.redBright('Error al generar el código de emparejamiento:'), err.message || err);
      }
    }
  }

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error instanceof Boom) && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
      console.log(chalk.red('Conexión cerrada. Reintentando...'), shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log(chalk.green('Bot conectado con éxito.'));
    }
  });

  conn.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key?.remoteJid === 'status@broadcast') return;
    await handler(m, conn);
  });

  // Cargar plugins al inicio
  await loadPlugins();
}

startBot();