#!/data/data/com.termux/files/usr/bin/bash

echo "Actualizando paquetes..."
pkg update -y && pkg upgrade -y

echo "Instalando dependencias base..."
pkg install -y git nodejs ffmpeg imagemagick python

echo "Comprobando si Yarn está instalado..."
if ! command -v yarn &> /dev/null
then
    echo "Yarn no está instalado. Instalando..."
    npm install -g yarn
else
    echo "Yarn ya está instalado."
fi

echo "Comprobando si yt-dlp está instalado..."
if ! command -v yt-dlp &> /dev/null
then
    echo "yt-dlp no está instalado. Instalando..."
    pip install -U yt-dlp
else
    echo "yt-dlp ya está instalado."
fi

echo "Setup completado exitosamente."
echo "Iniciando el bot..."

# Bucle para mantener el bot corriendo y reiniciarlo si se detiene
while true; do
    echo "Iniciando el bot..."
    yarn start

    echo "El bot se ha detenido. Reiniciando en 2 segundos..."
    sleep 2
done