# Oppsett av skylagring med Google-konto

Dette tar omtrent 15 minutter og er gratis. Du gjør steg 1–4 i nettleseren.
Steg 5 (publisering) kan Claude gjøre for deg.

## 1. Lag et Firebase-prosjekt
1. Gå til https://console.firebase.google.com og logg inn med Google-kontoen din.
2. Trykk **Opprett prosjekt** / **Add project**. Kall det for eksempel `timelogg`.
3. Google Analytics trenger du ikke. Slå det av og fullfør veiviseren.

## 2. Registrer en web-app
1. Når Firebase ber deg legge til en app, velg **Web** (ikonet `</>`).
   Finner du det ikke: tannhjulet → **Project settings** → nederst under **Your apps**
   (direkte: https://console.firebase.google.com/project/_/settings/general).
2. Gi appen et navn, for eksempel `Timelogg`, og trykk **Register app**. Du trenger ikke krysse av for Hosting.
3. Du får se en kodeblokk med `const firebaseConfig = { apiKey: "...", ... }`.
   Lim hele kodeblokken inn til Claude, så fyller Claude ut `timelogg/firebase-config.js`.

## 3. Slå på Google-innlogging
1. I menyen til venstre: **Security → Authentication → Kom i gang**
   (direkte: https://console.firebase.google.com/project/_/authentication/providers).
2. Fanen **Sign-in method**: velg **Google**, slå på, velg e-postadressen din som support-e-post og trykk **Lagre**.

## 4. Lag databasen
1. I menyen: **Databases & Storage → Firestore → Create database**
   (direkte: https://console.firebase.google.com/project/_/firestore).
2. Velg en plassering i Europa og **Production mode**, og trykk **Create**.
3. Gå til fanen **Rules**, erstatt alt med innholdet i filen `firestore.rules` og trykk **Publish**.

## 5. Publiser appen
Appen bør ligge på Firebase sitt eget nettsted (gratis), fordi Google-innlogging
da fungerer best i hjemskjerm-appen på iPhone. Dette krever Node.js. Be Claude om å
gjøre det, eller kjør selv i en terminal i denne mappen:

```
winget install OpenJS.NodeJS.LTS
npx firebase-tools login
npx firebase-tools deploy --project DITT-PROSJEKT-ID
```

Appen ligger da på `https://DITT-PROSJEKT-ID.web.app`.

## 6. Installer på mobilen
- **iPhone:** Åpne adressen i Safari → Del-knappen → **Legg til på Hjem-skjerm**.
- **Android:** Åpne adressen i Chrome → menyen → **Installer app**.

Åpne appen fra hjemskjermen, gå til **Måneder → Konto og skylagring** og trykk
**Logg inn med Google**. Det du allerede har registrert på telefonen blir lastet opp
automatisk, og fra nå av lagres alt både på telefonen og i skyen.

## Når du endrer appen senere
Øk versjonsnummeret øverst i `timelogg/sw.js` (for eksempel `timelogg-v4` → `timelogg-v5`) og publiser
på nytt. Telefonen henter den nye versjonen neste gang appen åpnes med nett.
