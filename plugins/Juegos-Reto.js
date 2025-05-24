import fs from 'fs';

export default {
  command: ['reto'],
  help: ['*Ⓡᴇᴛᴏ*'],
  tags: ['*𝕁𝕌𝔼𝔾𝕆𝕊*'],

  run: async (m, { client }) => {
    const retos = [
      "Baila sin música durante 1 minuto.",
      "Envía un mensaje gracioso a tu último contacto.",
      "Imita a tu personaje de serie favorito por 30 segundos.",
      "Cuenta un chiste que te guste mucho.",
      "Haz 10 sentadillas en fila.",
      "Habla con acento extranjero por 2 minutos.",
      "Publica una foto divertida en tus redes sociales.",
      "Haz una mueca y mantenla por 20 segundos.",
      "Canta el coro de tu canción favorita.",
      "Muestra el último mensaje que enviaste.",
      "Envía un cumplido sincero a alguien aquí.",
      "Imita a un animal por 15 segundos.",
      "Haz 15 saltos en el lugar.",
      "Cuéntanos tu sueño más raro.",
      "Envía un emoji que describa tu día.",
      "Haz una pirueta o giro donde estés.",
      "Imita la risa de alguien famoso.",
      "Haz un dibujo rápido y muéstralo.",
      "Baila una canción que te guste ahora mismo.",
      "Dile algo bonito a la persona que más quieres.",
      "Imita tu película favorita en 30 segundos.",
      "Envía una frase motivadora a alguien.",
      "Haz una pose de superhéroe y envía la foto.",
      "Cuenta una anécdota graciosa de tu infancia.",
      "Haz 20 abdominales sin parar.",
      "Envía un mensaje diciendo “te quiero” a alguien.",
      "Imita a un personaje de videojuego.",
      "Haz sonidos de animales y que adivinen cuál es.",
      "Baila una canción que odies.",
      "Canta el abecedario al revés.",
      "Haz 10 flexiones de brazo.",
      "Envía una foto de algo azul que tengas cerca.",
      "Cuenta un secreto sin decir tu nombre.",
      "Haz una pose para foto y envíala.",
      "Imita la voz de tu amigo/a más cercano.",
      "Baila como si nadie te estuviera mirando.",
      "Cuenta tu peor mentira y si te atraparon.",
      "Envía un mensaje divertido a tu grupo.",
      "Haz 30 segundos de silencio total.",
      "Imita una escena de película dramática.",
      "Haz 15 saltos con aplauso.",
      "Envía un emoji que te represente ahora mismo.",
      "Cuenta tu meta más loca y por qué.",
      "Baila una canción que te haga feliz.",
      "Haz 10 segundos de poses ridículas y envía foto.",
      "Imita a un personaje de caricatura.",
      "Envía un mensaje diciendo tu palabra favorita.",
      "Cuenta un miedo absurdo que tengas.",
      "Haz una imitación de tu profesor/a favorito/a.",
      "Envía un cumplido a alguien sin que lo espere.",
      "Haz 20 segundos de baile libre.",
      "Cuenta una broma que te haya hecho reír mucho.",
      "Imita una escena de comedia.",
      "Haz 10 saltos en tijera.",
      "Envía una foto de tu lugar favorito en casa.",
      "Cuenta un sueño que recuerdes bien.",
      "Haz sonidos con la boca y que adivinen qué es.",
      "Envía un mensaje motivador a todos aquí.",
      "Haz 10 segundos de poses de modelaje.",
      "Imita la voz de un cantante famoso.",
      "Baila una canción que no conoces bien."
    ];

    const reto = retos[Math.floor(Math.random() * retos.length)];

    const rutaImagen = './media/verdad-reto.jpg';
    const imgBuffer = fs.readFileSync(rutaImagen);

    await client.sendMessage(m.chat, {
      image: imgBuffer,
      caption: `*🔥 ʀᴇᴛᴏ:*\n${reto}`
    }, { quoted: m });
  }
};