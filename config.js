import { fileURLToPath } from 'url';
import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';

export const config = {
  prefix: '/',
  owner: '+5493772455367', // Cambia por tu número
  botName: 'ZenBot',
  ownerName: 'AxelDev',
  instagram: 'https://www.instagram.com/axel_vegaa', // Tu Instagram
  github: 'https://github.com/AxelDev09', // Tu GitHub
};

// Recargar config.js automáticamente cuando se detecten cambios
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright(`♻️ Se actualizó '${file.split('/').pop()}'`));
  import(`${file}?update=${Date.now()}`);
});