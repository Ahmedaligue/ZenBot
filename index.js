import { makeWASocket, DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import chalk from 'chalk';
import pino from 'pino';
import { handler, loadPlugins } from './lib/handler.js';
import cfonts from 'cfonts';
import qrcode from 'qrcode-terminal';
import { fileURLToPath } from 'url';
import { watchFile, unwatchFile } from 'fs';

// Banner
cfonts.say('ZenBot', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'blue'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0'
});

console.log(chalk.cyanBright('⚙️  Iniciando ZenBot...'));

const startBot = async () => {
  await loadPlugins();

  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' })
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log(chalk.yellowBright(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ ⚠️  Escaneá este código QR 
┃ para vincular tu WhatsApp:
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`));
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = reason !== DisconnectReason.loggedOut;

      console.log(chalk.redBright(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔌 Conexión cerrada:
┃ 💬 Motivo: ${chalk.bold(lastDisconnect?.error?.message || 'Desconocido')}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`));

      if (shouldReconnect) {
        console.log(chalk.yellowBright('♻️  Reconectando...'));
        startBot();
      } else {
        console.log(chalk.redBright('🛑 Sesión cerrada. Escaneá el QR de nuevo.'));
      }
    } else if (connection === 'open') {
      console.log(chalk.greenBright(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ ✅ Conexión abierta con éxito
┃ 📅 Fecha: ${chalk.gray(new Date().toLocaleString('es-AR'))}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`));
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    if (!messages || !messages[0]?.message) return;
    try {
      await handler(messages[0], sock);
    } catch (err) {
      console.error(chalk.red('❌ Error al manejar mensaje:'), err);
    }
  });
};

startBot();

// Auto-reload al editar este archivo
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright(`♻️ Se actualizó '${file.split('/').pop()}'`));
  import(`${file}?update=${Date.now()}`);
});