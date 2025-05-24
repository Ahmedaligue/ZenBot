import fs from 'fs';

export default {
  command: ['verdad'],
  help: ['*Ⓥᴇʀᴅᴀᴅ*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { client }) => {
    const preguntas = [
      "¿Cuál es el secreto más vergonzoso que nunca le contaste a nadie?",
      "¿Alguna vez fingiste estar enfermo para no ir a un lugar?",
      "¿Quién fue tu primer amor y qué sentiste?",
      "¿Qué es lo más loco que has hecho por amor?",
      "¿Cuál es tu mayor miedo en una relación?",
      "¿Alguna vez mentiste para salir de un compromiso?",
      "¿Qué cosa nunca le has dicho a tu mejor amigo?",
      "¿Has tenido un crush secreto en alguien cercano?",
      "¿Cuál es la peor cita que has tenido?",
      "¿Qué es lo que más te gusta de ti mismo?",
      "¿Has engañado alguna vez en un juego o examen?",
      "¿Qué es lo más atrevido que has hecho en público?",
      "¿Cuál fue tu peor error y qué aprendiste de él?",
      "¿Alguna vez has sentido celos sin razón?",
      "¿Qué es lo más raro que te gusta comer?",
      "¿Has tenido alguna vez un sueño raro o extraño?",
      "¿Cuál es tu recuerdo favorito de la infancia?",
      "¿Alguna vez has roto algo y no lo has contado?",
      "¿Qué talento oculto tienes que nadie sabe?",
      "¿Cuál es tu mayor inseguridad?",
      "¿Has tenido una fantasía que nunca le has contado a nadie?",
      "¿Cuál es el lugar más extraño donde has estado?",
      "¿Qué te hace reír sin importar qué?",
      "¿Alguna vez has hecho algo ilegal sin que te atraparan?",
      "¿Cuál es tu meta más loca para el futuro?",
      "¿Qué canción te pone triste instantáneamente?",
      "¿Cuál ha sido tu mayor mentira?",
      "¿Has tenido un apodo raro o vergonzoso?",
      "¿Cuál es la peor pelea que has tenido con alguien?",
      "¿Qué hábito extraño tienes?",
      "¿Alguna vez has cambiado por alguien?",
      "¿Qué te haría perder la confianza en alguien?",
      "¿Cuál es la cosa más tonta que has hecho por diversión?",
      "¿Has sentido amor a primera vista?",
      "¿Qué es lo más difícil que has perdonado?",
      "¿Cuál es tu sueño más grande?",
      "¿Has sentido alguna vez que no encajas?",
      "¿Qué es lo más valiente que has hecho?",
      "¿Cuál es tu mayor arrepentimiento?",
      "¿Has guardado un secreto que te duele?",
      "¿Qué es lo que más te molesta de ti mismo?",
      "¿Cuál fue tu momento más embarazoso?",
      "¿Qué persona ha influido más en tu vida?",
      "¿Qué harías si supieras que no puedes fallar?",
      "¿Cuál es tu peor hábito en una relación?",
      "¿Alguna vez te has sentido completamente feliz?",
      "¿Qué te gustaría cambiar de tu pasado?",
      "¿Qué es lo que más valoras en una amistad?",
      "¿Has amado a alguien que no te amó?",
      "¿Qué te hace sentir orgulloso de ti?",
      "¿Cuál es tu mayor miedo oculto?",
      "¿Qué te gustaría aprender que aún no sabes?",
      "¿Cuál es la lección más importante que has aprendido?",
      "¿Qué significa para ti el éxito?",
      "¿Cuál es la cosa más dulce que alguien ha hecho por ti?",
      "¿Qué te hace sentir vivo?",
      "¿Qué te gustaría que las personas recuerden de ti?",
      "¿Cuál es tu frase o mantra favorito para motivarte?"
    ];

    const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];

    const rutaImagen = './media/verdad-reto.jpg';
    const imgBuffer = fs.readFileSync(rutaImagen);

    await client.sendMessage(m.chat, {
      image: imgBuffer,
      caption: `*❓ ᴠᴇʀᴅᴀᴅ ᴘʀᴇɢᴜɴᴛᴀ:*\n${pregunta}`
    }, { quoted: m });
  }
};