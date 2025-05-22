import axios from 'axios';

export default {
  command: ['clima', 'pronostico'],
  help: ['*Ⓒʟɪᴍᴀ <ᴄɪᴜᴅᴀᴅ>*'],
  tags: ['*𝔹𝕌́𝕊ℚ𝕌𝔼𝔻𝔸𝕊*'],

  run: async (m, { text, conn, prefix, command }) => {
    if (!text) 
      return m.tutorial(`*[ 🌤️] ᴘᴀʀᴀ sᴀʙᴇʀ ᴇʟ ᴄʟɪᴍᴀ ᴇs ɴᴇᴄᴇsᴀʀɪᴏ ϙᴜᴇ ᴇsᴄʀɪʙᴀs ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ᴛᴜ ᴄɪᴜᴅᴀᴅ.* (ᴇᴊ: *${prefix + command}* _Ciudad_)`);

    try {
      let res = await axios.get(`https://wttr.in/${encodeURIComponent(text)}?format=j1`);
      let data = res.data;

      let area = data.nearest_area?.[0]?.areaName?.[0]?.value || text;
      let region = data.nearest_area?.[0]?.region?.[0]?.value || '';
      let country = data.nearest_area?.[0]?.country?.[0]?.value || '';
      let temp = data.current_condition?.[0]?.temp_C;
      let desc = data.current_condition?.[0]?.weatherDesc?.[0]?.value;
      let humidity = data.current_condition?.[0]?.humidity;
      let wind = data.current_condition?.[0]?.windspeedKmph;

      let mensaje =
`╭─── *𝐂𝐋𝐈𝐌𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 🌤️* ───╮
├ 📍 *ᴜʙɪᴄᴀᴄɪᴏ́ɴ:* ${area}, ${region}, ${country}
├ 🌡️ *ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴀ:* ${temp} °ᶜ
├ ☁️ *ᴄᴏɴᴅɪᴄɪᴏ́ɴ:* ${desc}
├ 💧 *ʜᴜᴍᴇᴅᴀᴅ:* ${humidity}%
└ 🌬️ *ᴠɪᴇɴᴛᴏ:* ${wind} ᴋᴍ/ʜ
╰─────────────────────╯`;

      await m.reply(mensaje);
    } catch (error) {
      console.error(error);
      m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*');
    }
  }
};