# ZenBot

<p align="center">
  <img src="https://your-logo-url.com/logo.png" alt="ZenBot Logo" width="200"/>
</p>

<h1 align="center">ZenBot</h1>

<p align="center">
  Un bot de WhatsApp para gestión de grupos, creado desde cero.<br>
  Diseñado para Termux, auténtico, único y en constante evolución.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Versión-1.0-blue.svg">
  <img src="https://img.shields.io/badge/WhatsApp-MultiDevice-brightgreen.svg">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow.svg">
  <img src="https://img.shields.io/badge/Hecho%20con-Pasión-red.svg">
</p>

---

## 📌 Sobre ZenBot

ZenBot fue creado con el objetivo de facilitar la administración de grupos en WhatsApp. Algunas de sus funciones principales son:

- Agregar o eliminar integrantes.
- Abrir o cerrar grupos.
- Cambiar nombre o descripción del grupo.
- Menú interactivo con interfaz amigable.
- Lista clara de comandos.
- Soporte multidispositivo (conexión en varios dispositivos).
- Conexión mediante **código QR** (próximamente: emparejamiento por código).

> Este bot aún está en desarrollo, por lo que puede presentar errores.  
> Si querés colaborar o apoyar el proyecto, escribime:  
> **+54 9 3772 455367**

---

## ⚙️ Instalación (en Termux)

```bash
pkg update && pkg upgrade
pkg install git nodejs ffmpeg imagemagick
pkg install yarn
termux-setup-storage
git clone https://github.com/AxelDev09/ZenBot
cd ZenBot
yarn install
node index.js
```
