# PG6301 examen på Høyskolen Krististiania - 48 timmars examen

Inloggning till applikationen sker via Google. Alla google-konton har möjlighet att logga in i applikationen

### Körs på: `http://localhost:3000` och `http://localhost:1234` med cors


#### CLI kommandon

### Följande kommandon är körbara via terminalen:
* `npm start` - Startar server och klient gemensamt
* `npm parcel` - Startar klienten med parcel
* `npm server` - Startar servern med nodemon 
* `npm test` - Kör jest test med coverage
* `npm format` - Kör prettier riktat mot src mappen


#### Starta applikationen

1. Packa upp zip-filen (unzip) och navigera till projektet via terminalen
2. Kör: `npm install`
    * Detta installerar samtliga node dependencies som ligger i package.json filen
3. Starta applikationen med: `npm start`
    * OBS: Försäkra dig om att port 3000 och 1234 inte redan är i användning
    * Gå till http://localhost:3000 eller http://localhost:1234 i valfri webbläsare
4. Testa applikationen med: `npm test`

## Innehåll

* [Introduktion](#PG6301-Examen)
* [CLI Kommandon](#CLI-Kommandon)  
* [Innehåll](#Innehåll) 
* [Funktioner](#Funktioner) 
* [Information ](#Information)
  * [Tester](#tester)
  * [Bugs](#Bugs)
  * [Struktur](#Struktur)
  * [Krav](#Krav)
* [Inspiration och hjälp](#inspiration-och-hjälp)


## Funktioner

Detta är en React-applikation. När applikationen startar så möts användaren utav ett inloggningsfönster. Användaren får först tillgång till applikationen efter att ha verifierat en inloggning via ett Google-konto.

< Bild här >

"Current user" 
* Användaren har här möjlighet att se vilket Google-konto som just nu är påloggat i applikationen.
"Show profiles" 
* Här kan användaren se de profiler som finns tillgängliga på API-et.
* Profilernas användarinformation kan redigeras genom att klicka på det tillhörande namnet.
"Create profile" 
* Här har användaren möjlighet att själv upprätta låtsasprofiler med förnamn, efternamn och epost-address. Dessa profiler blir sedan synliga i profil-översikten "Show profiles".
"Chat" 
* Detta är en chat där användaren kan registrera sig med ett valfritt användarnamn. Användaren kan här till exempel chatta med sig själv från port:3000 till port:1234 i olika browser-tabs, för att känna sig mindre ensam. En fin åtgärd vid en eventuell corona-isolation.

## Information


### Tester

Samtliga tester körs med jest
< Bild här>
Det var väldigt komplicerat men samtidigt lärorikt att utföra tester. Jag hade som mål att uppnå högre test-täckning, men jag lyckades dessvärre inte uppnå högre täckning utan att det resulterade i att delar utav applikationen slutade att fungera.
Min test-täckning: 47%


### Bugs

* När applikationen körs på port:1234, och jag klickar på "create a profile" eller "chat" så får jag ibland följande felmeddelande: "react_devtools_backend.js:2557 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."


### Struktur

Filstruktur: Tester ligger i ``__tests__`. De filer som användaren kan se på webbsidan ligger i ``client`` mappen.``server`` filen innehåller express-setup och websocket filerna. Innuti ``server`` ligger även ``routes`` som innehåller användare-apiet. 


### Krav
1. A logged in use should be able to register more users in the system
Users should have properties first name, last name and email address
Optionally, users can have description and picture
2. A logged-in user should be able to create messages that are sent to one or more users
3. Users should be able to see messages where they are a recipient or sender
4. Users should be able to respond to messages

(1): Jag har tolkat detta som att en användare måste vara inloggad för att kunna registrera nya "dummy profiles" med för och efternamn samn epost. (utfört)
(2): Jag har tolkat detta som att användare ska kunna skriva meddelanden i exempelvis en chat, meddelandet visas sedan i en eller flera browser-tabs (utfört)
(3): Jag har tolkat detta som att användare ska kunna se vem som som har sänt meddelandet med användarnamn i dialogboxen. (utfört)
(4): Jag har tolkat detta som att användare ska kunna svara på meddelanden i dialogboxen (meddelande från avsändare "A"'s tab ska dyka upp i användare "B"'s tab) (utfört)

Jag har även implementerat Google-authenticator, cors och websockets

## Inspiration och hjälp

* Jag har utgått ifrån det som lärts ut i föreläsningarna, därmed är många delar utav koden väldigt lik den som presenterats av föreläsaren. Jag har inte kopiperat någonting, men några funktioner (exempelvis UseLoading i UseLoading.jsx) är helt lik den som visas i föreläsningen.
* Jag har kodat websockets med hjälp utav föreläsning #12 "Websockets" och implementerat detta för att få till nämnt tema, därmed är koden väldigt lik den som presenteras i föreläsningen.
