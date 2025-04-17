export function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function formatNumber(number) {
  return Intl.NumberFormat('es-AR').format(number);
}

export function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}