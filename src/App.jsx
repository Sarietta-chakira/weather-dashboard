import { useTrackedCities } from './hooks/useTrackedCities.js'
import SearchBar from './components/SearchBar.jsx'
import CityCard from './components/CityCard.jsx'
import EmptyState from './components/EmptyState.jsx'

export default function App() {
  const { cities, addCity, removeCity } = useTrackedCities()

  return (
    <div className="min-h-screen">
      <header className="border-b border-hairline bg-station/70 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex items-baseline gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-coral" aria-hidden="true" />
            <h1 className="font-display font-bold text-lg text-ink tracking-tight">
              Stations
            </h1>
            <span className="text-xs font-mono text-inkmuted hidden sm:inline">
              relevés en direct — Open-Meteo
            </span>
          </div>
          <SearchBar onSelect={addCity} excludeIds={cities.map((c) => c.id)} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {cities.length === 0 ? (
          <EmptyState
            title="Aucune station suivie"
            description="Ajoutez une première ville pour afficher son relevé météo."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} onRemove={removeCity} />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-xs font-mono text-inkmuted">
        Données fournies par Open-Meteo — mises à jour à chaque chargement. realiser par NJIPWOUO KOUOKAP SARIETTA CHAKIRA
      </footer>
    </div>
  )
}
