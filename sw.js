// Service worker: zorgt dat de app offline opent en plaatjes snel laden.
// Verander VERSIE als je plaatjes vervangt met dezelfde bestandsnaam.
const VERSIE = "trein-v23";
const BESTANDEN = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png",
  "plaatjes/ddz-4.png",
  "plaatjes/ddz-6.png",
  "plaatjes/flirt-3.png",
  "plaatjes/flirt-4.png",
  "plaatjes/gtw_6_achterhoek.png",
  "plaatjes/gtw_8_achterhoek.png",
  "plaatjes/ice.png",
  "plaatjes/icm_3.png",
  "plaatjes/icng-8.png",
  "plaatjes/icng_B_8.png",
  "plaatjes/keolis_flirt3_blauwnet.png",
  "plaatjes/lint41_arriva.png",
  "plaatjes/slt_4.png",
  "plaatjes/slt_6.png",
  "plaatjes/sng_3.png",
  "plaatjes/sng_4.png",
  "plaatjes/virm-6-nieuw.png",
  "plaatjes/virm-6-oud.png",
  "plaatjes/virm-6.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSIE).then(c => c.addAll(BESTANDEN)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSIE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // NS-aanvragen en lettertypen gaan gewoon door
  // Alleen geslaagde antwoorden bewaren. Een 404 mag nooit in de cache komen, anders blijft die "niet gevonden" hangen.
  const bewaar = (req, r) => { if (r && r.ok) { const k = r.clone(); caches.open(VERSIE).then(c => c.put(req, k)); } return r; };
  if (e.request.mode === "navigate") { // pagina: eerst netwerk, zodat updates direct zichtbaar zijn
    e.respondWith(fetch(e.request).then(r => bewaar(e.request, r))
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  } else { // plaatjes en iconen: eerst cache
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(n => bewaar(e.request, n))));
  }
});
