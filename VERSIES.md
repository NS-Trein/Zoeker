# Versielog Treinplek

## Regels (voor elke Claude)
1. Wordt er een bestand geüpload? Lees dit logboek eerst. Heeft de ander iets veranderd, zeg dan in 1 tot 3 zinnen wat.
2. Na elke aanpassing: zet **bovenaan** het log een regel met versie, datum, wie en wat er veranderd is (kort, max 5 punten).
3. Verhoog `VERSIE` in `sw.js` (bijv. `trein-v6`) en gebruik hetzelfde nummer hier.
4. Teken met je eigen naam: **Claude A** of **Claude B**.
5. Zet open vragen en dingen die niet getest zijn onderaan.

## Bestanden
Website: https://ns-trein.github.io/Zoeker/ (GitHub Pages)

`index.html` (de app) · `sw.js` (offline) · `manifest.webmanifest` · `icon-*.png` · `plaatjes/` · `diagnose.html` (testpagina) · `worker.js` (Cloudflare, niet op GitHub)

## Log (nieuwste bovenaan)
- **v15** · 10 okt 2026 · Claude B (gebaseerd op v14 van Claude A): `worker.js` opnieuw geschreven. /nabij vraagt nu **alle treinposities zonder parameters** op via `/virtual-train-api/vehicle` (zo doet een werkend voorbeeldproject met het product Ns-App het; met lat/lng/radius/limit gaf NS een 500) en filtert zelf op afstand (haversine, dichtstbij eerst). Daarna nog drie paden als reserve; bij falen komt er een 502 met de lijst van geprobeerde paden, bij 401/403/429 stopt hij na 1 poging. Werkt het pad dan staat het in `X-NS-Pad` (en de CORS-header daarvoor staat nu aan). /trein, /rit, /vertrek, /stations en /plaatje zitten er ook in. `index.html` en `diagnose.html` zijn niet veranderd.
- **v14** · 10 okt 2026 · Claude A: eerste echte NS-antwoord (vertrektijden Utrecht, 200 OK) bevestigt dat sleutel en Worker werken en dat `leesVertrek` klopt. NS-tijden hebben de vorm `+0200` (zonder dubbele punt); Safari kan die niet altijd parsen, dus `naarMs()` zet ze om naar `+02:00` (gebruikt in `fmt` en `ritStand`). Nog open: resultaat van /nabij en /rit.
- **v13** · 10 okt 2026 · Claude A: eerste echte test gaf 500 op /nabij: de Worker gebruikte `/virtual-train-api/api/v1/...`, maar de Virtual Train API antwoordt alleen op `/v1/...` (bron: README van github.com/ultimatelemon/perron, die ook meldt dat het product Ns-App de Virtual Train API bevat). `worker.js` gebruikt nu `/v1/...`, probeert bij /nabij en /trein meerdere paden achter elkaar en meldt het werkende pad in de header `X-NS-Pad` (en bij falen alle geprobeerde paden in het antwoord); `diagnose.html` toont dat; `leesNabij` in `index.html` accepteert meer antwoordvormen.
- **v12** · 10 okt 2026 · Claude A: `WORKER_URL` in `index.html` ingevuld (https://treinplek.cpqsws8cpg.workers.dev); de demo-balk verdwijnt daardoor en de app gebruikt echte NS-gegevens (met `?demo=1` in het adres krijg je nog steeds de demo). Verder niets veranderd.
- **v11** · 10 okt 2026 · Claude A: website-adres bekend (https://ns-trein.github.io/Zoeker/); `TOEGESTAAN` in `worker.js` ingevuld met https://ns-trein.github.io; gecontroleerd dat de app werkt vanuit de submap /Zoeker/ (geen absolute paden, service worker en offline-cache OK). Verder niets in de app veranderd.
- **v10** · 10 okt 2026 · Claude A: `diagnose.html` erbij (test Worker en NS-sleutel per route, met uitleg bij fout 401/403/404 en een Kopieer-knop); testuitleg in `worker.js` gecorrigeerd (de Worker-URL zelf in de browser openen geeft altijd 403). `index.html` is niet veranderd; de gebruiker vult zelf `WORKER_URL` in.
- **v9** · 10 okt 2026 · Claude A (gebaseerd op v8 van Claude B): vergrootglas bij het kiezen van je plek (kort tikken zet de cirkel meteen; vinger 0,23 s stilhouden en slepen toont een vergrootglas boven je vinger en de pagina scrolt dan niet mee); de melding "Tik eerst op je plek in de trein" staat nu in een rood vlak vlak boven de Deel-knop (schudt even, verdwijnt zodra je een plek kiest).
- **v8** · 10 okt 2026 · Claude B: in het deelplaatje is elk treindeel een eigen trein: de eerste bak van elk deel heeft een afgeronde linkerbovenhoek en de laatste bak een afgeronde rechterbovenhoek (bij 6 bakken in 2 delen dus ronding bij 1, 3, 4 en 6). Het kopje "Voorkant ... Achterkant" bovenin is gewoon zoals het was.
- **v7** · 10 okt 2026 · Claude B: tandwiel rechtsboven opent **Instellingen** (Animatie aan/uit + Zelf trein samenstellen verhuisd van het beginscherm); verversknop staat rechts als echte knop met tekst "Ververs" (hij zag er kapot uit door mijn eigen v6-stijl, die is weg); het grijze treinlogo staat er alleen nog als er niets anders op het scherm staat (puur CSS met `:has()`).
- **v6** · 10 okt 2026 · Claude B: animatie volgt niet meer de iPhone-instelling "Beperk beweging" (daardoor was hij onzichtbaar); knop "Animatie: aan/uit" onderaan de startpagina. Let op: Claude B = de Claude die dit log voor het eerst ziet; de eerdere regels (v2 t/m v5) zijn van de andere Claude, die als "Claude A" tekende. Het eerdere werk van Claude B (Kopieer-knop, testplek, ICE-stel 8001-8090) zit niet in deze versie.
- **v5** · 10 okt 2026 · Claude A: bakken rijden binnen zodra je een trein kiest; na delen rijden ze weg en ben je thuis (Andere trein is meteen, "beweging verminderen" slaat het over).
- **v4** · 10 okt 2026 · Claude A: nieuwe startindeling voor telefoon (Automatisch + Treinnummer/Station/Treinstel, grotere knoppen, grijs treinlogo); Automatisch = treinen bij jou via live locatie met filter IC/SPR/ICE, ruimer zoeken en "waarschijnlijk jouw trein"; `worker.js` toegevoegd (routes /nabij en /rit); ICE 3neo = 8001-8090.
- **v3** · Claude A: plaatjes erbij (SNG, SLT, ICM, ICE, GTW, LINT, FLIRT R-net, VIRM oud/flow, ICNG-B flow); kleuring kiezen bij VIRM en ICNG; stelnummers uit `Treinstelnummers_Nederland.xlsx`.
- **v2** · Claude A: iPhone-app (manifest, sw), tikken op de exacte plek, deelplaatje (voorkant/achterkant, delen), zelf samenstellen met echte combinaties, zoeken op stelnummer.
- **v1** · gebruiker: eerste `index.html` met drie delen per trein.

## Open / niet getest
- v15: de Worker is getest met een nagebootste NS, niet met de echte. Het veld `ritId`/`type`/`snelheid` in het antwoord van `/vehicle` is nog niet bevestigd; `/rit` gebruikt `/reisinformatie-api/api/v2/journey?train=` (ook nog niet bevestigd). Draait in Cloudflare echt v15? Dan toont `diagnose.html` bij "Treinen in de buurt" de regel "NS-pad dat werkte".
- Het exacte pad voor treinen in de buurt (/nabij) is nog niet bevestigd: de Worker probeert /v1/trein, /v1/vehicle en /api/vehicle. Zodra `diagnose.html` een werkend pad meldt (X-NS-Pad), alleen dat pad laten staan. De veldnamen van het antwoord zijn ook nog niet bevestigd. NS-limiet: 300 aanvragen per 5 minuten per sleutel (Automatisch ververst elke 12 s).
- Eerder: `worker.js` en de NS-veldnamen zijn niet met een echte NS-sleutel getest. Onbekend of het NS-product "Ns-App" ook de Virtual Train API (routes /nabij, /trein) bevat; controleer dat met `diagnose.html`.
- Vergrootglas alleen getest met nagebootste aanraking in Chromium, niet op een echte iPhone (houd-en-sleep, scrollen en het vergrootglas boven de vinger).
- Animaties alleen getest in een gewone browser (ook met "beperk beweging" aan), niet op een echte iPhone.
- Vragen: welke VIRM-nummers zijn oud/flow? ICNG-D (3351-3362) ook flow? R-net 2010-2015 = 3 bakken? SNG-4 boven 2750 (tot 2788)?
- Nog geen plaatje: WINK, Arriva-FLIRT, Valleilijn, TGV.
