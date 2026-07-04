# Stations — tableau de bord météo multi-villes

Tableau de bord React consommant l'API publique **[Open-Meteo](https://open-meteo.com)** (géocodage + prévisions), sans clé d'API requise.

## Installation

```bash
npm install
npm run dev
```

Puis ouvrez l'URL affichée (généralement `http://localhost:5173`).

## Build de production

```bash
npm run build
npm run preview
```

## Fonctionnalités

- Recherche de ville avec suggestions en direct (debounce 350 ms)
- Ajout / suppression de villes suivies, persistées en `localStorage`
- Carte par ville : température actuelle, ressenti, humidité, vent, réglette min/max du jour, bande des 8 prochaines heures
- Chaque carte gère indépendamment son chargement et ses erreurs (une ville en panne n'affecte pas les autres)
- Responsive : 1 colonne en mobile, 2 en tablette, 3 en desktop

## Structure

```
src/
  api/
    weather.js          # appels fetch vers Open-Meteo (géocodage + prévisions)
    weatherCodes.js      # table des codes météo WMO → libellé/icône
  hooks/
    useTrackedCities.js  # liste des villes suivies (localStorage)
    useForecast.js       # chargement des prévisions (loading/erreur)
  components/
    SearchBar.jsx
    CityCard.jsx
    WeatherIcon.jsx
    TempBar.jsx
    HourlyStrip.jsx
    LoadingSpinner.jsx
    ErrorMessage.jsx
    EmptyState.jsx
  App.jsx
  main.jsx
  index.css
```

## Notes techniques

- Aucune clé d'API : Open-Meteo est entièrement public et ouvert en CORS.
- `useForecast` isole le cycle de vie réseau par carte : `idle → loading → success | error`.
- Le composant `TempBar` est l'élément signature : une réglette façon baromètre plutôt qu'une icône générique.
