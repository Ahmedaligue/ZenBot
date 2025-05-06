import axios from 'axios';

export default {
  command: ['clima'],
  help: ['𝙲𝙻𝙸𝙼𝙰 <𝚌𝚒𝚞𝚍𝚊𝚍>'],
  tags: ['🔍 𝗕𝗨́𝗦𝗤𝗨𝗘𝗗𝗔𝗦'],

  run: async (m, { text, conn, prefix, command }) => {
    if (!text) return m.reply(`☁️ *Uso correcto:* ${prefix + command} ciudad\n_Ejemplo:_ ${prefix + command} Buenos Aires`);

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

      let mensaje = `╭───⛅ *CLIMA ACTUAL* ⛅───╮\n` +
        `├ 📍 *Ubicación:* ${area}, ${region}, ${country}\n` +
        `├ 🌡️ *Temperatura:* ${temp} °C\n` +
        `├ ☁️ *Condición:* ${desc}\n` +
        `├ 💧 *Humedad:* ${humidity}%\n` +
        `└ 🌬️ *Viento:* ${wind} km/h\n╰───────────────╯`;

      await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply('❌ *Ocurrió un error al obtener el clima. Probá más tarde.*');
    }
  }
};