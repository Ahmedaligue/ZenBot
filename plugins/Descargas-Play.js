import { spawn } from 'child_process';
import ytSearch from 'yt-search';

const yts = ytSearch;

const getYoutubeAudioBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn('yt-dlp', [
      '-f', 'bestaudio',
      '--extract-audio',
      '--audio-format', 'mp3',
      '-o', '-',
      url
    ]);

    const chunks = [];
    ytdlp.stdout.on('data', chunk => chunks.push(chunk));
    ytdlp.stderr.on('data', data => {
      console.log(`📥 yt-dlp: ${data.toString().trim()}`);
    });

    ytdlp.on('close', code => {
      if (code !== 0) {
        return reject(new Error('yt-dlp falló'));
      }
      console.log('[ ✅ ] Audio de YouTube descargado correctamente.');
      resolve(Buffer.concat(chunks));
    });

    ytdlp.on('error', err => {
      console.log('Error:', err);
      reject(err);
    });
  });
};

export default {
  command: ['play', 'playaud', 'ytaud', 'ytmp3'],
  help: ['*Ⓟʟᴀʏ <ᴛᴇxᴛᴏ/ʟɪɴᴋ>*'],
  tags: ['*𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊*'],

  run: async (m, { conn, text, chatId, prefix, command }) => {
    if (!text) {
      return m.tutorial(`*[ ❗ ] ɪɴɢʀᴇsᴀ ᴜɴ ᴇɴʟᴀᴄᴇ ᴏ ᴛᴇxᴛᴏ ᴅᴇ ʏᴛ ᴘᴀʀᴀ ᴅᴇsᴄᴀʀɢᴀʀ ᴛᴜ ᴄᴀɴᴄɪᴏ́ɴ.* (ᴇᴊ: *${prefix + command}* _Link o texto_`);
    }

    try {
      const resultados = await yts(text);
      const video = resultados.all.find(v => v.type === 'video');

      if (!video) return m.reply('*[ ❌ ] ɴᴏ ᴇɴᴄᴏɴᴛʀᴇ́ ɴɪɴɢᴜ́ɴᴀ ᴄᴀɴᴄɪᴏ́ɴ ᴄᴏɴ ᴇsᴇ ɴᴏᴍʙʀᴇ.*');

      await m.reply('*[ 🔍 ] ʙᴜsᴄᴀɴᴅᴏ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ ʏ ᴅᴇsᴄᴀʀɢᴀɴᴅᴏ ᴇʟ ᴀᴜᴅɪᴏ...*');

      await conn.sendMessage(chatId, {
        image: { url: video.thumbnail },
        caption: `*𝐀𝐔𝐃𝐈𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 🎶*\n\n` +
                 `📌 *ᴛɪ́ᴛᴜʟᴏ:* ${video.title}\n` +
                 `⏱️ *ᴅᴜʀᴀᴄɪᴏ́ɴ:* ${video.timestamp}\n` +
                 `🎙️ *ᴄᴀɴᴀʟ:* ${video.author.name}\n` +
                 `📅 *ᴘᴜʙʟɪᴄᴀᴅᴏ:* ${video.ago}\n` +
                 `🔗 *ʟɪɴᴋ:* ${video.url}\n\n` +
                 `⏬ *ᴇɴᴠɪᴀɴᴅᴏ ᴀᴜᴅɪᴏ...*`
      }, { quoted: m });

      const audioBuffer = await getYoutubeAudioBuffer(video.url);

      await conn.sendMessage(chatId, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${video.title.replace(/[\\/:*?"<>|]/g, '')}.mp3`
      }, { quoted: m });

    } catch (e) {
      console.error('Error:', e);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};