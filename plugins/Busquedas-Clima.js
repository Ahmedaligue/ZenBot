import axios from 'axios';

export default {
  command: ['clima', 'pronostico'],
  help: ['*Ⓒʟɪᴍᴀ <ᴄɪᴜᴅᴀᴅ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, conn, prefix, command }) => {
    if (!text) return m.reply(`*[ 🌤️ ] ᴘᴀʀᴀ sᴀʙᴇʀ ᴇʟ ᴄʟɪᴍᴀ ᴛᴇɴᴇs ǫᴜᴇ ᴇsᴄʀɪʙɪʀ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ʟᴀ ᴄɪᴜᴅᴀᴅ. (ᴇᴊ: *${prefix + command}* _Ciudad_)`);

    try {
      const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: text,
          format: 'json',
          limit: 1,
          addressdetails: 1,
          'accept-language': 'es'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ChatGPT-Bot/1.0)'
        }
      });

      if (!geoRes.data || geoRes.data.length === 0) return m.reply('*[❗] ɴᴏ ᴘᴜᴅᴇ ᴇɴᴄᴏɴᴛʀᴀʀ ʟᴀ ᴜʙɪᴄᴀᴄɪᴏ́ɴ. ᴘʀᴏʙᴀ ᴄᴏɴ ᴏᴛʀᴏ ɴᴏᴍʙʀᴇ.*');

      const place = geoRes.data[0];
      const lat = place.lat;
      const lon = place.lon;
      const displayName = place.display_name.split(',')[0];

      const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          timezone: 'auto'
        }
      });

      const weather = weatherRes.data.current_weather;
      if (!weather) return m.reply('*[❗] ɴᴏ ᴘᴜᴅᴇ ᴏʙᴛᴇɴᴇʀ ᴇʟ ᴄʟɪᴍᴀ ᴀᴄᴛᴜᴀʟ.*');

      const weatherCodes = {
        0: "ᴅᴇsᴘᴇᴊᴀᴅᴏ",
        1: "ᴘᴀʀᴄɪᴀʟᴍᴇɴᴛᴇ ɴᴜʙʟᴀᴅᴏ",
        2: "ɴᴜʙʟᴀᴅᴏ",
        3: "ɴᴜʙʟᴀᴅᴏ",
        45: "ɴɪᴇʙʟᴀ",
        48: "ɴɪᴇʙʟᴀ ᴄᴏɴ ᴇsᴄʀᴀᴄʜᴀ",
        51: "ʟʟᴏᴠɪᴢɴᴀ ʟɪɢᴇʀᴀ",
        53: "ʟʟᴏᴠɪᴢɴᴀ ᴍᴏᴅᴇʀᴀᴅᴀ",
        55: "ʟʟᴏᴠɪᴢɴᴀ ᴅᴇɴsᴀ",
        61: "ʟʟᴜᴠɪᴀ ʟɪɢᴇʀᴀ",
        63: "ʟʟᴜᴠɪᴀ ᴍᴏᴅᴇʀᴀᴅᴀ",
        65: "ʟʟᴜᴠɪᴀ ꜰᴜᴇʀᴛᴇ",
        71: "ɴɪᴇᴠᴇ ʟɪɢᴇʀᴀ",
        73: "ɴɪᴇᴠᴇ ᴍᴏᴅᴇʀᴀᴅᴀ",
        75: "ɴɪᴇᴠᴇ ꜰᴜᴇʀᴛᴇ",
        80: "ᴄʜᴜʙᴀsᴄᴏs ʟɪɢᴇʀᴏs",
        81: "ᴄʜᴜʙᴀsᴄᴏs ᴍᴏᴅᴇʀᴀᴅᴏs",
        82: "ᴄʜᴜʙᴀsᴄᴏs ꜰᴜᴇʀᴛᴇs",
        95: "ᴛᴏʀᴍᴇɴᴛᴀ ᴇʟᴇᴄᴛʀɪᴄᴀ",
        99: "ᴛᴏʀᴍᴇɴᴛᴀ ᴄᴏɴ ɢʀᴀɴɪᴢᴏ"
      };

      const desc = weatherCodes[weather.weathercode] || 'ᴄᴏɴᴅɪᴄɪᴏ́ɴ ᴅᴇsᴄᴏɴᴏᴄɪᴅᴀ';

      const mensaje =
`╭─── *𝐂𝐋𝐈𝐌𝐀 𝐀𝐂𝐓𝐔𝐀𝐋* ───╮
├ 📍 *ᴄɪᴜᴅᴀᴅ:* ${displayName}
├ 🌡️ *ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴀ:* ${weather.temperature} °ᶜ
├ ☁️ *ᴄᴏɴᴅɪᴄɪᴏ́ɴ:* ${desc}
├ 🌬️ *ᴠɪᴇɴᴛᴏ:* ${weather.windspeed} ᴋᴍ/ʜ
╰─────────────────────╯`;

      await m.reply(mensaje);
    } catch (error) {
      console.error(error);
      m.reply('*[❗] ᴇʀʀᴏʀ ᴀʟ ᴏʙᴛᴇɴᴇʀ ᴇʟ ᴄʟɪᴍᴀ. ᴘʀᴏʙᴀ ᴄᴏɴ ᴏᴛʀᴀ ᴄɪᴜᴅᴀᴅ.*');
    }
  }
};