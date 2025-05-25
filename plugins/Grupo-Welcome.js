import fs from 'fs';
import path from 'path';

const bienvenidaPath = path.join('lib', 'database', 'welcome.json');
if (!fs.existsSync(bienvenidaPath)) fs.writeFileSync(bienvenidaPath, '[]');

function loadBienvenidaList() {
  return JSON.parse(fs.readFileSync(bienvenidaPath));
}

function saveBienvenidaList(list) {
  fs.writeFileSync(bienvenidaPath, JSON.stringify(list, null, 2));
}

export default {
  command: ['bienvenida', 'welcome'],
  help: ['*Ⓦᴇʟᴄᴏᴍᴇ <ᴏɴ/ᴏғғ>*'],
  tags: ['*𝔾ℝ𝕌ℙ𝕆𝕊*'],

  run: async (m, { conn, args, isGroup, isAdmin, isBotAdmin, prefix, command }) => {
    if (!isGroup) {
      return await m.reply('*[ ❗ ] ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ ғᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏs.*');
    }
    if (!isAdmin) {
      return await m.reply('*[ ❗ ] sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }
    if (!isBotAdmin) {
      return await m.reply('*[ ❗ ] ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
    }

    const accion = args[0]?.toLowerCase();
    if (!accion || !['on', 'off'].includes(accion)) {
      return await m.reply(`*[ ❗ ] ᴇʟ ᴜsᴏ ᴄᴏʀʀᴇᴄᴛᴏ ᴇs: ${prefix + command} on | ${prefix + command} off*`);
    }

    const id = m.key.remoteJid;
    let bienvenidaList = loadBienvenidaList();

    if (accion === 'on') {
      if (bienvenidaList.includes(id)) {
        return await m.reply('*[ ⚠️ ] ʟᴀ ʙɪᴇɴᴠᴇɴɪᴅᴀ ʏᴀ ᴇsᴛᴀ ᴀᴄᴛɪᴠᴀᴅᴀ ᴇɴ ᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
      }
      bienvenidaList.push(id);
      saveBienvenidaList(bienvenidaList);
      await m.reply('*[ ✅ ] ʙɪᴇɴᴠᴇɴɪᴅᴀ ᴀᴄᴛɪᴠᴀᴅᴀ ᴇɴ ᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
    } else if (accion === 'off') {
      if (!bienvenidaList.includes(id)) {
        return await m.reply('*[ ⚠️ ] ʟᴀ ʙɪᴇɴᴠᴇɴɪᴅᴀ ʏᴀ ᴇsᴛᴀ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴀ ᴇɴ ᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
      }
      bienvenidaList = bienvenidaList.filter(gid => gid !== id);
      saveBienvenidaList(bienvenidaList);
      await m.reply('*[ ✅ ] ʙɪᴇɴᴠᴇɴɪᴅᴀ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴀ ᴇɴ ᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
    }
  }
};