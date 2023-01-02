**# Installatie Handleiding Weather Heights
React applicatie voor weeradvies,
Versie 2.0

## Inhoudsopgave

1. Inleiding
2. Lijst van benodigdheden om de applicatie te kunnen gebruiken
3. Randvoorwaarden
4. Andere beschikbare npm commando’s
5. Stappenplan


## Inleiding



De keuzes die de gebruiker heeft zijn:

1. Verder bladeren door regios's en departementen,
2. Zoeken via City Name,
3. Locatie als Favoriet markeren,
4. Locaties vergelijken ( als de gebruiker geautoriseerd is),
4. Registreren account,
5. Aanloggen naar dit account en weer uitloggen,
6. Profielgegevens bekijken.


![screenshot](./src/assets/screenshots/screenshot-main.png)


## Lijst van benodigdheden om de applicatie te kunnen gebruiken:

Het project is opgezet met Create React App en via WebStorm code editor opgezet. Ik heb gebruik gemaakt van de mogelijkheid tot automatische React configuratie in WebStorm. De programmeertaal is dus React met JavaScript.

NPM en Parcel zijn al geconfigureerd, de bijbehorende dependencies moet men wel nog  installeren.
Omdat er al een package.json aanwezig is in het bestand, kunt u dit doen met het volgende (globale) commando:

* npm install

Er moet een eigen .env bestand in de rootmap aangemaakt worden en gevuld worden met de beschikbaargestelde API key. Ken de waarde hiervan toe aan de variabele-naam REACT_APP_API_KEY zoals beschreven in .env.dist bestand.
Run daarna in Webstorm terminal het comando:
* npm run build

Axios staat al in de package.json en het is dus niet meer nodig om het te installeren.
React en React-router staan ook al in de package.json en deze hoeft men ook niet meer te installeren.

Alle benodigde dependencies worden dus binnengehaald!


* npm run start

Authenticatie



## Randvoorwaarden

* Webstorm moet geïnstalleerd zijn op de computer om al de genoemde ‘terminal’ commando’s te kunnen uitvoeren. Webstorm is de IDE (Integrated Development Environment)die gebruikt is om code in te programmeren. De structuur van de webpagina’s is opgezet met behulp van HTML versie 5, en de styling is gebeurd met CSS. Met Javascript en React is er logica aan toegevoegd voor de interactie met de gebruiker. Het project bevat de JavaScript linter ESLint (Bij gebruik van create-react-app is dit standaard meegeleverd). Er wordt gebruik gemaakt van herbruikbare React elementen, zoals State, Router, Component Lifecycle en Context.
* De code is beheerd met behulp van GIT.



## Andere beschikbare npm commando’s

ain
Als het geinstalleerd is, ziet u vervolgens het nummer van de huidige geïnstalleerde versie op uw computer, zoals bijvoorbeeld 6.4.1.
* npm init

NPM initialiseren als NPM nog niet geconfigureerd is.

* npm i parcel --save-dev
  
Parcel installeren

* npm i parcel-plugin-nuke-dist --save-dev

Parcel plugin Nuke Distribution installeren. 
Vervolgens om dat parcel nog niet geconfigureerd was moet de men de Script tag vervangen in package.json "scripts": { "start": "parcel src/index.html", "build": "parcel build src/index.html" }

* npm i axios


Node kan men gebruiken als run-time engine om JavaScript code buiten de browser uit te voeren. 
Installeren van Node.js kan via de website "https://nodejs.org/en/download/". Download en installeer.
Met dit commando test u of de installatie succesvol was. Als Node.js aanwezig is zult u een versienummer te zien krijgen, zoals bijvoorbeeld v13.9.3.


* node voorbeeld.js

Als node.js aanwezig is kan men een Javascript code bestand uitvoeren en output zien in de terminal van WebStorm via console.log.


* npm install -g nodemon

‘nodemon’ installeren, een extensie die ervoor zorgt dat JavaScript bestand één keer aanroepen resulteert in een run bij elke save.


* nodemon voorbeeld.js




Hetvolgende commando is nodig om jwt decode te kunnen importeren en tokens te kunnen decoderen en is dus al uitgevoerd voor de Weather Heights applicatie.
* npm install jwt-decode
    
Om react Router te kunnen gebruiken hebben we het volgende comando nodig en al uitgevoerd voor Weather Heights en hoeft u dus niet meer te doen:
* npm install react-router-dom@5.2.0

## Stappenplan



1. WebStorm:
   Creëer een nieuw project in WebStorm met “Create new project from version control”;
2. GitHub:
   ‘Copy’ de repository link van het project dat beschikbaar is onder:
   HeCu22/frontend-react-weather-heights (github.com) https://github.com/HeCu22/frontend-react-weather-heights
3. WebStorm:
   New project from Version Control,
   ‘Paste’ de url sub 2. in WebStorm in de popup om een nieuw project ‘from version control’ te creeren,
   Click button:
   clone
   Click:
   confirm trusting
   Selecteer:
   new window
4. WebStorm Terminal:
   Verwijder de link met de remote en type het comando:
   git remote remove origin

5. WebStorm Terminal:
   Installeer de packages die included zijn in package.json van Weather Heights.
   Enter het commando:
* npm install

6. API key



7. WebStorm Weather Heights:
Maak een eigen .env bestand in de rootmap aan en vul deze met de variabel-namen zoals beschreven in .env.dist bestand en ken daar bovengenoemde apiKey aan toe.
Run daarna in WebStorm terminal het comando:
* npm run build

Bovenstaand comando in de WebStorm terminal zorgt ervoor dat de goede APIkey gaat werken.

8. WebStorm
   · vervolgens run met commando:

