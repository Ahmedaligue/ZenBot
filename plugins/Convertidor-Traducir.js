import axios from 'axios'
import * as cheerio from 'cheerio'

const idiomas = {
  af: 'Afrikáans', sq: 'Albanés', am: 'Amárico', ar: 'Árabe', hy: 'Armenio',
  az: 'Azerí', eu: 'Euskera', be: 'Bielorruso', bn: 'Bengalí', bs: 'Bosnio',
  bg: 'Búlgaro', ca: 'Catalán', ceb: 'Cebuano', ny: 'Chichewa', zh: 'Chino',
  co: 'Corso', hr: 'Croata', cs: 'Checo', da: 'Danés', nl: 'Neerlandés',
  en: 'Inglés', eo: 'Esperanto', et: 'Estonio', tl: 'Filipino', fi: 'Finés',
  fr: 'Francés', fy: 'Frisón', gl: 'Gallego', ka: 'Georgiano', de: 'Alemán',
  el: 'Griego', gu: 'Gujarati', ht: 'Criollo haitiano', ha: 'Hausa',
  haw: 'Hawaiano', he: 'Hebreo', hi: 'Hindi', hmn: 'Hmong', hu: 'Húngaro',
  is: 'Islandés', ig: 'Igbo', id: 'Indonesio', ga: 'Irlandés', it: 'Italiano',
  ja: 'Japonés', jw: 'Javanés', kn: 'Kannada', kk: 'Kazajo', km: 'Khmer',
  ko: 'Coreano', ku: 'Kurdo', ky: 'Kirguís', lo: 'Lao', la: 'Latín', lv: 'Letón',
  lt: 'Lituano', lb: 'Luxemburgués', mk: 'Macedonio', mg: 'Malgache',
  ms: 'Malayo', ml: 'Malayalam', mt: 'Maltés', mi: 'Maorí', mr: 'Maratí',
  mn: 'Mongol', my: 'Birmano', ne: 'Nepalí', no: 'Noruego', ps: 'Pastún',
  fa: 'Persa', pl: 'Polaco', pt: 'Portugués', pa: 'Panyabí', ro: 'Rumano',
  ru: 'Ruso', sm: 'Samoano', gd: 'Gaélico escocés', sr: 'Serbio',
  st: 'Sesotho', sn: 'Shona', sd: 'Sindhi', si: 'Cingalés', sk: 'Eslovaco',
  sl: 'Esloveno', so: 'Somalí', es: 'Español', su: 'Sudanés', sw: 'Suajili',
  sv: 'Sueco', tg: 'Tayiko', ta: 'Tamil', te: 'Telugu', th: 'Tailandés',
  tr: 'Turco', uk: 'Ucraniano', ur: 'Urdu', ug: 'Uigur', uz: 'Uzbeko',
  vi: 'Vietnamita', cy: 'Galés', xh: 'Xhosa', yi: 'Yidis', yo: 'Yoruba',
  zu: 'Zulú'
}

export default {
  command: ['traducir', 'tc', 'translate'],
  help: ['*Ⓣʀᴀᴅᴜᴄɪʀ <ɪᴅɪᴏᴍᴀ>: <ᴛᴇxᴛᴏ>*'],
  tags: ['*ℂ𝕆ℕ𝕍𝔼ℝ𝕋𝕀𝔻𝕆ℝ*'],

  run: async (m, { text, command, prefix }) => {
    const listaIdiomas = Object.entries(idiomas)
      .map(([code, name]) => `• *${code}*: ${name}`)
      .join('\n')

    if (!text) {
      return m.reply(`*[ ❗ ] ᴜsᴀ́ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴀsɪ́:*\n${prefix + command} <idioma>: <texto>\n\n*ᴇᴊᴇᴍᴘʟᴏ:* ${prefix + command} en: ¿Cómo estás?\n\n*𝐈𝐃𝐈𝐎𝐌𝐀𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒:*\n\n${listaIdiomas}`)
    }

    const partes = text.split(/:|-|>|=>|\|/)
    const codigo = partes[0]?.trim().toLowerCase()
    const mensaje = partes.slice(1).join(':').trim()

    if (!idiomas[codigo]) {
      return m.reply(`*[ ❗ ] ᴄᴏ́ᴅɪɢᴏ ᴅᴇ ɪᴅɪᴏᴍᴀ ɴᴏ ᴠᴀ́ʟɪᴅᴏ.*\n\n*ᴜsᴀ́ ᴜɴᴏ ᴅᴇ ᴇsᴛᴏs:*\n\n${listaIdiomas}`)
    }

    if (!mensaje) {
      return m.reply('*[ ❗ ] ɴᴏ ᴇsᴄʀɪʙɪsᴛᴇ ϙᴜᴇ́ ϙᴜᴇʀᴇ́s ᴛʀᴀᴅᴜᴄɪʀ.*')
    }

    try {
      const url = `https://translate.google.com/m?sl=auto&tl=${codigo}&q=${encodeURIComponent(mensaje)}`
      const res = await axios.get(url)
      const $ = cheerio.load(res.data)
      const resultado = $('div.result-container').text()

      if (!resultado) throw '*[ ❌ ] ɴᴏ sᴇ ᴘᴜᴅᴏ ᴏʙᴛᴇɴᴇʀ ʟᴀ ᴛʀᴀᴅᴜᴄᴄɪᴏ́ɴ.*'

      m.reply(`🌍 *ᴛʀᴀᴅᴜᴄᴄɪᴏ́ɴ (${idiomas[codigo]})*\n\n${resultado}`)
    } catch (err) {
      console.error(err)
      return m.reply('*ʜᴍᴍ... ᴀʟɢᴏ sᴀʟɪᴏ́ ᴍᴀʟ, ᴅᴇʙᴇʀɪ́ᴀs ʀᴇᴘᴏʀᴛᴀʀ ᴇsᴛᴇ ᴘʀᴏʙʟᴇᴍᴀ. 📍*')
    }
  }
}