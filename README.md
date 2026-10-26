# Timetracker

En enkel timeregistreringsapp for mobil, laget som en installerbar nettapp (PWA) som fungerer på både iPhone og Android.

**Prøv den:** https://timetracker-01.web.app

## Funksjoner

- **Start/stopp-timer** som fortsetter selv om appen lukkes, og som kan justeres i etterkant
- **Hurtigregistrering:** Helg (XR, 10 t), Vanlig arbeidsdag (08:00–14:20), Syk – egenmelding og Avspasering
- **Logg** med liste- og kalendervisning, der timer og koder vises for hver dag
- **Endre og slette** alle registreringer, også på tidligere datoer
- **Overtidsbank** som regner pluss og minus etter samme regler som et vanlig arbeidstidsskjema:
  - Vanlige dager: avvik fra normaldagen (6:30, eller 5:30 fra mai til august)
  - **X** – ekstra / helg: alle timene gir pluss (settes automatisk på lørdag og søndag)
  - **XR** – helg: fast +10 timer
  - **A** – avspasering: trekker en normal arbeidsdag fra banken
  - **S, SM, SB, F, K, V, P, D** – sykdom, ferie, kurs og permisjon: påvirker ikke banken
- **Månedsoversikt** og fraværsoversikt per år
- **Nedtelling til neste skoleferie** (skoleruta i Kristiansand), med feriene markert i kalenderen
- **Egenmeldingsteller** for de siste 12 månedene
- **Varsel om glemt stopp** når timeren har gått lenge eller siden en tidligere dag
- **Automatisk start og stopp** via `?start` og `?stop`, for eksempel fra en stedsbasert automatisering i Snarveier på iPhone
- **Google-innlogging** med synkronisering til skyen (Firebase), og alt fungerer også uten nett
- **Eksport** til regneark (CSV) for én måned, alle måneder eller et utvalg, med sumlinje per måned, og sikkerhetskopi til fil

Designet følger fargene og typografien i [UiAs grafiske profil](https://www.uia.no/om-uia/designmanual/).

## Teknologi

- Ren HTML, CSS og JavaScript i én fil, uten byggesteg eller rammeverk
- Service worker og web app manifest for installasjon og bruk uten nett
- Firebase Authentication (Google) og Cloud Firestore for skylagring
- Firebase Hosting

## Struktur

```
timelogg/              Selve appen (det som publiseres)
  index.html           Hele appen: utseende, logikk og synkronisering
  firebase-config.js   Kobling til Firebase-prosjektet
  sw.js                Service worker (bruk uten nett)
  manifest.webmanifest App-informasjon for installasjon
firebase.json          Oppsett for Firebase Hosting
firestore.rules        Sikkerhetsregler: hver bruker ser bare sine egne data
serve.ps1              Lokal testserver for Windows
OPPSETT.md             Oppskrift for å sette opp Firebase
```

## Kjøre lokalt

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Åpne deretter http://localhost:8081.

## Publisere

```powershell
npx firebase-tools deploy --only hosting
```

Husk å øke versjonsnummeret øverst i `timelogg/sw.js` før du publiserer, så telefonene henter den nye versjonen.
